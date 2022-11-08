import * as React from 'react'
import Error from './_error'
import { useRouter } from 'next/router'
import { promisifyAll, isRejected } from "../src/util"
import ProviderSelect from '../components/ProviderSelect'
import PageTitleMeta from '../components/PageTitle'
import ErrorBanner from '../components/ErrorBanner'

export default function Index ({ status, providers, error }) {
  const { query } = useRouter()
  const [selectedProvider, setProvider] = React.useState(null)
  const [validationError, setValidationError] = React.useState(null)

  if (isRejected(status)) {
    return <Error error={error} />
  }

  const { providerDomain, token } = query
  const originatingProvider = providers.find(p => p.domain.toLowerCase() === providerDomain?.toLowerCase())
  const canAccept = selectedProvider !== null

  if (!originatingProvider) {
    return <Error error={{
      status: 400,
      message: 'Invite link is broken',
      details: 'The originating provider could not be found'
    }} />
  }
  if (!token) {
    return <Error error={{
      status: 400,
      message: 'Invite link is broken',
      details: 'Invitation token is missing or invalid'
    }} />
  }

  function changeProvider (newProvider) {
    setValidationError(null)
    setProvider(newProvider)
  }

  function acceptInvite () {
    if (!canAccept) {
      setValidationError({ message: 'Please choose a valid ScienceMesh provider' })
      return
    }

    const { servicesList } = selectedProvider
    const sciencemeshService = servicesList.find(s => s.endpoint?.name === 'SCIENCEMESH_WEBAPP')
    const ocmApiFallbackService = servicesList.find(s => s.endpoint?.name === 'OCM')

    if (!sciencemeshService && !ocmApiFallbackService) {
      setValidationError({ message: 'This provider doesn\'t host required services.\n Please choose another one.' })
      return
    }

    console.log(sciencemeshService, ocmApiFallbackService)
    const { endpoint } = sciencemeshService ?? ocmApiFallbackService
    const baseURL = new URL(endpoint.path)
    console.log(baseURL)

    const acceptTargetURL = sciencemeshService
      ? new URL(baseURL)
      : new URL(baseURL, 'invites/forward')
    console.log('accepted', acceptTargetURL)
  }

  return <>
    <PageTitleMeta subtitle="Accept invite" />
    <div className='bg-white grid grid-flow-row md:grid-flow-col h-full gap-10 flex-col py-10'>
      {/* Hero text */}
      <section className='pl-8 md:pl-12 flex flex-col justify-center items-start text-left gap-6'>
        <span className='inline-block text-xl font-light'>Accept an invitation to collaborate from</span>
        <span className='border-dotted border-b-2 decoration-dotted text-4xl text-blue-dark font-medium py-2'>{originatingProvider?.fullName}</span>
        <span className='inline-block text-xl font-light'>using your</span>
        <div className='w-auto max-w-7xl'>
          <ProviderSelect
            providers={providers}
            selected={selectedProvider}
            onChange={changeProvider}
          />
          {validationError && <ErrorBanner className="mt-2" error={validationError} />}
        </div>
        <span className='inline-block text-xl font-extralight'>ScienceMesh account.</span>
        <button
          onClick={acceptInvite}
          className="w-72 rounded-md shadow-lg text-white font-medium px-4 py-2 text-2xl  mt-10 bg-gradient-to-br from-blue to-gray-dark hover:from-orange-600 hover:to-blue-dark focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Accept
        </button>
      </section>
      {/* Mesh globe */}
      <div className='flex justify-center items-center border border-bg-blue pr-8 md:pr-12'>
        <h2 className='text-2xl'>Map</h2>
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

  return {
    props: {
      providers,
      error: isRejected(status) ? { status: 500, code: error.code, message: error.message, details: error.details, stack: error.stack } : null,
      status
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1h
    revalidate: 3600,
  }
}
