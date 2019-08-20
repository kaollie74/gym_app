import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CurrentLocation from '../Map/Map';

import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng, } from 'react-places-autocomplete';
require('dotenv').config();

const mapStyles = {
  width: '80%',
  height: '80%',
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

    // return(<Marker onClick={this.clickedMe} name={'Play'} />)
    return (
      this.props.reduxStore.gymsNearMe.map((item, index) => {

        return <Marker

          key={index}
          id={index}
          position={{ lat: item.geometry.location.lat, lng: item.geometry.location.lng }}
          //img={'image' + <img src={item.icon}/>}
          name={'Place: ' + item.name}
          rating={'Rating: ' + item.rating}
          address={'Address: ' + item.formatted_address}
          onClick={this.clickedMe}
          //button={<button onClick={ (event) => this.blah(item, event)}>Hello</button>}

        />

      })
    )
  }

  blah = (item, event) => {
    console.log('in blah')
  }// end blah



  clickedMe = (props, id, event) => {

    console.log('item is', props)
    console.log('this is marker', id)
    this.setState({
      selectedPlace: props,
      activeMarker: id,
      showingInfoWindow: true
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
    console.log('this.state', this.state)
    return (


      <div>
        <div>
          <CurrentLocation centerAroundCurrentLocation
            google={this.props.google}
            zoom={14}
            style={mapStyles}
          //initialCenter={{ lat: 44.986656, lng: -93.258133 }}
          >
            {this.displayMarkers()}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.img}</h4>
                <h4>{this.state.selectedPlace.name}</h4>
                <h4>{this.state.selectedPlace.rating}</h4>
                <h4>{this.state.selectedPlace.address}</h4>
                <h4>{this.state.selectedPlace.button}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>

        </div>

        {/* <div>
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
              <img src={item.photos ? item.photos[0].formatted_address : item.photo} />
              <br />
              <h2>Hours: </h2>
              <h2>Ratings: {item.user_ratings_total}</h2>

            </div>


          )
          )
        } */}

      </div >

    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore
});

export default GoogleApiWrapper({ apiKey: 'API_KEY_GOES_HERE' })(connect(mapStateToProps)(GymNearMe));