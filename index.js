


(async function(){
    const data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
   const res= await data.json()
   
   let h=document.querySelector('.interval');
   console.log(h)
   h.innerHTML=res.current.interval
})()

//promise chaning 





