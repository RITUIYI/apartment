import { host } from '../utils/http/network'

//轮播图
export const getSwiper = () => {
    return host({
        url: '/home/swiper'
    })
}

//租房小组
export const hireGroup = (areaId) => {
    return host({
        url: '/home/groups',
        params: {
            area: areaId
        }
    })
}

//获取资讯
export const getNews = () => {
    return host({
        url: '/home/news'
    })
}