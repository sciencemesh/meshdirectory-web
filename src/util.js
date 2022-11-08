function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const isPending = (status) => status === "pending";
const isResolved = (status) => status === "resolved";
const isRejected = (status) => status === "rejected";

function promisifyAll(client) {
  const { promisify } = require("util");

  const to = {};
  for (var k in client) {
    if (typeof client[k] != "function") continue;
    to[k] = promisify(client[k].bind(client));
  }
  return to;
}

export { classNames, promisifyAll, isPending, isRejected, isResolved };
