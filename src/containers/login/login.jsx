import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import {connect} from 'react-redux'
import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'
// import ListItem from 'antd-mobile/lib/list/ListItem'

class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    login = () => {
        this.props.login(this.state)
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo} />
        }

        return (
            <div>
                <NavBar>嘿 嘿 置 评</NavBar>
                
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                
                <Logo></Logo>

                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>

                <WingBlank>
                    <InputItem placeholder="请输入用户名" onChange={val => {this.handleChange('username', val)}}>用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem placeholder="请输入密码" type='password' onChange={val => {this.handleChange('password', val)}}>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.toRegister}>去注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)