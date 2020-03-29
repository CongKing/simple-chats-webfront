import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button } from 'antd-mobile'


const NotFound: React.FC<RouteComponentProps> = (props) =>{
    return (
        <div>
            <div>
            <h2>找不到该页面</h2>
            <Button onClick={() => props.history.replace('/')}>回到首页</Button>
            </div>
        </div>
    )
}

export default withRouter(NotFound)