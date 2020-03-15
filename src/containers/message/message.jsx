import React, {Component} from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'


function getLastMessage(chatMsgs, userid) {
    const lastMsgObjs ={}
    chatMsgs.forEach(msg => {
        
        if(msg.to === userid && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        

        const chatId = msg.chat_id
        let lastMsg = lastMsgObjs[chatId]

        if(!lastMsg) {
            lastMsgObjs[chatId] = msg
        } else {
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })

    const lastMsgs = Object.values(lastMsgObjs)

    lastMsgs.sort((m1, m2) => {
        return m1.create_time - m2.create_time
    })

    return lastMsgs
}

class Message extends Component {

    componentDidMount() {
        
    }

    render() {

        const user = this.props.user
        const {users, chatMsgs} = this.props.chat

        const lastMsgs = getLastMessage(chatMsgs, user._id)

        return (
            <List>
                {
                    lastMsgs.map(msg => {
                        const targetUserId = msg.to === user._id ? msg.from : msg.to
                        const targetUser = users[targetUserId]
                        
                        return (
                            <List.Item 
                                key={msg._id} 
                                extra={<Badge text={msg.unReadCount}></Badge>}
                                thumb={msg.avatar ? require(`../../assets/images/${targetUser.avatar}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                                >
                                    {
                                        users[
                                            msg.to === user._id 
                                            ? msg.from 
                                            : msg.to
                                        ].username
                                    }
                                    <Brief>
                                    {msg.content}
                                    </Brief>
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)