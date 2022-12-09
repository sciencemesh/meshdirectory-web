import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Error from '@/pages/_error'
import AcceptInvite from '@/components/dom/AcceptInvite'
import { promisifyAll, isRejected, areEqual, getLocation, camelizeProps } from '@/util'

const Globe = dynamic(() => import('@/components/canvas/Globe'), { ssr: false })

export default function Page({ providers, error, status, fromProvider, withProvider, setWithProvider }) {
  useEffect(() => {
    console.debug('[index] CS3 Providers: ', providers)
  }, [providers])

  if (isRejected(status) || error) {
    const { status, message } = error
    return <Error status={status} details={message} />
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
Page.canvas = (props) => <Globe {...props} />

export async function getStaticProps() {
  let providers = []
  let providerLocations = []
  let status = 'pending'
  let error = null

  if (process.env.PROVIDERS_API) {
    try {
      providers = camelizeProps(await (await fetch(process.env.PROVIDERS_API)).json())
      status = 'resolved'
    } catch (err) {
      error = err
      status = 'rejected'
    }
  } else {
    const { credentials } = require('@grpc/grpc-js')
    const { GatewayAPIClient } = require('@cs3org/node-cs3apis/cs3/gateway/v1beta1/gateway_api_grpc_pb')
    const { ListAllProvidersRequest } = require('@cs3org/node-cs3apis/cs3/ocm/provider/v1beta1/provider_api_pb')
    const TARGET = process.env.IOP_HOST || 'sciencemesh.cesnet.cz:443'
    const client = new GatewayAPIClient(
      TARGET,
      process.env.IOP_INSECURE ? credentials.createInsecure() : credentials.createSsl(),
      {},
    )
    const { listAllProviders } = promisifyAll(client)
    let req = new ListAllProvidersRequest()

    try {
      const res = await listAllProviders(req)
      providers = res.getProvidersList().map((providerInfo) => providerInfo.toObject())
      status = 'resolved'
    } catch (err) {
      error = err
      status = 'rejected'
    }
  }

  if (!isRejected(status)) {
    const LOCATIONS_API = process.env.LOCATIONS_API || 'https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc'
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
    // - At most once every 1min
    // TODO: raise revalidation interval when intensive debugging won't be
    // needed anymore
    revalidate: 60,
  }
}
