import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="list_title">
                <span className="back iconfont icon-prev"></span>
                <div className="search_con">
                    <span className="city">深圳</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <span className="village"><i className="iconfont icon-fangdajing"></i> 请输入小区名</span>
                </div>
                <i className="iconfont icon-ic-maplocation-o tomap"></i>
            </div>
        );
    }
}

export default Search;