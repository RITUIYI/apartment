import React, { Component } from 'react';
import City from '../citylist/city'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            bIsCitySelect: false
        }
    }
    //隐藏城市选择页
    hideCitySelect = () => {
        this.setState({
            bIsCitySelect: false
        })
    }

    render() {
        return (
            <div className="search_bar">
                {/* 搜索栏 */}
                <div className="search_con">
                    <span className="city" onClick={() => this.setState({
                        bIsCitySelect: true
                    })}>深圳</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <div className="village"><i className="iconfont icon-fangdajing"></i><input type="text" placeholder=" 请输入小区名" /></div>
                </div>
                {/* 城市选择页 */}
                <City hideCitySelect={this.hideCitySelect} isShow={this.state.bIsCitySelect} />
                <i className="iconfont icon-ic-maplocation-o tomap"></i>
            </div>
        );
    }
}

export default Search;