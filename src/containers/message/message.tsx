import React, {Component} from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'
import QueueAnim from 'rc-queue-anim'
import { RouteComponentProps } from 'react-router-dom'
import {UserI, MsgI} from '../../types/index'

function getLastMessage(chatMsgs: Array<any>, userid: string | undefined): Array<any>  {
    const lastMsgObjs: any = {}
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

    lastMsgs.sort((m1: any, m2: any) => {
        return m1.create_time - m2.create_time
    })

    return lastMsgs
}

interface Props extends RouteComponentProps {
    user: UserI,
    [key: string]: any,
}

interface State {
}


class Message extends React.Component<Props, State> {

    componentDidMount() {
        
    }

    render() {

        const user: UserI = this.props.user
        const {users, chatMsgs} = this.props.chat

        const lastMsgs: Array<any> = getLastMessage(chatMsgs, user._id)

        return (
            <List>
                <QueueAnim type="right" delay={300}>
                    {
                        lastMsgs.map((msg: any)  => {
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
                </QueueAnim>
            </List>
        )
    }
}

export default connect(
    (state: any) => ({user: state.user, chat: state.chat}),
    {}
)(Message)