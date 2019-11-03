let setLocalstorage = (data, name) => {
    localStorage.setItem(name, JSON.stringify(data));
}

let getLocalstorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
}


//存入当前城市
export const setLocatCity = (city) => {
    setLocalstorage(city, 'currentCity');
}
//取出当前城市
export const getLocatCity = () => {
    return getLocalstorage('currentCity');
}