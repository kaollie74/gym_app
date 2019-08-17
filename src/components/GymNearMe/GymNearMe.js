import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng, } from 'react-places-autocomplete';
require('dotenv').config();

const mapStyles = {
  width: '50%',
  height: '50%',
};

class GymNearMe extends Component {

  state = {
    search: 'gym',
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}

  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'POST_GOOGLE', payload: this.state })
  }

  getSearch = () => {
    this.props.dispatch({ type: 'GOOGLE_SEARCH' })
  }



  handleChange = (event, propsName) => {
    console.log('In Handle Change');
    this.setState({
      [propsName]: event.target.value
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in Handle Submit');
    this.props.dispatch({ type: 'POST_GOOGLE', payload: this.state })


  }

  displayMarkers = () => {
    return (
      this.props.reduxStore.gymsNearMe.map((item, i) => {

        return <Marker
          key={i}
          id={i}
          position={{ lat: item.geometry.location.lat, lng: item.geometry.location.lng }}
          onClick={() => this.clickedMe(item)}
        />

      })
    )
  }



  clickedMe = (item, marker) => {
    console.log('item is', item)

    this.setState({
      selectedPlace: item,
      activeMarker: marker
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        search: 'gym',
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: {}
      });
    }
  }

  render() {

    return (


      <div>
        <div>
          <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 44.986656, lng: -93.258133 }}
          >
            {this.displayMarkers()}
            {/* <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div><h4>{this.state.selectedPlace}</h4></div>
            </InfoWindow> */}
          </Map>
        </div>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <form>
            <label>Search for Local Gyms</label>
            <input onChange={(event) => this.handleChange(event, 'search')} type='text' />
            <button onClick={this.handleSubmit} type='submit'>Submit</button>
          </form>
        </div >

        {
          this.props.reduxStore.gymsNearMe.map((item, i) => (
            <div key={i}>
              <h2>Name:</h2>{item.name}
              <br />
              <h2>Address: </h2>{item.formatted_address}
              <br />
              <h2>Image:</h2> {JSON.stringify((item.photos ? item.photos[0].height : item.photo))}
              <img src={item.photos ? item.photos[0].height : item.photo} />
              <br />
              <h2>Hours: </h2>
              <h2>Ratings: {item.user_ratings_total}</h2>

            </div>


          )
          )
        }

      </div>

    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
});

export default GoogleApiWrapper({ apiKey: 'AIzaSyDmyWdxkXB_xVVFFpUVwp3xye2HCUrLv-Q' })(connect(mapStateToProps)(GymNearMe));