import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    NavBar,InputItem,TextareaItem, Button, WhiteSpace
} from 'antd-mobile'

import AvatarSelector from '../../components/avatar-selector/index.jsx'
import {updateUser} from '../../redux/actions'

class DaShenInfo extends Component {

    state = {
        avatar: '',
        post: '',
        info: '',
    }

    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    setAvatar = (avatar) => {
        this.setState({
            avatar
        })
    }

    save = () => {
        this.props.updateUser(this.state)
    }
    render() {

        const {avatar, type} = this.props.user

        if(avatar) {
            const path = type === 'laoban' ? '/laoban' : '/dashen'
            return <Redirect to={path}></Redirect>
        }

        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <AvatarSelector setAvatar={this.setAvatar}></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={val => { this.handleChange('post', val)}}>求职岗位</InputItem>
                <TextareaItem onChange={val => { this.handleChange('info', val)}}title="个人介绍" rows={3}></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DaShenInfo)