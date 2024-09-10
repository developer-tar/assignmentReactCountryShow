import React from "react";


function Card({ cardData, setHideComponent, setShowMoreDetailsData, setShowDetailsComponent, setShowCardComponent }) {

  setHideComponent(true) //set the hidecomponent(list,search) function variable to true when card page will render 


  const showDetails = (e) => {
    e.preventDefault();
    setShowMoreDetailsData(cardData);
    setShowDetailsComponent(true);
    setShowCardComponent(false)
  }

  return (
    <>
    
        <div className="w-full max-w-sm mx-auto justify-center mb-4 mt-3">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 pb-5 mt-2">
              <span className=" font-bold  dark:text-white underline cursor-pointer" onClick={showDetails}>Show Details</span>
            </div>
            <img className="p-8 rounded-t-lg" src={cardData?.flag} alt="product_image1" />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {cardData?.country}
                <p>
                  Popluation:{cardData?.population}
                </p>
              </h5>

            </div>
          </div>
        </div>
     
    </>
  );

}

export default Card;
