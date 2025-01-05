// Start of Selection
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center text-white p-6">
      <h2 className="text-5xl font-extrabold mb-4">404 - Page Not Found</h2>
      <p className="text-base mb-6">
        We can’t seem to find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-red-500 hover:bg-red-600 transition-colors rounded-md text-white font-semibold"
        aria-label="Return to Home Page"
      >
        Return Home
      </Link>
    </div>
  );
}
