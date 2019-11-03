import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { hireGroup } from '../../../api/home'
import { baseURL } from '../../../utils/http/config'
import store from '../../../redux/index'
class Groups extends Component {
    constructor() {
        super();
        this.state = {
            aHireGroups: [],
            areaId: store.getState().locatCity.value
        };
        this.unsubscribed = store.subscribe(this.updateData)
    }
    async componentDidMount() {

        let aGroups = await hireGroup(this.state.areaId);
        this.setState({
            aHireGroups: aGroups.data.body
        })
    }

    componentWillUnmount = () => {
        this.unsubscribed();
    }

    updateData = () => {

        this.setState({
            areaId: store.getState().locatCity.value
        }, async () => {
            let aGroups = await hireGroup(this.state.areaId);
            this.setState({
                aHireGroups: aGroups.data.body
            })
        })
    }

    render() {
        return (
            <div className="model2">
                <div className="title_con">
                    <h3>租房小组</h3>
                    <Link to="#" className="iconfont icon-next"></Link>
                </div>
                <ul className="house_list">
                    {
                        this.state.aHireGroups.map(item => (
                            <li key={item.id}>
                                <p className="fl">{item.title}</p>
                                <img src={baseURL + item.imgSrc} alt="" className="fr" />
                                <span className="fl">{item.desc}</span>
                            </li>
                        ))
                    }

                </ul>
            </div>
        );
    }
}

export default Groups;