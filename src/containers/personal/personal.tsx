import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'
import { RouteComponentProps } from 'react-router-dom'

import { resetUser } from '../../redux/actions'
import {UserI} from '../../types/index'

const Item = List.Item

interface Props extends RouteComponentProps {
    resetUser: Function,
    user: UserI
}

interface State extends UserI {
}

class Personal extends React.Component<Props, State> {

    handleLogout = () => {
        Modal.alert('退出', '确认退出登录嘛？', [
            {
                text: '取消',
                onPress: () => {

                }
            },
            {
                text: '确定',
                onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {

        const {username, info, avatar, company, post, salary} = this.props.user

        return (
            <div>
                <Result
                img={<img alt="header" src={require(`../../assets/images/${avatar}.png`)} style={{width: 50}} />} 
                title={username}
                message={company}
                ></Result>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：{salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button type="warning" onClick={this.handleLogout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    (state: any) => ({user: state.user}),
    {resetUser}
)(Personal)