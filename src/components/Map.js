// AsyncMap - where all the react-google-maps components is form
// withGoogleMap - initializes the google map component
// withScriptjs - what loads the google maps API v3
// GoogleMap - component that receives 2 props defaultZoom and defaultCenter
// Marker - component that receives position of your red marker and draggable flag
// InfoWindow - component that receives position of your tooltip and the message

import React, { PureComponent } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, InfoWindow} from 'react-google-maps';

class Map extends PureComponent {
  render(){
    const AsyncMap = withScriptjs(
      withGoogleMap(
       props => (
        <div>
          <GoogleMap       
            defaultZoom={13}
            defaultCenter={{ lat: this.props.addressDetails.lat, lng: this.props.addressDetails.lng }}
          >
          {
            this.props.addressDetails.address !== '' &&
            <div>
              <Marker           
                draggable={false}
                position={{ lat: this.props.addressDetails.lat, lng: this.props.addressDetails.lng }}
              />
              <InfoWindow
                position={{ lat: this.props.addressDetails.lat, lng: this.props.addressDetails.lng }}
              >
                <div>
                  <span style={{ padding: 0, margin: 0 }}>
                  { this.props.addressDetails.address }</span>
                </div>
              </InfoWindow>
            </div>
          }      
          </GoogleMap>
        </div>
        )
      )
    );
    return (
      <div>
        <AsyncMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA6oZPo6876s6YPgYc2SZgTCCBKJL_rmk&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px`, marginTop: `20px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> 
      </div>
    )
  }
}
export default Map;