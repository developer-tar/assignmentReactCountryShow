import React,{createContext, useContext} from "react";

export  const detailsContext = createContext({
    cardDetails: () =>{},
    showMoreDetails: () =>{}
});
export const CountryProvider = detailsContext.Provider

export default function useCountryDetails(){
    return useContext(detailsContext);
}

