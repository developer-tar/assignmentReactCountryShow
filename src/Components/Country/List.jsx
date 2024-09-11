import React, { useState, useEffect, useCallback } from "react";
import Spinner from "./Spinner";
import ErrorNotification from "./ErrorNotification";
import useCountryDetails from "../../contexts/useCountryDetails";

function List({ setIsListComponentRendered, searchname, setCardData,setShowCardComponent,setShowMoreDetailsData }) {

  const [country, setCountry] = useState([]);
  const [visibleCount, setVisibleCount] = useState(50); // Show 50 items initially
  const [loading, setLoading] = useState(false); // Spinner state
  const [loadingError, setLoadingError] = useState(false);

  const handleCardClick = (details) => {

      setCardData({
        country: details?.name?.common,
        population: details?.population,
        flag: details?.flags?.png
      });
      setShowMoreDetailsData({
        capital:details?.capital[0],
        region:details?.region,
        subregion:details?.subregion || "No subregion",
        languages:details?.languages?.eng,
      });
    
    
    setShowCardComponent(true);
  };//send the details to card

  // Memoized fetchData function
  const fetchData = useCallback(async () => {
    //when the page firstly render then we set the behaviour byDefault
    setIsListComponentRendered(false); //To set the false, when the list component not fully render 
    setLoadingError(false) //not showing the error message
    setLoading(true) //when the all component not fully loaded 

    //To retrieve the content from third party API
    try {
      let url = 'https://restcountries.com/v3.1/';

      if (searchname) {
        url += `name/${searchname}`;
      }
      else {
        url += 'all';
      }//when the seachname empty

      const res = await fetch(url); //using fetch api for getting the content from the url
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json(); //convert the object content into json
      setCountry(data);//update the country function variable with content data 
      setIsListComponentRendered(true); //handle to  showing the search field  
      setLoading(false) //when your search the 
    } catch (error) {
      setIsListComponentRendered(true); //handle to  showing the search field 
      setLoadingError(true)//handle the error case when no data found
      setLoading(false)
    }
  }, [searchname, setIsListComponentRendered]);

  // Use the memoized fetchData function inside useEffect
  useEffect(() => {

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

 
    //when you getting the data successfully and hidde
    if (!loadingError) {
      return (
        <>
          {/* Full-page spinner */}
          {loading && (
            <Spinner />
          )}


          <ul role="list" className="divide-y divide-gray-100">
            {country.slice(0, visibleCount).map((details) => (
              <li key={details?.name?.common} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt={`${details?.name?.common} flag`}
                    src={details?.flags?.png}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">

                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Country name: <span className="text-sm font-semibold leading-6 text-gray-900">{details?.name?.common}</span>
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Population: <span className="text-sm font-semibold leading-6 text-gray-900">{details?.population}</span>
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900 cursor-pointer" onClick={() => handleCardClick(details)}>Click on Card</p>
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
    //when you have NO DATA FOUND
    else {
      return (<ErrorNotification />)

    }
 


}

export default List;
