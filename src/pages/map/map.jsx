import React, { Component } from 'react';
import store from '../../redux/index'
import { getHouseInfo, getDetailHouseList } from '../../api/city'
import { baseURL } from '../../utils/http/config'
import './map.scss'
import { Toast } from 'antd-mobile';
let BMap = window.BMap;
class Map extends Component {
    constructor() {
        super();
        this.state = {
            locateCity: store.getState().locatCity,
            aHouseList: [],
            bShowList: false,
            level: 11,
            aHouseDetail: [],
            aLabelCollectScnd: [],
            aLabelCollectTop: [],
            aRemovedLabelScnd: [],
            aRemovedLabelTop: [],
            eventList: []
        }
    }
    /*  //地图上添加覆盖物
     addLabel = async (point, cityId, cityListName = '', scaleLevel) => {
 
         if (point) {
             //调整地图中心点
             this.map.centerAndZoom(point, scaleLevel);
             //当前位置指示点
             this.map.addOverlay(new BMap.Marker(point));
         }
 
         //获取指定区域房源数据
         let res = await getHouseInfo(cityId);
         let templist = res.data.body;
         this.setState({
             //储存房源数据  根据传入的字符串 对应存入父级分区 或 子分区
             [cityListName]: templist
         });
 
         templist.map(item => {
             //
             let { latitude, longitude } = item.coord;
             var point = new BMap.Point(longitude, latitude);
             let opts = {
                 position: point,// 指定文本标注所在的地理位置
                 offset: new BMap.Size(10, -10)    //设置文本偏移量
             }
             let label = new BMap.Label(`<div class='map_label01 ${cityListName === "childNodeCity" ? "child" : ""}'} ><p>${item.label}</p><span>${item.count}套</span></div>`, opts);  // 创建文本标注对象
             label.setStyle({
                 color: "red",
                 fontSize: "12px",
                 height: "20px",
                 lineHeight: "20px",
                 fontFamily: "微软雅黑"
             });
             //添加覆盖物
             this.map.addOverlay(label);
         })
         //给覆盖物添加事件
         let classa = 'map_label01 ';
         if (cityListName === "childNodeCity") {
             classa = 'map_label01 child'
         }
         document.addEventListener('click', (e) => {
             if (e.toElement.className === classa || e.target.parentNode.className === classa) {
                 let key, node;//获取点击的区域  以及dom节点
                 if (e.toElement.className === classa) {
                     key = (e.target.innerText.split(`\n`))[0];
                     node = e.target;
                 } else {
                     key = e.target.parentNode.children[0].innerText;
                     node = e.target.parentNode;
                 }
                 //匹配点击的数据
                 console.log(cityListName);
                 let selected = this.state[cityListName].find(item => item.label == key);
                 console.log(selected);
 
                 //显示子级区域
                 this.scaleMapToDetail(selected, node);
 
             }
         })
     }
 
     //显示子级区域
     scaleMapToDetail = async (item, node) => {
         try {
             //获取经纬度
             let { latitude, longitude } = item.coord;
             //生成地图点
             var point = new BMap.Point(longitude, latitude);
 
             //传入属性名  接收子区域房源列表
             let str = 'childNodeCity';
             //添加 房源列表 覆盖物
             this.addLabel(point, item.value, str, 13);
             //移出父级 房源区域覆盖物
             this.map.removeOverlay(node);
         } catch (error) {
             //如果点击的区域没有子分区
             this.setState({
                 bShowList: true
             });
             console.log(item.value);
             let aHouseList = await getHouseInfo(item.value);
             console.log(aHouseList);
 
         }
 
     } */


    //添加覆盖物
    addLabel = async ({ point, item = { value: this.state.locateCity.value } }) => {
        if (point) {
            //调整地图中心点
            this.map.centerAndZoom(point, this.state.level);
            //当前位置指示点
            // this.map.addOverlay(new BMap.Marker(point));
        }
        Toast.loading('房源信息加载中...', 0);

        let res = await getHouseInfo(item.value);

        let templist = res.data.body;
        templist.map(item => {
            let opts;
            let { latitude, longitude } = item.coord;
            var point = new BMap.Point(longitude, latitude);


            if (this.state.level === 15) {
                opts = {
                    position: point,// 指定文本标注所在的地理位置
                    offset: new BMap.Size(-65, -53)    //设置文本偏移量
                }
            } else {
                opts = {
                    position: point,// 指定文本标注所在的地理位置
                    offset: new BMap.Size(10, -10)    //设置文本偏移量
                }
            }

            let label = new BMap.Label(`<div class=${this.state.level === 11 || this.state.level === 13 ? 'map_label01' : (this.state.level === 15 ? 'map_label02' : '')}><p>${item.label}</p><span>${item.count}套</span></div>`, opts);  // 创建文本标注对象



            //收集最小标签点
            if (this.state.level === 15) {
                this.state.aLabelCollectScnd.push(label);
            }
            if (this.state.level === 13) {
                this.state.aLabelCollectTop.push(label);
            }


            //覆盖物点击事件
            label.addEventListener('click', (e) => {
                //如果是最小分区 则弹出该区房屋详情
                if (this.state.level === 15) {
                    let cityId = this.state.locateCity.value;
                    let area = item.value;
                    getDetailHouseList({ cityId, area }).then((res) => {
                        this.setState(state => {
                            return {
                                bShowList: true,
                                aHouseDetail: res.data.body.list
                            }
                        })
                    });
                    //居中点击的小区
                    let { clientX, clientY } = e.changedTouches[0];
                    let moveX = window.innerWidth / 2 - clientX;
                    let moveY = window.innerHeight / 4 - clientY;
                    this.map.panBy(moveX, moveY);

                } else {
                    //否则继续放大
                    this.scaleMapToDetail(item, e.target);
                }
            })

            // let fn = label.vi.onclick[(Object.keys(label.vi.onclick))[0]];
            // this.state.eventList.push(fn);

            //添加覆盖物
            this.map.addOverlay(label);
            Toast.hide();
        })

    }

    scaleMapToDetail = (item, node) => {

        //获取经纬度
        this.state.level = this.state.level + 2;
        let { latitude, longitude } = item.coord;
        //生成地图点
        var point = new BMap.Point(longitude, latitude);
        //移出父级 房源区域覆盖物
        setTimeout(() => {
            this.map.removeOverlay(node);
            //把移出的覆盖物加入对应级别数组 
            if (this.state.level > 13) {
                //收集移除的二级分区覆盖物
                this.state.aRemovedLabelScnd.push(node);
            } else {
                //收集移除的一级分区覆盖物
                this.state.aRemovedLabelTop.push(node);
            }
        }, 0);
        //添加 房源列表 覆盖物
        this.addLabel({ point, item });
    }

    componentDidMount = () => {
        //创建地图实例
        let map = new BMap.Map("map_container", { minZoom: 4, maxZoom: 25 });
        //设置地图滚轮缩放
        map.enableScrollWheelZoom();

        // TODO: 触摸移动时触发此事件 此时开启可以拖动。虽然刚初始化该地图不可以拖动，但是可以触发拖动事件。
        map.addEventListener("touchmove", function (e) {
            map.enableDragging();
        });
        // TODO: 触摸结束时触发次此事件  此时开启禁止拖动
        map.addEventListener("touchend", function (e) {
            map.disableDragging();
        });

        // 初始化地图 禁止拖动   注：虽禁止拖动，但是可以出发拖动事件
        map.disableDragging();

        //添加地图控件
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());

        //添加地图移动事件
        map.addEventListener('dragend', (e) => {
            this.setState({
                bShowList: false
            })
        })

        //添加地图缩放事件
        map.addEventListener("zoomend", (e) => {
            var ZoomNum = map.getZoom();
            this.state.level = ZoomNum;
            //地图缩放 小于13 移出最小分区 恢复二级分区
            if (ZoomNum < 13) {
                this.state.isClick = false;
                try {
                    //移除最小分区
                    this.state.aLabelCollectScnd.forEach(item => {
                        map.removeOverlay(item);
                    })
                    //恢复二级分区
                    this.state.aRemovedLabelScnd.forEach(item => {
                        map.addOverlay(item);
                    })
                } catch (error) {

                }
            }
            //移除二级分区  恢复一级分区
            if (ZoomNum <= 11) {
                try {
                    //移除二级分区
                    this.state.aLabelCollectTop.forEach(item => {
                        map.removeOverlay(item);
                    })
                    //恢复一级分区
                    this.state.aRemovedLabelTop.forEach(item => {
                        map.addOverlay(item);
                    })
                } catch (error) {

                }
            }

        });

        // 创建地址解析器实例     
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野 
        myGeo.getPoint(this.state.locateCity, (point) => {

            if (point) {
                //调整地图中心点
                map.centerAndZoom(point, 11);
                //当前位置指示点
                map.addOverlay(new BMap.Marker(point));
            }
            //添加覆盖物
            let classStr = 'map_label01';
            this.addLabel({ point, classStr });
        }, this.state.locateCity.label);

        this.map = map;
        this.myGeo = myGeo;
    }

    render() {
        return (
            <div>
                <div className="common_title">
                    <span className="back iconfont icon-prev" onClick={() => this.props.history.push("/layout")}></span>
                    <h3>地图找房</h3>
                </div>
                <div className="map_com">
                    <div id="map_container">

                    </div>
                </div>

                <div className={this.state.bShowList ? 'houseList houseListShow' : 'houseList houseListHide'}>
                    <div className="titleWrap">
                        <h1 className="listTitle">房屋列表</h1>
                        <a className="titleMore" href="/house/list">
                            更多房源
                    </a>
                    </div>

                    <div className="houseItems">
                        {
                            this.state.aHouseDetail.map(item => {
                                return (
                                    <div className="house" key={item.houseCode}>
                                        <div className="imgWrap">
                                            <img className="img" src={baseURL + item.houseImg} />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">{item.title}</h3>
                                            <div className="desc">{item.desc}</div>
                                            <div>
                                                {
                                                    item.tags.map((tag, index) => (<span className={"tag tag" + index} key={index}>{tag}</span>))
                                                }
                                            </div>
                                            <div className="price">
                                                <span className="priceNum">{item.price}</span> 元/月
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}
export default Map;