import { host } from '../utils/http/network'

//获取全部城市
export const getCity = (level) => {
    return host({
        url: '/area/city',
        params: {
            level
        }
    })
}

//获取热门城市
export const getHotCity = () => {
    return host({
        url: '/area/hot'
    })
}

//获取当前城市
export const queryCityInfo = (name) => {
    return host.get('/area/info?name=' + name);
}

//获取条件查询房屋
export const getHouseInfo = (cityId) => {
    return host.get('/area/map?id=' + cityId);
}

//获取相应地区详细房源列表  筛选
export const getDetailHouseList = ({ cityId, area, subway = undefined, rentType = undefined, price = undefined, more = undefined, roomType = undefined, oriented = undefined, characteristic = undefined, floor = undefined, start = undefined, end = undefined }) => {
    return host({
        url: '/houses',
        params: {
            cityId,
            area, subway,
            rentType,
            price,
            more,
            roomType,
            oriented,
            characteristic,
            floor,
            start,
            end
        }
    })
}