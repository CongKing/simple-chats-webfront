import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import { connect } from 'react-redux'

import LaoBanInfo from '../laoban-info'
import DaShenInfo from '../dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'

import NavFooter from '../../components/nav-footer/nav-footer'

import {getRedirectUrl} from '../../utils/index'
import {getUser} from '../../redux/actions'
import { NavBar } from 'antd-mobile'

import '../../assets/style/style.less'
import Chat from '../chat/chat'

class Main extends Component {

    navList = [
        {
            path: '/dashen',
            component: Laoban,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
            
        },
        {
            path: '/laoban',
            component: Dashen,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal',
            component: Personal,
            title: '个人中心',
            icon: 'personal',
            text: '个人',
        },
    ]

    componentDidMount() {
        const userid = Cookie.get('userid')
        const {_id} = this.props.user
        if(userid && !_id) {
            this.props.getUser()
        }
    }

    render() {

        const userid = Cookie.get('userid')
        if(!userid) {
            return <Redirect to="/login"></Redirect>
        }

        const {_id, type, avatar} = this.props.user
        const {unReadCount} = this.props

        if(!_id) {
            return null
        } else {
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectUrl(type, avatar)
                return <Redirect to={path}></Redirect>
            }
        }

        let {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path) 

        if(type === 'laoban') {
            navList = navList.filter(nav => nav.path !== '/dashen')
        } else {
            navList = navList.filter(nav => nav.path !== '/laoban')
        }

        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => {
                            return <Route key={nav.path} path={nav.path} component={nav.component}></Route>
                        })
                    }
                    <Route path="/laobaninfo" component={LaoBanInfo}></Route>    
                    <Route path="/dashenInfo" component={DaShenInfo}></Route>
                    <Route path="/chat/:userid" component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter unReadCount={unReadCount} navList={navList}></NavFooter> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)
