import { AlertTriangle, RotateCw, ArrowLeft } from "lucide-react";

function ErrorComponent({ message = "" }) {
  return (
    <div className="px- flex min-h-screen items-center justify-center bg-stone-50">
      <div className="w-full max-w-md rounded-xl border-2 border-red-200 bg-red-50 p-8 shadow-lg lg:max-w-lg lg:p-15">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-12 w-12" style={{ color: "#FF6900" }} />
          </div>
        </div>

        <h2 className="mb-3 text-center text-2xl font-bold text-gray-800">
          {message || " Oops! Something Went Wrong"}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "#FF6900" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#CC5400")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FF6900")
            }
          >
            <RotateCw className="h-5 w-5" />
            Try Again
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-sm text-gray-500">
          If the problem persists, please contact support
        </p>
      </div>
    </div>
  );
}
export default ErrorComponent;
