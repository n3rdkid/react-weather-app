import React from 'react';
import axios from 'axios';

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
       
        this.loadData(); 
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
    loadData() {
        console.log("here") 
        let longitude=this.state.coords.longitude;
        let latitude=this.state.coords.latitude;
        axios.get(`https://fcc-weather-api.glitch.me/api/current?lon=${longitude}&lat=${latitude}`)
        .then(response => {
            console.log(response);
            let {name,main,weather}=response.data;
            weather=weather[0];
            let data={name,main,weather}
            this.setState({data:data})
        })
     }
     render(){
        let display; 
        if(this.state.locationSet&&this.state.data!==null)
           display = (   
                <div>
                <h1>>Weather App</h1>
                <p>{this.state.data.name}</p>
                <p>{this.state.data.main.temp}</p>
            
                <p>{this.state.data.weather.main}</p>
                <img src={this.state.data.weather.icon}/>
            </div>);
        return  (
            <div>
                    {display}
            </div>
        )
    }
}
export default WeatherBuilder;