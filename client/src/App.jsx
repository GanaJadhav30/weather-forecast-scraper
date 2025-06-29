import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import SplitText from "./components/SplitText";

function App() {

  const [array, setarray] = useState([])
  const [count, setcount] = useState(0)
  
    const fetchApi = async () => {
      const response = await axios.get('http://localhost:8080/api')
      
      setarray(response.data[0])
    }  
    useEffect((e)=>{
      fetchApi()
    },[]) 

    const handleClick=async(e)=>{
      e.preventDefault();

      const formData = new FormData(e.target)
      const name = formData.get('name')
      await fetch(`http://localhost:8080/submit?name=${name}`);
      await fetchApi()
      console.log("clicked")
      e.target.reset(); 
    }

  return (

    <>
 
    <div className='h-dvh w-screen bg-zinc-800 overflow-x-hidden'>
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
          <input className='bg-white rounded-md p-2 m-4 ' type="text" name="name" placeholder='Enter location' />
          <button className="rounded-full text-md inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 bg-zinc-600">Fetch Data</button>
        </form>
      </div>
    </div>
      
    </>
  )
}

export default App
