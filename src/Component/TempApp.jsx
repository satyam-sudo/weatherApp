import React, { useState } from 'react'
import axios from 'axios'
import './TempApp.css'
import moment from 'moment';


function TempApp() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

    const searchLocation = (event) => {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        setLocation('')
    }

    return (
        <div className="app" style={{ backgroundImage: "url('images/two.jpg')" }}>
            <h2 className='weather'>Weather App</h2>
            <div className="search">
                <input
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder='Enter Location'
                    type="text" />
            </div>
            <button className="bn3637 bn38" type='submit' onClick={searchLocation}>Search</button>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                    <p>Day: {moment().format('dddd')}</p>
                    <p>Date: {moment().format('LL')}</p>

                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                        <div className="sunrise">
                            {data.sys ? <p> {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p> : null}
                            <p>Sunrise: </p>
                        </div>
                        <div className="sunset">
                            {data.sys ? <p>{new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p> : null}
                            <p>Sunset: </p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default TempApp;