import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    NavBar,InputItem,TextareaItem, Button, WhiteSpace
} from 'antd-mobile'

import {updateUser} from '../../redux/actions'


import AvatarSelector from '../../components/avatar-selector/index.tsx'

class LaoBanInfo extends Component {

    state = {
        avatar: '',
        post: '',
        info: '',
        company: '',
        salary: '',
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
            const path = type === 'lanbao' ? '/lanbao' : '/dashen'
            return <Redirect to={path}></Redirect>
        }

        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <AvatarSelector setAvatar={this.setAvatar}></AvatarSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={val => { this.handleChange('company', val)}}>公司名称</InputItem>
                <InputItem onChange={val => { this.handleChange('post', val)}}>招聘职位</InputItem>
                <InputItem onChange={val => { this.handleChange('salary', val)}}>职位薪资</InputItem>
                <TextareaItem title="职位要求" rows={3} onChange={val => { this.handleChange('info', val)}}></TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaoBanInfo)