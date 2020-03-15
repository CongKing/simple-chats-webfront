import React, {Component} from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'

import { resetUser } from '../../redux/actions'
const Item = List.Item

class Personal extends Component {

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
                    // TODO 删除 user
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        console.log('Personal')

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
    state => ({user: state.user}),
    {resetUser}
)(Personal)