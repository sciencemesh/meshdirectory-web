import * as React from 'react'
import dynamic from 'next/dynamic'
import Error from '@/pages/_error'
import AcceptInvite from '@/components/dom/AcceptInvite'
import { promisifyAll, isRejected, areEqual, getLocation } from '@/util'
import { useRouter } from 'next/router'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Globe = dynamic(() => import('@/components/canvas/Globe'), { ssr: false })

// Dom components go here
export default function Page({
  providers,
  error,
  status,
  fromProvider,
  setFromProvider,
  withProvider,
  setWithProvider,
}) {
  const { query, isReady } = useRouter()
  const { providerDomain, token } = query
  const from = providers.find((p) => p.domain.toLowerCase() === providerDomain?.toLowerCase())

  React.useEffect(() => {
    setFromProvider(from)
  }, [from, setFromProvider])

  if (isRejected(status)) {
    const { status, message } = error
    return <Error status={status} details={message} />
  }

  if (isReady) {
    if (!from) {
      return (
        <Error status={400} message='Invite link is broken' details='Originating ScienceMesh site could not be found' />
      )
    } else {
    }
    if (!token) {
      return <Error status={400} message='Invite link is broken' details='Token missing or invalid' />
    }
  }

  const availableProviders = providers.filter((p) => !areEqual(p, fromProvider))

  return (
    <AcceptInvite
      from={fromProvider}
      withProvider={withProvider}
      setWithProvider={setWithProvider}
      providers={availableProviders}
    />
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Globe {...props} />

export async function getStaticProps() {
  const { credentials } = require('@grpc/grpc-js')
  const { GatewayAPIClient } = require('@cs3org/node-cs3apis/cs3/gateway/v1beta1/gateway_api_grpc_pb')
  const { ListAllProvidersRequest } = require('@cs3org/node-cs3apis/cs3/ocm/provider/v1beta1/provider_api_pb')
  const TARGET = process.env.IOP_HOST || 'localhost:19000'
  const LOCATIONS_API = process.env.LOCATIONS_API || 'https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc'

  const client = new GatewayAPIClient(TARGET, credentials.createSsl(), {})
  const { listAllProviders } = promisifyAll(client)

  let req = new ListAllProvidersRequest()
  let providers = []
  let providerLocations = []
  let status = 'pending'
  let error = null

  try {
    const res = await listAllProviders(req)
    providers = res.getProvidersList().map((providerInfo) => providerInfo.toObject())
    status = 'resolved'
  } catch (err) {
    error = err
    status = 'rejected'
  }

  if (!isRejected(status)) {
    try {
      providerLocations = await (await fetch(LOCATIONS_API)).json()
      providers = providers.map((p) => {
        const { latitude: lat, longitude: lon } = getLocation(p, providerLocations)
        return { ...p, location: { lat, lon } }
      })
    } catch (err) {}
  }

  return {
    props: {
      title: 'Accept invite',
      providers,
      error: isRejected(status)
        ? { status: 500, code: error.code, message: error.message, details: error.details, stack: error.stack }
        : null,
      status,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10min
    revalidate: 600,
  }
}
