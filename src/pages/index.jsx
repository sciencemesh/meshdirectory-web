import dynamic from 'next/dynamic'
import Error from '@/pages/_error'
import AcceptInvite from '@/components/dom/AcceptInvite'
import {
  promisifyAll,
  isRejected,
  fetchWithTimeout,
  areEqual,
  getLocation,
  camelizeProps,
  getInviteAPI,
  getEFSSStatus,
} from '@/util'

const Globe = dynamic(() => import('@/components/canvas/Globe'), { ssr: false })

export default function Page({ providers, error, status, fromProvider, withProvider, setWithProvider }) {
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
  let randomProviderConnections = []
  let status = 'pending'
  let error = null

  if (process.env.PROVIDERS_API) {
    try {
      console.log('Fetching mesh metadata from: ', process.env.PROVIDERS_API)
      providers = camelizeProps(await (await fetchWithTimeout(process.env.PROVIDERS_API, 30)).json())
      status = 'resolved'
    } catch (err) {
      console.error('Failed to fetch mesh metadata: ', err)
      error = err
      status = 'rejected'
    }
  } else {
    const { credentials } = require('@grpc/grpc-js')
    const { GatewayAPIClient } = require('@cs3org/node-cs3apis/cs3/gateway/v1beta1/gateway_api_grpc_pb')
    const { ListAllProvidersRequest } = require('@cs3org/node-cs3apis/cs3/ocm/provider/v1beta1/provider_api_pb')
    const TARGET = process.env.IOP_HOST || 'sciencemesh.cesnet.cz:443'
    console.log('Fetching mesh metadata from: ', TARGET)
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
      console.error('Failed to fetch mesh metadata: ', err)
      error = err
      status = 'rejected'
    }
  }

  if (!isRejected(status)) {
    const LOCATIONS_API = process.env.LOCATIONS_API || 'https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc'
    console.log('Fetching locations from: ', LOCATIONS_API)
    try {
      providerLocations = await (await fetchWithTimeout(LOCATIONS_API, 30)).json()
    } catch (err) {
      console.error('Failed to fetch locations: ', err)
    }

    providers = await Promise.all(
      providers.map(async (p) => {
        const location = getLocation(p, providerLocations)
        const acceptAPI = getInviteAPI(p, 'accept').toString()
        const efss = await getEFSSStatus(p)

        return {
          ...p,
          ...(acceptAPI && { acceptAPI }),
          ...(location && { location }),
          ...(efss && { efss }),
        }
      }),
    )

    // Used by Mesh Globe
    randomProviderConnections = providers
      .sort(() => 0.5 - Math.random())
      .map((p1, i) =>
        Math.random() > 0.5
          ? providers
              .slice(i, Math.floor(Math.random() * 1000) % providers.length)
              .map((p2) => (Math.random() > 0.5 ? [p1, p2] : [p1, p2]))
          : [],
      )
      .flat()
      .filter(([p1, p2]) => !areEqual(p1, p2) && p1.location && p2.location)
      .map(([p1, p2]) => {
        const { lat: startLat, lng: startLng } = p1.location
        const { lat: endLat, lng: endLng } = p2.location
        return {
          startLat,
          startLng,
          endLat,
          endLng,
          color: '#c7e8f9',
        }
      })
  }

  return {
    props: {
      title: 'Accept invite',
      providers,
      randomProviderConnections,
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
