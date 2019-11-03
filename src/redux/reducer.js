import { getLocatCity } from '../utils/storage/cityinfo'
let currentCity = getLocatCity();
let stateDefault;

if (currentCity) {
    stateDefault = {
        locatCity: currentCity
    }
} else {
    stateDefault = {
        locatCity: {
            label: '广州'
        }
    }
}

let getNewState = (state) => JSON.parse(JSON.stringify(state));

let reducer = (state = stateDefault, action) => {
    if (action.type === 'initLocatCity') {
        let newState = getNewState(state);
        newState.locatCity = action.value;
        return newState;
    }

    return state;
}

export default reducer