import React, { useState, useEffect,useCallback } from "react";
import Spinner from "./Spinner";
import ErrorNotification from "./ErrorNotification";

function List({setrenderComponent,searchname}) {
  const [country, setCountry] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50); // Show 50 items initially
  const [loading, setLoading] = useState(false); // Spinner state
  const [loadingError, setLoadingError] = useState(false); 

  // Memoized fetchData function
  const fetchData = useCallback(async () => {
    setrenderComponent(false);
    setLoadingError(false)
    try {
      let url = 'https://restcountries.com/v3.1/all';
      if (searchname) {
        url = `https://restcountries.com/v3.1/name/${searchname}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setCountry(data);
      setrenderComponent(true);
    } catch (error) {
        setrenderComponent(true);
        setLoadingError(true)
    } 
  }, [searchname, setrenderComponent]);

  // Use the memoized fetchData function inside useEffect
  useEffect(() => {
    console.log('35')
    fetchData();
  }, [fetchData]);

  // Function to load more countries
  const loadMore = useCallback(() => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 50); // Load 50 more on click
      setLoading(false); // Hide spinner after loading
    }, 1000); // Simulating loading delay (1 second)
  }, []);
  console.log('46')
  if(!loadingError){
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
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      );
  }
  else{
   return( <ErrorNotification/>)
   
  }
  
}

export default List;
