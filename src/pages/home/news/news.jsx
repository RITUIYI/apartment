import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { getNews } from '../../../api/home'
import { baseURL } from '../../../utils/http/config'
class News extends Component {
    constructor() {
        super();
        this.state = {
            aNews: []
        }
    }

    componentDidMount = async () => {
        let aNewslist = await getNews();
        this.setState({
            aNews: aNewslist.data.body
        })
    }

    render() {
        return (
            <div className="model mb120">
                <div className="title_con">
                    <h3>最新资讯</h3>
                    <Link to="#" className="iconfont icon-next"></Link>
                </div>
                <ul className="list">
                    {
                        this.state.aNews.map(item => {
                            return (
                                <li key={item.id}>
                                    <Link to="#"><img src={baseURL + item.imgSrc} alt="" /></Link>
                                    <div className="detail_list">
                                        <h4>置业选择 | 安贞西里 三室一厅河间的古雅别院</h4>
                                        <div className="detail">
                                            <span>新华网</span>
                                            <em>两天前</em>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}

export default News;