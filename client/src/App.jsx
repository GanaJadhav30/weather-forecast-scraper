import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {

  const [array, setarray] = useState([])
  const [count, setcount] = useState(0)
  
    const fetchApi = async () => {
      const response = await axios.get('http://localhost:8080/api')
      
      setarray(response.data[0])
    }  
    useEffect(()=>{
      fetchApi()
    },[]) 

  return (

    <>
 
    <div>
      <div >
        <h1>Weather app</h1>
        <p>Temp:{array.temp}</p>
        <p>date:{array.date}</p>
        <p>humidity:{array.humidity}</p>
        <p>place:{array.place}</p>
      </div>
      <div>
        <form action="http://localhost:8080/submit" method="get">
          <input type="text" name="name" placeholder='Enter location' />
          <button  type='submit'>Fetch Data</button>
        </form>
        

      </div>
    </div>
      
    </>
  )
}

export default App
