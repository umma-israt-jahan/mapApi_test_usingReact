import React, {  useState } from 'react';
import './home.css'
import searchImg from './assets/585e4ae1cb11b227491c3393.png'
import weatherImg from './assets/1147589.png'
import humidityImg from './assets/wave_318-929763.avif'
import windImg from './assets/storm_318-564090.avif' 
// import mistImgg from './assets/png-clipart-cloud-weather-foggy-weather-text-weather-forecasting.png'
// import clearImg from './assets/png-transparent-cloud-sun-sunny-weather-weather-flat-icon.png'
// import rainImg from './assets/png-clipart-cloud-rain-thunderstorm-rain-cloud-computer-wallpaper.png'
// import drizzle from './assets/2275.png'


import axios from "axios";


export default function Home(){
    const [data,setData] =useState({
        celcius:10,
        name:'london',
        humidity:10,
        speed:2,
        
    })
    const [name, setName] =useState('');
    const [error,setError] = useState('');
 
    

    const handleClick =()=>{
        if (name !== ''){


            const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=47790fdaba5da6390026b5625a55d17e&&units=metric`;

            axios.get(apiUrl)
            .then(res=> {
                // let imagePath='';
                // if (res.data.weather[0].main =='clouds'){
                //     imagePath ={weatherImg}
                // }else if (res.data.weather[0].main =='clear'){
                //     imagePath ='./assets/png-transparent-cloud-sun-sunny-weather-weather-flat-icon.png'
                // }
                // else if (res.data.weather[0].main == 'Rain'){
                //     imagePath ='./assets/png-clipart-cloud-rain-thunderstorm-rain-cloud-computer-wallpaper.png'
                // }
                // else if (res.data.weather[0].main =='Drizzle'){
                //     imagePath ={drizzle}
                // }
                // else if (res.data.weather[0].main =='Mist'){
                //     imagePath ={mistImgg}
                // }else {
                //     imagePath ='./assets/1147589.png'
                // }
                console.log(res.data);
                setData({...data,celcius:res.data.main.temp, name:res.data.name, 
                humidity:res.data.main.humidity,speed:res.data.wind.speed
                
                })
                setError('');
            })
            .catch( err => {
                if(err.response.status === 404){
                    setError('invalid city Name')
                }else{
                    setError('');
                }
                console.log(err)
            });
        }

    }


    return(
        <>
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
                    <button> <img src={searchImg} style={{width:'20px'}} onClick={handleClick} alt=''/> </button>
                </div>
                <div className='error'>
                    <p>{error}</p>

                </div>
                <div className='winfo'>
                <img src={weatherImg} style={{width:'70%',paddingTop:'5rem'}} alt=''/>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col' style={{paddingRight:'20%'}}>
                    <img src={humidityImg} style={{width:'50%',paddingRight:'5px'}} alt=''/>
                    <div className='humidity'>
                        <p>{ Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                    </div>
                    <div className='col' style={{paddingLeft:'10px'}}>
                    <img src={windImg} style={{width:'50%',paddingLeft:''}} alt=''/>
                    <div className='wind'>
                        <p>{Math.round(data.speed)}km/h</p>
                        <p>Wind</p>
                    </div>
                    </div>

                </div>
            </div>
            </div>
            
        </div>
        </>
    )
}