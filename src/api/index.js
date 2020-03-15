import axsio from './axios'
import Axios from 'axios'


export function reqRegister(params) {
    return axsio({
        url: '/register',
        method: 'post',
        data: params
    })
}

export function reqLogin(params) {
    return axsio({
        url: '/login',
        method: 'post',
        data: params
    })
}

export function reqUpdateUser(params) {
    return axsio({
        url: '/update',
        method: 'post',
        data: params
    })
}

export function reqUser(params) {
    return axsio({
        url: '/user',
        method: 'get',
        data: params
    })
}

export function reqUserList(params) {
    return axsio({
        url: '/userlist',
        method: 'get',
        params,
    })
}

export function reqChatMsgList(params) {
    return axsio({
        url: '/msglist',
        method: 'get',
        params,
    })
}

export function reqReadMsg(data) {
    return axsio({
        url: '/readmsg',
        method: 'post',
        data,
    })
}

