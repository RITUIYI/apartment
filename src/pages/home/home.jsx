import React, { Component } from 'react';
import './home.scss'
import Slider from './slider/slider'
import News from './news/news'
import Groups from './groups/group'
import Search from './search/search'
import { Link } from 'react-router-dom'
class Home extends Component {

    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return (
            <div className="home_container">
                <div className="slide_con">
                    <Slider />
                </div>
                <Search/>
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
                        <Link to="#"><i className="iconfont icon-ic-maplocation-o"></i></Link>
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