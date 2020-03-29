import axios from './axios'


export function reqRegister(params) {
    return axios({
        url: '/register',
        method: 'post',
        data: params
    })
}

export function reqLogin(params) {
    return axios({
        url: '/login',
        method: 'post',
        data: params
    })
}

export function reqUpdateUser(params) {
    return axios({
        url: '/update',
        method: 'post',
        data: params
    })
}

export function reqUser(params) {
    return axios({
        url: '/user',
        method: 'get',
        data: params
    })
}

export function reqUserList(params) {
    return axios({
        url: '/userlist',
        method: 'get',
        params,
    })
}

export function reqChatMsgList(params) {
    return axios({
        url: '/msglist',
        method: 'get',
        params,
    })
}

export function reqReadMsg(data) {
    return axios({
        url: '/readmsg',
        method: 'post',
        data,
    })
}

