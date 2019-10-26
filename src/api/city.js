import { host } from '../utils/http/network'

export const getCity = (level) => {
    return host({
        url: '/area/city',
        params: {
            level
        }
    })
}