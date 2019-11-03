import React, { Component } from 'react';
import './home.scss'
import Slider from './slider/slider'
import News from './news/news'
import Groups from './groups/group'
import Search from './search/search'
import { Link } from 'react-router-dom'
import store from '../../redux/index'

import { queryCityInfo } from '../../api/city'
import { setLocatCity, getLocatCity } from '../../utils/storage/cityinfo'
class Home extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    //定位城市并查询城市信息 储存数据至本地与redux
    setLocatCity() {
        var myCity = new window.BMap.LocalCity();
        myCity.get(async (result) => {
            var cityName = result.name;
            let city = await queryCityInfo(cityName);
            let action = {
                type: 'initLocatCity',
                value: city.data.body
            }
            store.dispatch(action);
            setLocatCity(city.data.body);
        });
    }

    componentDidMount = () => {
        //如果本地有当前城市数据 
        if (getLocatCity()) {
            //从本地获取城市储存到redux
            let action = {
                type: 'initLocatCity',
                value: getLocatCity()
            }
            store.dispatch(action);
            return;
        }
        //本地没有数据则发送请求获取数据并存到本地以及redux
        this.setLocatCity();
    }

    render() {
        return (
            <div className="home_container">
                <div className="slide_con">
                    <Slider />
                </div>
                <Search />
                <ul className="menu_con">
                    <li>
                        <Link to="#"><i className="iconfont icon-zufang1"></i></Link>
                        <h4>整租</h4>
                    </li>
                    <li>
                        <Link to="#"><i className="iconfont icon-usergroup"></i></Link>
                        <h4>合租</h4>
                    </li>
                    <li>
                        <Link to="/map"><i className="iconfont icon-ic-maplocation-o"></i></Link>
                        <h4>地图找房</h4>
                    </li>
                    <li>
                        <Link to="#"><i className="iconfont icon-zufang"></i></Link>
                        <h4>去出租</h4>
                    </li>
                </ul>

                <Groups />
                <News />
            </div>
        );
    }
}

export default Home;