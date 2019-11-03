import React, { Component } from 'react';
import City from '../citylist/city'
import store from '../../../redux/index'

import { withRouter } from 'react-router-dom'
class Search extends Component {
    constructor() {
        super();
        this.state = {
            bIsCitySelect: false,
            locatCity: store.getState().locatCity
        }
        this.unsubscribed = store.subscribe(this.updateData)
    }
    //隐藏城市选择页
    hideCitySelect = () => {
        this.setState({
            bIsCitySelect: false
        })
    }

    updateData = () => {
        this.setState({
            locatCity: store.getState().locatCity
        })
    }

    componentWillUnmount = () => {
        this.unsubscribed();
    }

    render() {
        return (
            <div className="search_bar">
                {/* 搜索栏 */}
                <div className="search_con">
                    <span className="city" onClick={() => this.setState({
                        bIsCitySelect: true
                    })}>{this.state.locatCity.label}</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <div className="village"><i className="iconfont icon-fangdajing"></i><input type="text" placeholder=" 请输入小区名" /></div>
                </div>
                {/* 城市选择页 */}
                <City hideCitySelect={this.hideCitySelect} isShow={this.state.bIsCitySelect} />
                <i className="iconfont icon-ic-maplocation-o tomap" onClick={ () => this.props.history.push('/map') } ></i>
            </div>
        );
    }
}

let WithRouterSearch = withRouter(Search);


export default WithRouterSearch;