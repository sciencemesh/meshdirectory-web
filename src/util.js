function classNames (...classes) {
  return classes.filter(Boolean).join(" ");
}

const isPending = (status) => status === "pending";
const isResolved = (status) => status === "resolved";
const isRejected = (status) => status === "rejected";

function promisifyAll (client) {
  const { promisify } = require("util");

  const to = {};
  for (const k in client) {
    if (typeof client[k] != "function") continue;
    to[k] = promisify(client[k].bind(client));
  }
  return to;
}

function getInviteAPI (provider, action) {
  const { servicesList } = provider
  const sciencemeshAppService = servicesList.find(s => s.endpoint?.type?.name.toLowerCase() === 'efss_webapp')
  const ocmApiFallbackService = servicesList.find(s => s.endpoint?.type?.name.toLowerCase() === 'ocm')

  if (!sciencemeshAppService && !ocmApiFallbackService) {
    return
  }

  const { endpoint } = sciencemeshAppService ?? ocmApiFallbackService
  const baseURL = new URL(endpoint.path) + '/'
  if (action === 'accept') {
    return sciencemeshAppService
      ? new URL('accept', baseURL)
      : new URL('invites/forward', baseURL)
  }
}

async function getEFSSStatus (provider) {
  const { servicesList } = provider
  const efssStatus = servicesList.find(s => s.endpoint?.type?.name.toLowerCase() === 'efss_status')
  if (efssStatus) {
    return await (await fetch(efssStatus.endpoint.path)).json()
  }
}

function getLocation (provider, locations) {
  return locations.find(loc => loc.key.toLowerCase() === provider.name.toLowerCase())
}

function geoDistance (point1, point2) {
  const { lat: lat1, lon: lon1 } = point1
  const { lat: lat2, lon: lon2 } = point2

  let radlat1 = Math.PI * lat1 / 180
  let radlat2 = Math.PI * lat2 / 180
  let theta = lon1 - lon2
  let radtheta = Math.PI * theta / 180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515 * 1.609344
  return dist
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
    (provider.fullName ? provider.fullName
      .toLowerCase()
      .includes(query.toLowerCase()) : false)
}

function toCamel (s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}


function camelizeProps (o) {
  if (typeof o === 'object' && !Array.isArray(o)) {
    const n = {}

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k).replace('services', 'servicesList')] = camelizeProps(o[k])
      })

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => {
      return camelizeProps(i)
    })
  }

  return o;
}

export { classNames, promisifyAll, isPending, isRejected, isResolved, getInviteAPI, getLocation, areEqual, matches, geoDistance, camelizeProps, getEFSSStatus };
