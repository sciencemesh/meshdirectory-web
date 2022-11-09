function classNames (...classes) {
  return classes.filter(Boolean).join(" ");
}

const isPending = (status) => status === "pending";
const isResolved = (status) => status === "resolved";
const isRejected = (status) => status === "rejected";

function promisifyAll (client) {
  const { promisify } = require("util");

  const to = {};
  for (var k in client) {
    if (typeof client[k] != "function") continue;
    to[k] = promisify(client[k].bind(client));
  }
  return to;
}

function getInviteAPI (provider, action) {
  const { servicesList } = provider
  const sciencemeshService = servicesList.find(s => s.endpoint?.name === 'SCIENCEMESH_WEBAPP')
  const ocmApiFallbackService = servicesList.find(s => s.endpoint?.name === 'OCM')

  if (!sciencemeshService && !ocmApiFallbackService) {
    return
  }

  const { endpoint } = sciencemeshService ?? ocmApiFallbackService
  const baseURL = new URL(endpoint.path)

  if (action === 'accept') {
    return sciencemeshService
      ? new URL('accept', baseURL)
      : new URL('invites/forward', baseURL)
  }
}

function areEqual (provider1, provider2) {
  return provider1?.name === provider2?.name
    && provider1?.domain === provider2?.domain
    && provider1?.fullName === provider2?.fullName
}

function matches (provider, query) {
  return provider.name
    .toLowerCase()
    .includes(query.toLowerCase())
    ||
    provider.fullName
      .toLowerCase()
      .includes(query.toLowerCase())
}

export { classNames, promisifyAll, isPending, isRejected, isResolved, getInviteAPI, areEqual, matches };