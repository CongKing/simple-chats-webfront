import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'


export default class NotFound extends Component {
    render() {
        return (
            <div>
                <div>
                <h2>找不到该页面</h2>
                <Button onClick={() => this.props.history.replace('/')}>回到首页</Button>
                </div>
            </div>
        )
    }
}