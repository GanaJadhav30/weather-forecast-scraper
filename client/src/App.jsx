import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import SplitText from "./components/SplitText";
import Button from './components/Button'
import Spinner from './components/Spinner'

function App() {

  const [array, setarray] = useState([])
  const [isLoading, setisLoading] = useState(false)
  
    const fetchApi = async () => {
      const response = await axios.get('http://localhost:8080/api')
      setisLoading(true)
      setarray(response.data[0])
    }  
    useEffect((e)=>{
      fetchApi()
    },[]) 

    const handleClick=async(e)=>{
      e.preventDefault();
      setisLoading(false)
      const formData = new FormData(e.target)
      const name = formData.get('name')
      await fetch(`http://localhost:8080/submit?name=${name}`);
      await fetchApi()
      console.log("clicked")
      e.target.reset(); 
      
    }
    

  return (

    <>
 
    <div style={{ backgroundImage: `url(/backgroundImg.jpg)`,backgroundSize:'cover' }} className='h-dvh w-screen bg-zinc-800 overflow-x-hidden'>
      
      <div >
        <div className='w-screen h-50 py-20 text-white text-5xl font-semibold text-center'>
          <SplitText text="Weather App☁️" />
        </div>
        <div className='flex justify-center'>
          <div className='h-auto w-150 text-white  border border-white border-solid'>
            <div className='p-5 text-xl'>
              <p>Place: {array.place}</p>
              <p>Temp: {array.temp}</p>
              <p>Date: {array.date}</p>
              <p>Humidity: {array.humidity}</p>
            </div>
          </div>
        </div>

      </div>
      <div className='p-10 flex justify-center text-black'>
        <form method='get' action="http://localhost:8080/submit">
          
          {isLoading ? <Button /> : <Spinner />}
        </form>
      </div>
    </div>
      
    </>
  )
}

export default App
