import React, { Component } from 'react'
import './App.css';
import { hot } from "react-hot-loader/root";
import { Viewer, GeoJsonDataSource } from "resium";
import { createWorldTerrain } from "cesium";
import jsondata from './data.json';
import { sortByMagnitude as sortByMagnitudeHelper } from './helpers';
import Card from './components/Card';
const terrainProvider = createWorldTerrain();

//Create unique records of cities
const cities = {}
const earthquakes = jsondata.features
earthquakes.forEach((earthquake)=> {
  const cityArray = earthquake.properties.place?.split(',')
  const city = cityArray[cityArray.length - 1].trim()
  if (!cities[city]) {
    cities[city] = 1
  }
})

class App extends Component  {
  state = {
    sortBy: 'mag',
    data:jsondata,
    jsondata: jsondata,
    cities: Object.keys(cities)
  }

 componentDidMount() {
   this.sortByMagnitude({...this.state.jsondata})
 }

 //Sort data by highest mag
 sortByMagnitude(jsondata) {
  const data = sortByMagnitudeHelper(jsondata)
  this.setState({ data })
 }

 //Filter data by selected city
 filterDataByCity = (city) => {
  const  tempdata = {...this.state.jsondata}
  const features = [...tempdata.features]
  const allData = 'All'
  if (city === allData) {
    this.sortByMagnitude(tempdata)
  }else{
    const filteredData = features.filter((feature)=> feature.properties.place.includes(city))
    tempdata.features = filteredData
    this.sortByMagnitude(tempdata)
  }
 }

 handleChange = (e) => {
    const filterBy = e.target.value
    this.filterDataByCity(filterBy)
 } 

  render() {
    const { data, cities } = this.state
    return (
      <div className="container">
        <div className="details">
          <p className='title'>{data.metadata.title}</p>
          <select 
            onChange={this.handleChange}
          >
            <option value="">Select City</option>
            <option value="All">All</option>
            {cities?.map((city, idx)=>
              <option key={idx} value={city}>{city}</option>
            )}
          </select>

          {data?.features?.map((item, idx)=> 
            <Card item={item} key={idx} />
          )}

        </div>
        <div>
          <Viewer className="map" terrainProvider={terrainProvider}>
            <GeoJsonDataSource markerSymbol="marker" data={data} />
         </Viewer>
        </div>
      </div>
    );
  }

}

export default hot(App);
