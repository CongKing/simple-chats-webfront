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
import {AnyAction, Dispatch} from 'redux'
import {UserI} from '../types/index'

// 登录成功
const authSuccess = (user: UserI): AnyAction => ({type: AUTH_SUCCESS, data: user})
// 用户列表
const receiveUser = (user: UserI): AnyAction => ({type: RECEIVE_USER, data: user})
// 错误消息
const errMsg = (msg: string): AnyAction => ({type: ERR_MSG, data: msg})

/**
 * 清除 user 信息
 * @param msg 
 */
export const resetUser = (msg: string): AnyAction => ({type: RESET_USER, data: msg})
/**
 * 获取用户列表
 * @param userList 
 */
export const receiveUserList = (userList: []): AnyAction => ({type: RECEIVE_USER_LIST, data: userList})
/**
 * 接受所有消息
 * @param data 
 */
export const receiveMsgList = (data: {users: {}, chatMsgs: [], userid: string}): AnyAction => ({type: RECEIVE_MSG_LIST, data})
/**
 * 接受一条消息
 * @param chatMsg 
 * @param userid 
 */
export const receiveMsg = (chatMsg: {}, userid: string): AnyAction => ({type: RECEIVE_MSG, data: {chatMsg, userid}})

// 消息已读
const readMsg = ({count , from, to}: any): AnyAction => ({type: READ_MSG, data: {count, from, to}})

/**
 * 注册
 * @param user 
 */
export const register = (user: UserI) => {
    const {username, password, password2, type} = user

    if(!username || !username.trim()) return errMsg('用户名不能为空')
    if(password !== password2) return errMsg('密码不一致')

    return async (dispatch: Dispatch) => {
        const res: any = await reqRegister({username, password, type})
        if(res) {
            getMsgList(dispatch, res._id)
            dispatch(authSuccess(res))
        }
        else dispatch(errMsg('请求失败'))
    }
}

/**
 * 登录
 * @param user 
 */
export const login = (user: UserI) => {

    const {username, password} = user

    if(!username || !username.trim()) return errMsg('用户名不能为空')
    if(!password || !password.trim()) return errMsg('密码不能为空')


    return async (dispatch: Dispatch) => {
        const res: any = await reqLogin(user)
        if(res) {
            getMsgList(dispatch, res._id)
            dispatch(authSuccess(res))
        }
        else dispatch(errMsg('请求失败'))
    }
}

/**
 * 更新用户信息
 * @param user 
 */
export const updateUser = function(user: UserI) {
    return async (dispatch: Dispatch) => {
        const res: any = await reqUpdateUser(user)
        if(res) dispatch(receiveUser(res))
        else dispatch(resetUser('请求失败'))
    }
}

/**
 * cookie 登录获取用户信息
 */
export const getUser = function() {
    return async (dispatch: Dispatch) => {
        const user: any = await reqUser()
        if (user) {
            getMsgList(dispatch, user._id)
            dispatch(receiveUser(user))
        } 
        else dispatch(resetUser('请求失败'))
    }
}

/**
 * 获取用户列表
 * @param type 
 */
export const getUserList = (type: string) => {
    return async (dispatch: Dispatch) => {
        const res: any = await reqUserList({type})
        if(res) dispatch(receiveUserList(res))
        else dispatch(resetUser('请求失败'))
    }
}


let socket: any // 存放用户登录后的socket
export const sendMsg = (chatMsg: any) => {
    return async ( dispatch: Dispatch) => {
        // 初始化 socket
        await initIO(dispatch, chatMsg.from)
        socket.emit('sendMsg', chatMsg)
    }
}

/**
 * 初始化 socketIO
 * @param dispatch 
 * @param userid 
 */
function initIO (dispatch: Dispatch, userid: string) {
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

/**
 * 获取聊天信息
 * @param dispatch 
 * @param userid 
 */
async function getMsgList(dispatch: Dispatch, userid: string) {
    // 初始化 socket
    initIO(dispatch, userid) 
    const res: any = await reqChatMsgList()
    if(res) {
        dispatch(receiveMsgList({users: res.users, chatMsgs: res.chatMsgs, userid}))
    }
}

/**
 * 设置消息已读
 * @param from 
 * @param to 
 */
export const msgRead = (from: string, to: string) => {
    return async (dispatch: Dispatch) => {
        const res = await reqReadMsg({from})
        dispatch(readMsg({count: res, from , to}))
    }   
}