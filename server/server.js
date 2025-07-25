const express = require("express")
const app = express();
const cors = require('cors')
const corsOption = {
    origin:'http://localhost:5173',
}
const puppeteer =require('puppeteer');

app.use(cors(corsOption))

let sharedLocation="Pune"

app.get('/api',(req,res)=>{

    
    const DataTaker = async () => {
            const browser = await puppeteer.launch();
    
            const page = await browser.newPage();
            const url = `https://www.indiatoday.in/weather/${sharedLocation}-weather-forecast-today`
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
            await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});

            const data = await page.evaluate (()=>{
               temp = document.querySelector('strong').textContent
               date = document.querySelector('.wtr_hdr_dte').textContent
              place = document.querySelector('.wtr_brd_act').textContent
              humidity = document.querySelector('.wtr_crd_ttl').textContent
             const realData =  [{"temp":temp,"date":date,"place":place,"humidity":humidity}]
             return realData
            })
            res.json(data)
            console.log(data);
            
            await browser.close();
    
      
    }
    
    DataTaker()
})

app.get('/submit',(req,res)=>{
    location = req.query.name
    sharedLocation = location.charAt(0).toUpperCase() + location.slice(1) 
    res.redirect('http://localhost:5173/')
    console.log(sharedLocation);
    
})

app.listen(8080,()=>{
    console.log("Server started on port 8080")
})