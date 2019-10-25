import React, { Component } from 'react';
import Home from '../home/home'
import Houselist from '../houselist/houselist'
import Info from '../info/info'
import Profile from '../profile/profile'
import { Route, Link, Redirect } from 'react-router-dom'
import './layout.css'

class Layout extends Component {
    render() {
        return (
            <div>
                {/* layout 子路由 */}
                <Route path="/layout/home" component={Home} />
                <Route path="/layout/houselist" component={Houselist} />
                <Route path="/layout/info" component={Info} />
                <Route path="/layout/profile" component={Profile} />

                <Redirect exact from="/layout" to="/layout/home" />
                <footer>
                    <ul>
                        {/* 自定义组件 设置样式 */}
                        <CustomLink label="首页" to="/layout/home" iconclass="iconfont icon-home1" />
                        <CustomLink label="找房" to="/layout/houselist" iconclass="iconfont icon-ziyuan" />
                        <CustomLink label="资讯" to="/layout/info" iconclass="iconfont icon-zixun" />
                        <CustomLink label="我的" to="/layout/profile" iconclass="iconfont icon-wode" />
                    </ul>
                </footer>

            </div>
        );
    }
}

function CustomLink({ to, exact, label, iconclass }) {
    return (
        <Route
            path={to}
            exact={exact}
            children={
                ({ match }) => {
                    return (
                        <li className={match ? 'active' : ''}>
                            <Link to={to} className={iconclass}></Link>
                            <h4>{label}</h4>
                        </li>
                    )
                }
            }
        />
    )
}

export default Layout;