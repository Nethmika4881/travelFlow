import { Link } from "react-router-dom";

function PageNotFoundError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-stone-100 to-stone-200 px-5 text-center">
      <h1
        className="m-0 text-[8rem] leading-none font-extrabold"
        style={{ color: "#FF6900" }}
      >
        404
      </h1>
      <h2 className="mt-2.5 text-3xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="my-4 mb-7 max-w-md text-base text-gray-600">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-lg px-6 py-3 font-medium text-white no-underline transition-colors duration-300"
        style={{ backgroundColor: "#FF6900" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#CC5400")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#FF6900")
        }
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFoundError;
