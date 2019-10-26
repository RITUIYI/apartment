import React, { Component } from 'react';
import './city.scss'

import { getCity } from '../../../api/city'
import { formatCityList } from '../../../utils/maths/math'
class City extends Component {
    constructor() {
        super();
        this.state = {
            aAllcity: [],
            aList: []
        }
    }

    componentDidMount = async () => {
        //获取
        let res = await getCity(1);
        let allcity = res.data.body;
        let { aCitylists, aList } = formatCityList(allcity);
        this.setState({
            aAllcity: aCitylists,
            aList
        })
    }

    render() {
        return (
            <div className={this.props.isShow ? 'city_wrap slideUp' : 'city_wrap slideDown'}>
                {/* 关闭页面 */}
                <div className="city_title">
                    <span onClick={this.props.hideCitySelect} className="shutoff iconfont icon-shut"></span>
                    <h3>选择城市</h3>
                </div>

                <div className="group_con">
                    <div className="city_group">
                        <h4>当前定位</h4>
                        <ul>
                            <li>深圳</li>
                        </ul>
                    </div>
                    <div className="city_group">
                        <h4>热门城市</h4>
                        <ul>
                            <li>北京</li>
                            <li>上海</li>
                            <li>广州</li>
                        </ul>
                    </div>
                    {
                        this.state.aList.map((item, index) => {
                            return (
                                <div key={index} className="city_group">
                                    <h4>{item}</h4>
                                    <ul>
                                        {
                                            this.state.aAllcity[index].map(city => {
                                                return (<li key={city.value}>{city.label}</li>)
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <ul className="city_index">
                    <li><span>#</span></li>
                    <li><span>热</span></li>
                    {
                        this.state.aList.map((item, index) => {
                            return (
                                <li key={index}><span>{item}</span></li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default City;