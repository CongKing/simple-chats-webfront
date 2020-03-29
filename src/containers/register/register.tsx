import React from 'react'
import {Redirect, RouteComponentProps} from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'

import Logo from '../../components/logo/logo'
import ListItem from 'antd-mobile/lib/list/ListItem'
import {UserI, UserStateI} from '../../types/index'

interface Props extends RouteComponentProps {
    register: Function,
    user: UserStateI
}

interface State extends UserI {
    [key: string]: any,
}

class Register extends React.Component<Props, State> {
    readonly state: State = {
        username: '',
        password: '',
        password2: '',
        type: 'laoban',
    }

    register = () => {
        this.props.register(this.state)
    }

    handleChange(prop: string, val: any) {
        this.setState({
            [prop]: val
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const {type} = this.state
        const {redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>招兵买马</NavBar>
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
                    <InputItem placeholder="请输入确认密码" type='password' onChange={val => {this.handleChange('password2', val)}}>确认密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <ListItem>
                        <span>用户类型</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>    
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>职员</Radio>    
                    </ListItem>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    (state: any) => ({user: state.user}),
    {register}
)(Register)