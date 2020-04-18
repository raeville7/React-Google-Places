import { put, 
      takeEvery, 
      select
   } from 'redux-saga/effects';

import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyBA6oZPo6876s6YPgYc2SZgTCCBKJL_rmk');

export const getAddress = (state) => state.addressDetails;

export const getCountryFromCoordinates = (data) => new Promise((resolve) => {
   Geocode.fromLatLng( data.lat , data.lng ).then(
      response => {
         var addr = response.results[0].address_components;             
         for (var i=0; i<addr.length; i++) {
            if (addr[i].types[0] === "country") {
               const country = addr[i].short_name;
               resolve(country); 
            }
         }
      },
      error => {
         console.error(error);
      }
   );  
});

function* getCountry(){
   // get the address details from store
   const address = yield select(getAddress);  
   // call function to get the country
   const country = yield getCountryFromCoordinates(address);
   // pass country to Home
   yield put({type: 'GET_COUNTRY', value: country})
}


function* mySaga() {
   // for every call of SELECT_BOUNDS action
   yield takeEvery("SELECT_BOUNDS", getCountry); 
}
  
export default mySaga;