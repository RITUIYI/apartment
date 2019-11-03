//城市列表处理
export const formatCityList = ({ allcity, location, hotcity }) => {
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
    });
    aList.unshift('#','热');
    
    aCitylists.unshift([location], hotcity);
    let obj = { aCitylists, aList }
    return obj;
}