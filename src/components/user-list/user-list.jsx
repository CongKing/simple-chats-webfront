import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props
        return (
            <WingBlank>
                <QueueAnim type="scale" delay={200}>
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace></WhiteSpace>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Card.Header 
                                        thumb={user.avatar ? require(`../../assets/images/${user.avatar}.png`) : null}
                                        extra={user.username}
                                    >
                                    </Card.Header>
                                    <Card.Body>
                                        <div>职位： {user.post}</div>
                                        {user.company ? <div>公司： {user.company} </div> : null}
                                        {user.salary ? <div>月薪： {user.salary} </div> : null}
                                        <div>描述： {user.info}</div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)