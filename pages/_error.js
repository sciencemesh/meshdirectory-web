import PageTitleMeta from "../components/PageTitle";
import Link from "next/link";

const statusCodes = {
  400: "Bad Request",
  404: "This page could not be found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

function Error ({ error }) {
  const { status, message, details, stack } = error;
  console.error(error);
  return (
    <>
      <PageTitleMeta subtitle={`Error ${status}`} />
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="bg-gradient-to-br from-red-500 to-gray-dark bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              {status}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-gray-200 sm:border-l sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-dark sm:text-5xl">
                  {message ?? statusCodes[status] ?? "Oops! Something went wrong"}
                </h1>
                {details && (
                  <p className="mt-1 text-base text-gray-dark">{details}</p>
                )}
              </div>

              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <a className="inline-flex items-center rounded-md border-transparent bg-gradient-to-br from-blue to-gray-dark px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gradient-to-br hover:from-red-600 hover:to-yellow-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Go back home
                  </a>
                </Link>
                <Link href="/support">
                  <a className="inline-flex items-center rounded-md border  border-gray  px-4 text-sm text-white text-current hover:bg-gray hover:text-white">
                    Contact support
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ error }) => {
  return { error: error || { status: 404 } };
};

export default Error;
