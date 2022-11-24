import * as React from 'react'
import Error from './_error'
import { useRouter } from 'next/router'
import { promisifyAll, isRejected, getInviteAPI, areEqual, getLocation } from "../src/util"
import ProviderSelect from '../components/ProviderSelect'
import PageTitleMeta from '../components/PageTitleMeta'
import ErrorBanner from '../components/ErrorBanner'
import MeshGlobe from '../components/MeshGlobe'

function OriginatingProvider ({ provider }) {
  return <span className='py-2 text-4xl font-medium border-b-2 border-dotted decoration-dotted text-blue-dark'>
    {provider?.fullName || <div className="w-48 h-8 rounded-sm animate-pulse bg-slate-300" />}
  </span >
}

export default function Index ({ status, providers, providerLocations, error }) {
  const { query, isReady, push: redirect } = useRouter()
  const [selectedProvider, setProvider] = React.useState(null)
  const [clientError, setClientError] = React.useState(null)

  if (isRejected(status)) {
    return <Error error={error} />
  }

  const { providerDomain, token } = query
  const originatingProvider = providers.find(p => p.domain.toLowerCase() === providerDomain?.toLowerCase())

  const canAccept = selectedProvider !== null

  const availableProviders = providers.filter(provider => !areEqual(provider, originatingProvider))

  if (isReady) {
    if (!originatingProvider) {
      return <Error error={{
        status: 400,
        message: 'Invite link is broken',
        details: 'Originating ScienceMesh site could not be found'
      }} />
    }
    if (!token) {
      return <Error error={{
        status: 400,
        message: 'Invite link is broken',
        details: 'Token missing or invalid'
      }} />
    }
  }

  function changeProvider (newProvider) {
    setClientError(null)
    setProvider(newProvider)
  }

  function acceptInvite () {
    if (!canAccept) {
      setClientError({ message: 'Please choose a valid ScienceMesh site' })
      return
    }

    const inviteApiURL = getInviteAPI(selectedProvider, 'accept')
    if (!inviteApiURL) {
      setClientError({
        message: 'This site doesn\'t host required services. Please choose another one.'
      })
      return
    }

    redirect({
      // Merge invite link query params with
      // target accept invitation API URL
      origin: inviteApiURL.origin,
      pathname: inviteApiURL.pathname,
      protocol: inviteApiURL.protocol,
      host: inviteApiURL.host,
      hostname: inviteApiURL.hostname,
      query
    })
  }

  return <>
    <PageTitleMeta subtitle="Accept invite" />
    <div className='flex-col h-full grid grid-flow-row md:grid-flow-col gap-10'>
      {/* Hero text */}
      <section className='flex flex-col items-start justify-center pl-8 text-left md:pl-12 gap-6'>
        <span className='inline-block text-xl font-light'>Accept an invitation to collaborate from</span>
        <OriginatingProvider provider={originatingProvider} />
        <span className='inline-block text-xl font-light'>using your</span>
        <div className='w-auto max-w-7xl'>
          <ProviderSelect
            providers={availableProviders}
            selected={selectedProvider}
            onChange={changeProvider}
          />
          {clientError && <ErrorBanner className="mt-2" error={clientError} />}
        </div>
        <span className='inline-block text-xl font-extralight'>ScienceMesh site account.</span>
        <button
          onClick={acceptInvite}
          title="Accept invite"
          aria-label='Accept invite'
          className="px-4 py-2 mt-10 text-2xl font-medium text-white shadow-lg w-72 rounded-md bg-gradient-to-br from-blue to-gray-dark hover:from-orange-600 hover:to-blue-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Accept
        </button>
      </section>
      {/* Mesh globe */}
      <div className='relative flex items-center justify-end'>
        <div className="absolute right-0 ">
          <MeshGlobe
            providers={availableProviders}
            providerLocations={providerLocations}
            originator={originatingProvider}
            selected={selectedProvider}
          />
        </div>
      </div>
    </div>
  </>
}

export async function getStaticProps () {

  const { credentials } = require("@grpc/grpc-js")
  const { GatewayAPIClient } = require("@cs3org/node-cs3apis/cs3/gateway/v1beta1/gateway_api_grpc_pb")
  const { ListAllProvidersRequest } = require("@cs3org/node-cs3apis/cs3/ocm/provider/v1beta1/provider_api_pb")

  const IOP_GATEWAY = process.env.IOP_GATEWAY || 'sciencemesh.cesnet.cz:443' || 'localhost:19000'
  const client = new GatewayAPIClient(IOP_GATEWAY, credentials.createInsecure(), {});
  const { listAllProviders } = promisifyAll(client);

  let req = new ListAllProvidersRequest();
  let providers = []
  let providerLocations = []
  let status = 'pending'
  let error = null

  try {
    const res = await listAllProviders(req);
    const providerList = res.getProvidersList()
    providers = providerList.map((providerInfo) => providerInfo.toObject())
    status = 'resolved'
  } catch (err) {
    error = err
    status = 'rejected'
  }

  if (!isRejected(status)) {
    providerLocations = await (await fetch('https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc')).json()
  }

  return {
    props: {
      providers,
      providerLocations,
      error: isRejected(status) ? { status: 500, code: error.code, message: error.message, details: error.details, stack: error.stack } : null,
      status
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1h
    revalidate: 3600,
  }
}
