import { useState } from 'react'

import './App.css'
import Search from './Components/Country/Search'
import ErrorNotification from './Components/Country/ErrorNotification'
import Spinner from './Components/Country/Spinner'
import Details from './Components/Country/Detail'
import Card from './Components/Country/Card'
import List from './Components/Country/List'
function App() {
const [renderComponent,setrenderComponent] = useState(false);
const [searchname,setSearchName] = useState('');
  return (
    <>
      <div className="flex flex-wrap min-h-screen items-center">
       
          <div className="w-full max-w-sm mx-auto justify-center mb-4">
          <Search renderComponent = {renderComponent} setSearchName={setSearchName}/>
          <List setrenderComponent={setrenderComponent} searchname={searchname}/>
         
   {
    !renderComponent
    ?
    <Spinner/>
    :''
   }
        
        </div>
      </div>
   
    </>
  )
}

export default App
