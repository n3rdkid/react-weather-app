import React from 'react';
import axios from 'axios';
import classes from './WeatherBuilder.module.css'

class WeatherBuilder extends React.Component{
    
      state={
            coords:{
                longitude:0,
                latitude:0
            },
            locationSet:false,
            data:null
        }
    componentDidMount()
    {
        this.getLocation(); 
    }
    loadData= ()=> {
        let longitude=this.state.coords.longitude;
        let latitude=this.state.coords.latitude;
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${latitude}`)
        .then(response => {
            
            let {name,main,weather}=response.data;
            weather=weather[0];
            let data={name,main,weather}
            this.setState({data:data})
        })
        console.log("SET STATE IN Load Data");
        console.dir(this.state);
     }
     getLocation=()=>
     {
         if(navigator.geolocation)
         {
             navigator.geolocation.getCurrentPosition(position=>
             {
                 let newCoords={
                     longitude:position.coords.longitude,
                     latitude:position.coords.latitude
                 }
                 this.setState({coords:newCoords,locationSet:true})
             })
         } 
             
     }
     render(){
        let display; 
        if(this.state.locationSet&&this.state.data!==null)
           display = (   
            <React.Fragment>
                <h1 className={classes.title}>Weather App</h1>
                <p className={classes.name}>{this.state.data.name}</p>
                <p className={classes.temperature}>{this.state.data.main.temp} °C</p>      
                <p className={classes.weather}>{this.state.data.weather.main}</p>
                <img className={classes.icon} alt="weather icon" src={this.state.data.weather.icon}/>
             </React.Fragment>);
             else
             this.loadData();
        return  (
            <div className={classes.container}>
                    {display}
              </div>)
                           
    }
}
export default WeatherBuilder;