import {
    AUTH_SUCCESS, ERR_MSG, 
    RECEIVE_USER, RESET_USER, 
    RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG,
    READ_MSG
} from './action-type'
import {
    reqRegister, reqLogin, 
    reqUpdateUser, reqUser, 
    reqUserList, reqChatMsgList, reqReadMsg,
} from '../api'
import io from 'socket.io-client'

const authSuccess = (user: any) => ({type: AUTH_SUCCESS, data: user})

const errMsg = (msg: string) => ({type: ERR_MSG, data: msg})

const receiveUser = (user: any) => ({type: RECEIVE_USER, data: user})

export const resetUser = (msg: string) => ({type: RESET_USER, data: msg})

export const receiveUserList = (userList: []) => ({type: RECEIVE_USER_LIST, data: userList})

export const receiveMsgList = (data: {users: {}, chatMsgs: []}) => ({type: RECEIVE_MSG_LIST, data})

export const receiveMsg = (chatMsg: {}, userid: string) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})

const readMsg = ({count , from, to}: any) => ({type: READ_MSG, data: {count, from, to}})

// 异步
export const register = (user: any) => {
    const {username, password, password2, type} = user

    if(!username || !username.trim()) return errMsg('用户名不能为空')
    if(password !== password2) return errMsg('密码不一致')

    return async (dispatch: any) => {
        const res: any = await reqRegister({username, password, type})
        if(res) {
            getMsgList(dispatch, res._id)
            dispatch(authSuccess(res))
        }
        else dispatch(errMsg('请求失败'))
    }
}

// 异步
export const login = (user: any) => {

    const {username, password} = user

    if(!username || !username.trim()) return errMsg('用户名不能为空')
    if(!password || !password.trim()) return errMsg('密码不能为空')


    return async (dispatch: any) => {
        const res: any = await reqLogin(user)
        if(res) {
            getMsgList(dispatch, res._id)
            dispatch(authSuccess(res))
        }
        else dispatch(errMsg('请求失败'))
    }
}

export const updateUser = function(user: any) {
    return async (dispatch: any) => {
        const res = await reqUpdateUser(user)
        if(res) dispatch(receiveUser(res))
        else dispatch(resetUser('请求失败'))
    }
}

export const getUser = function() {
    return async (dispatch: any) => {
        const user: any = await reqUser()
        if (user){
            getMsgList(dispatch, user._id)
            dispatch(receiveUser(user))
        } 
        else dispatch(resetUser('请求失败'))
    }
}

export const getUserList = (type: string) => {
    return async (dispatch: any) => {
        const res: any = await reqUserList({type})
        if(res) dispatch(receiveUserList(res))
        else dispatch(resetUser('请求失败'))
    }
}



let socket: any
export const sendMsg = (chatMsg: any) => {
    return async ( dispatch: any) => {
        await initIO(dispatch, chatMsg.from)
        socket.emit('sendMsg', chatMsg)
    }
}

function initIO (dispatch: any, userid: string) {
    return new Promise((resolve, reject) => {
        if(!socket) {
            socket = io('ws://localhost:4000')
            socket.on('receiveMsg', function(chatMsg: any) {
                console.log(chatMsg)
                if(userid === chatMsg.from || userid === chatMsg.to) {
                    dispatch(receiveMsg(chatMsg, userid))
                }
            })
        }
        resolve()
    })
}

async function getMsgList(dispatch: any, userid: string) {
    initIO(dispatch, userid)
    const res: any = await reqChatMsgList()
    if(res) {
        dispatch(receiveMsgList({users: res.users, chatMsgs: res.chatMsgs}))
    }
}

export const msgRead = (from: string, to: string) => {
    return async (dispatch: any) => {
        const res = await reqReadMsg({from})
        dispatch(readMsg({count: res, from , to}))
    }   
}