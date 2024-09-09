import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

function List() {
  const [country, setCountry] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50); // Show 50 items initially
  const [loading, setLoading] = useState(false); // Spinner state

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => setCountry(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to load more countries
  const loadMore = () => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 50); // Load 50 more on click
      setLoading(false); // Hide spinner after loading
    }, 1000); // Simulating loading delay (1 second)
  };

  return (
    <>
      {/* Full-page spinner */}
      {loading && (
        <Spinner/>
      )}

      <ul role="list" className="divide-y divide-gray-100">
        {country.slice(0, visibleCount).map((details) => (
          <li key={details.name.common} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt={`${details.name.common} flag`}
                src={details.flags.png}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {details.name.common}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {details.capital ? details.capital[0] : "No capital"}
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">action</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Button to load more countries */}
      {visibleCount < country.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={loadMore}
            className={`px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center justify-center gap-2 ${loading ? "cursor-not-allowed" : ""}`}
            disabled={loading} // Disable button while loading
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}

export default List;
