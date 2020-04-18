import React, { Component } from 'react';
import { connect } from "react-redux";
import Map from './Map';
import { AppBar, 
    Typography,
    FormControl,
    RadioGroup, 
    FormControlLabel, 
    Radio,
    TextField
  } from '@material-ui/core';

class Home extends Component {
  constructor( props ){
    super( props );
    this.state = {
      optionArray: [],
      query: '',
      country: this.props.country,
      isStrictBounds: this.props.isStrictBounds
    }
  }
 
  handleScriptLoad = () => {
    // add country in the restrictions if Strict bounds checkbox is selected
    var componentRestrictions = this.props.isStrictBounds !== false ? {country: this.props.country} : null
    
    let options = {
      types: this.state.optionArray,
      componentRestrictions 
    };
 
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors DO NOT REMOVE
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );
    // set fields you want to access
    this.autocomplete.setFields(['address_components', 'geometry', 'formatted_address']);
    //if place changed or selected from the dropdown
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);    
  }
  handlePlaceSelect = () => {
    // get address details
    const place = this.autocomplete.getPlace();
    const address2 = place && place.address_components;
    var address = '';

    // Check if address is valid
    if (address2) {
      this.setState({
        query: place.formatted_address,
      });
      address = [
        (place.address_components[0] && (place.address_components[0].long_name || '')),
        (place.address_components[1] && (place.address_components[1].long_name || '')),
        (place.address_components[2] && (place.address_components[2].long_name || ''))
      ].join(', ');

      var addressDetails = {
        address: address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      // call update location action
      this.props.updateLocation(addressDetails);
    }
  }
  // update input value of address field
  searchAddress = (e) => {
    this.setState({
      query: e.target.value,
    });
  }
  // change option value radio
  changeOption = (e) => {
    const option = e.target.value;
    // call change option action
    this.props.changeType(option);
    
    this.setState({
      optionArray: option === 'all' ? [] : [option],
      query: ''
    });   
  }
  // set strict bounds yes or no
  handleStrictBounds = (e) => {
    // call select bounds action
    this.props.updateBounds(e.target.checked);
    this.setState({
      isStrictBounds: e.target.checked,
      query: ''
    });  
  }
  render() {
    return (
      <React.Fragment> 
        <AppBar style={{backgroundColor: `lightslategrey`}}>                  
          <Typography>Autocomplete Search</Typography>               
        </AppBar>
        <FormControl component="fieldset" >
          <RadioGroup aria-label="gender" name="gender1" defaultValue="all" classes={{root: 'OptionStyle'}} onClick={this.changeOption.bind(this)} style={{display:'inline', paddingTop: `25px`}}>
            <FormControlLabel value="all" ref="all" control={<Radio />} label="All" />
            <FormControlLabel value="establishment" control={<Radio />} label="Establishment" />
            <FormControlLabel value="address" control={<Radio />} label="Address" />
            <FormControlLabel value="geocode" control={<Radio />} label="Geocode" /> 
            </RadioGroup>
        </FormControl>
        <div className="secondRow">
          <input type="checkbox" id="myCheck" onClick={this.handleStrictBounds} /><span>Strict Bounds</span>
          <br />
          <TextField 
            id="autocomplete" 
            placeholder="Enter location" 
            onFocus={this.handleScriptLoad} 
            onChange={this.searchAddress}
            inputvalue={this.state.query}
            value={this.state.query}
            style={{
              margin: '0 auto',
              width: '290px',
              border: '1px solid grey',
              marginTop: '15px'
            }}
          />
        </div>
        <Map
          addressDetails={this.props.addressDetails}
        />  
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    addressDetails: state.addressDetails,
    option: state.option,
    country: state.country,
    isStrictBounds: state.isStrictBounds
  };
};
const mapDispachToProps = dispatch => {
  return {
    changeType: (option) => dispatch({ type: "CHANGETYPE_OPTION", value: option }),
    updateBounds: (bounds) => dispatch({ type: "SELECT_BOUNDS", value: bounds}),
    updateLocation: (addressDetails) => dispatch({ type: "CHANGE_ADDRESS", value: addressDetails })
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(Home);