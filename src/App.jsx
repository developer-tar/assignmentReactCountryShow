import { useState } from 'react'

import './App.css'
import Back from './Components/Country/Back'
import Card from './Components/Country/Card'
import Details from './Components/Country/Details'
import List from './Components/Country/List'
import Search from './Components/Country/Search'
import Spinner from './Components/Country/Spinner'
import { CountryProvider } from './contexts/useCountryDetails'

function App() {

  // State to track whether the list component has been fully rendered or not
  const [isListComponentRendered, setIsListComponentRendered] = useState(false);

  // 'isListComponentRendered' will be 'false' when the list is not fully rendered
  // 'setIsListComponentRendered' can be used to change its value when rendering is complete
  const [searchname, setSearchName] = useState('');
  const [cardData, setCardData] = useState(null); // Manage the cardData in the parent


  const [showMoreDetailsData, setShowMoreDetailsData] = useState(null);// Manage the "show more" detailsData  in the parent
  const [isShowCardComponent, setShowCardComponent] = useState(false)//use then if you needed to show the card component
  const [isShowDetailsComponent, setShowDetailsComponent] = useState(false) //use then if you needed to show the showdetails component
  const [isHideComponent, setHideComponent] = useState(false); // Use then if you needed to hide (search,list) component
  const cardDetails = () =>  cardData
  
  const showMoreDetails = () => showMoreDetailsData;
  
  return (

    <>
      {!isListComponentRendered ? (
        <Spinner />
      ) : null}

      {
        isHideComponent && (
          <Back
            setHideComponent={setHideComponent} //to show the search and list component while render the card component
            setShowDetailsComponent={setShowDetailsComponent} //to hide the details component
            setShowCardComponent={setShowCardComponent} //use for hide the card component 
          />
        )}

      {!isHideComponent && isListComponentRendered && (<Search
        setSearchName={setSearchName} //update the input search field 
      />)}

      {!isHideComponent && (<List
        setIsListComponentRendered={setIsListComponentRendered} //update this variable from "false" to "true", when we fully get the data from country api 
        searchname={searchname} //getting the name /input value of search which is inserted by user 
        setCardData={setCardData} //set the card data when click on "click on card"  Button
        setShowCardComponent={setShowCardComponent} //use for showing  the card component 
        setShowMoreDetailsData={setShowMoreDetailsData} //update the details component variable with country object value
      />)}
      <CountryProvider value={{ cardDetails, showMoreDetails }}>
        {isShowCardComponent && (
          <Card
            setHideComponent={setHideComponent} //to hide the search and list component while render the card component
            setShowDetailsComponent={setShowDetailsComponent} //to make sure detail component will show when clicked on show details Button
            setShowCardComponent={setShowCardComponent} //use for hide the card component 
          />
        )}


        {isShowDetailsComponent && (
          <Details />
        )}
      </CountryProvider>

    </>
  );
}

export default App
