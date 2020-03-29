import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS, 
    ERR_MSG, 
    RECEIVE_USER, 
    RESET_USER,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    READ_MSG,
} from './action-type'

import {RECEIVE_USER_LIST} from './action-type'
import {getRedirectUrl} from '../utils'

// 用户登录 & 用户列表
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: '', 
}

function user (state = initUser, action: any) {
    switch(action.type) {
        case AUTH_SUCCESS: // data user
            const {type, avatar} = action.data 
            return {...state, ...action.data, redirectTo: getRedirectUrl(type, avatar)}
        case ERR_MSG: // data: msg
            return {...state, msg: action.msg}
        case RECEIVE_USER: // data: msg
            return {...action.data}
        case RESET_USER: // data: msg
            return {...initUser, msg: action.msg}
        default:
            return state
    }
}

// 用户列表
const initUserList: any = []
function userList(state = initUserList, action: any) {
    switch(action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default: 
        return state
    }
}


// 消息 
const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0,
}

function chat (state=initChat, action: {type: string, data: {users: {}, chatMsgs: [], userid: string, chatMsg: any}}) {
    switch(action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preCount, msg: any) => {
                    return preCount + (!msg.read && msg.to === action.data.userid ? 1 : 0)
                }, 0),
            }
        case RECEIVE_MSG: 
            const {chatMsg, userid} = action.data

            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid ? 1 : 0),
            }
        case READ_MSG:
            const data: any = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map((msg: any) => {
                    if(msg.from === data.from && msg.to === data.to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - data.count
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat,
})