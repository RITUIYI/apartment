export const formatCityList = (allcity) => {
    allcity.forEach(item => {
        item.charCode = item.short[0].charCodeAt();
    })
    let aCityList = {};
    allcity.forEach(item => {
        let key = item.short[0].toLocaleUpperCase();
        if (!aCityList.hasOwnProperty(key)) {
            aCityList[key] = [];
            aCityList[key].push(item);
        } else {
            aCityList[key].push(item);
        }
    })
    let aList = Object.keys(aCityList).sort();
    let aCitylists = aList.map(item => {
        return aCityList[item];
    })
    let obj = { aCitylists, aList }
    return obj;
}