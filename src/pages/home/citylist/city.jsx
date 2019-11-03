import React, { Component, createRef } from 'react';
import { AutoSizer, List } from 'react-virtualized'
import './city.scss'

import { getCity, getHotCity, queryCityInfo } from '../../../api/city'
import { formatCityList } from '../../../utils/maths/math'
import store from '../../../redux/index'
import { setLocatCity, getLocatCity } from '../../../utils/storage/cityinfo'
import { Toast } from 'antd-mobile';
class City extends Component {
    constructor() {
        super();
        this.state = {
            aAllcity: [],
            aList: [],
            activeCity: '#',
            bIsClick: false,
            initAllcity: [],
            hotcity: [],
            locatCity: store.getState().locatCity
        };
        // this.listRef = React.createRef();
        this.unsubscribed = store.subscribe(this.updateData)
    }

    componentWillUnmount = () => {
        this.unsubscribed();
    }

    updateData = () => {
        this.setState({
            locatCity: store.getState().locatCity
        }, async () => {
            let location = this.state.locatCity;

            let allcity = this.state.initAllcity;
            let hotcity = this.state.hotcity;

            let { aCitylists, aList } = formatCityList({ allcity, location, hotcity });
            this.setState({
                aAllcity: aCitylists,
                aList
            })
            setLocatCity(location);
        })
    }

    componentDidMount = async () => {
        //获取城市数据
        let res = await getCity(1);
        let allcity = res.data.body;
        //获取热门城市
        let hotcity = await getHotCity();
        hotcity = hotcity.data.body;

        this.setState({
            initAllcity: allcity,
            hotcity: hotcity,
        })

        let location = getLocatCity();

        //处理城市列表数据
        let { aCitylists, aList } = formatCityList({ allcity, location, hotcity });
        this.setState({
            aAllcity: aCitylists,
            aList
        })
    }

    changeCurrentCity = async (city) => {
        if (this.state.aAllcity[0][0].label === city.label) {
            return Toast.info('当前城市已选择');
        }

        let changCity = city;
        //判断城市选择 是否有城市数据
        if (city.label !== '上海') {
            let Usablecity = await queryCityInfo(city.label);
            if (Usablecity.data.body.label === '上海') {
                return Toast.info('所选区域还没开通业务，敬请期待！');
            }
            changCity = Usablecity.data.body;
        }

        this.props.hideCitySelect();

        setLocatCity(changCity);
        let action = {
            type: 'initLocatCity',
            value: changCity
        };
        store.dispatch(action);
    }

    //列表渲染
    rowRenderer = ({ key, index, style }) => {

        return (
            <div style={style} key={key} className="city_group">
                <h4>{this.state.aList[index] === '热' ? '热门城市' : (this.state.aList[index] === '#' ? '当前城市' : this.state.aList[index])}</h4>
                <ul>
                    {
                        this.state.aAllcity[index].map(city => {
                            return (<li onClick={() => this.changeCurrentCity(city)} key={city.value}>{city.label}</li>)
                        })
                    }
                </ul>
            </div>
        )
    }

    //列表滚动
    scorllList = ({ startIndex }) => {
        if (!this.state.bIsClick) {
            this.setState(state => ({
                activeCity: state.aList[startIndex]
            }))
        }
    }

    //侧边栏点击事件
    handleSlideBar = (item, index) => {
        this.setState({
            activeCity: item,
            bIsClick: true
        });
        this.listRef.current.scrollToRow(index);
        setTimeout(this.setState({
            bIsClick: false
        }), 200);
    }
    //设置每一行高度
    setRowHeigth = ({ index }) => {
        let length = this.state.aAllcity[index].length;
        return 40 + 58 * length;
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
                    <AutoSizer>
                        {({ width, height }) => {
                            return (<List
                                ref={this.listRef}
                                width={width}
                                height={height}
                                rowCount={this.state.aAllcity.length}
                                rowHeight={this.setRowHeigth}
                                rowRenderer={this.rowRenderer}
                                onRowsRendered={this.scorllList}
                                scrollToAlignment='start'
                            />)
                        }}
                    </AutoSizer>
                </div>
                <ul className="city_index">
                    {
                        this.state.aList.map((item, index) => {
                            return (
                                <li className={this.state.activeCity === item ? 'active' : ''} onClick={() => this.handleSlideBar(item, index)} key={index}><span>{item}</span></li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default City;