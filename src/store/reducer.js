const initialState = { 
    addressDetails: {
        address: '',
        lat: -33.8648186, //sydney
        lng: 151.2127704 //sydney
    },
    option: 'all',
    isStrictBounds: false,
    country: ''
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){
        case 'CHANGETYPE_OPTION': // choose between establishment, address, geocode, or all
            newState.option = action.value;
            break;
        case 'CHANGE_ADDRESS': // update address from the autocomplete search
            newState.addressDetails = action.value;
            break;
        case 'CLEAR_ADDRESS': // clear the address in the input box
            newState.addressDetails.address = '';
            break;
        case 'SELECT_BOUNDS': // select bounds based on country
            newState.isStrictBounds = action.value;
            break;
        case 'GET_COUNTRY': // get current country to use for bounds
            newState.country = action.value;
            break;
        default:
            break;
    }
    return newState;
};

export default reducer;