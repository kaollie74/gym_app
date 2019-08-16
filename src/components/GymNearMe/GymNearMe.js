import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class GymNearMe extends Component {

  state= {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });


  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {

   


    const mapStyles = {
      width: '50%',
      height: '50%',
    };

    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 44.986656, lng: -93.258133 }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Minneapolis, MN'}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>  
        {/* <Marker position={{ lat: 44.986656, lng: -93.258133 }} /> */}
      </Map>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default GoogleApiWrapper({ apiKey:'' })(connect(mapStateToProps)(GymNearMe));