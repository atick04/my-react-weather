import React from 'react';

import './App.css';
import'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';    
import Weather from './APP.COMPONENT/weather.component';
import Form from './APP.COMPONENT/form.component';
import "weather-icons/css/weather-icons.css";

const API_key ="6e19fd4d46949925fd8189ac5b44b018"

class App extends React.Component {
  constructor(){
    super();
    this.state= {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error:false
    };
    

    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"

    };      
  }
  get_weathericon(icons, rangeid){
    switch(true){
      case rangeid >= 200 && rangeid <= 232:
        this.setState({icon: this.weathericon.Thunderstorm});
        break;
      case rangeid >= 300 && rangeid <= 321:
        this.setState({icon: this.weathericon.Drizzle});   
        break;
      case rangeid >= 500 && rangeid <= 531:
        this.setState({icon: this.weathericon.Rain});
        break;
      case rangeid >= 600 && rangeid <= 622:
        this.setState({icon: this.weathericon.Snow});
        break;
      case rangeid >= 701 && rangeid <= 781:
        this.setState({icon: this.weathericon.Atmosphere});
        break;
      case rangeid === 800:                   
        this.setState({icon: this.weathericon.Clear});
        break;
      case rangeid >= 801 && rangeid <= 804:
        this.setState({icon: this.weathericon.Clouds});
        break;
        default:
          this.setState({icon: this.weathericon.Clouds});

    }
  }
  calCelcius(temp){
    let cell = Math.floor(temp -273.15); 
    return cell;
  }

 

  getWeather = async e => {
    e.preventDefault();

   const country = e.target.elements.country.value;
   const city = e.target.elements.city.value;

  if(city && country){
    const api_call = await fetch(
       `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
     );

      const response = await api_call.json();

   console.log(response);

   this.setState({
     city: `${response.name}, ${response.sys.country}`,
     celcius: this.calCelcius(response.main.temp),
     temp_max: this.calCelcius(response.main.temp_max),
     temp_min: this.calCelcius(response.main.temp_min),
     description: response.weather[0].description ,
     error:false
   });

   this.get_weathericon(this.weathericon, response.weather[0].id);

   console.log(response);
  }else{
    this.setState({ 
      error: true
    });
  }
 };

  render() {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}  />
        <Weather
         city={this.state.city}
         country={this.state.country}
         temp_celcius={this.state.celcius}
         temp_max={this.state.temp_max}
         temp_min={this.state.temp_min}
         description={this.state.description}
         weathericon={this.state.icon}
        />
      </div>
    );
  }
}



export default App;
