import React from 'react'

export interface UserI {
  username: string,
  password: string,
  password2?: string,
  type: string,
  _id?: string,
  avatar?: string,
  post?: string,
  info?: string,
  company?: string,
  salary?: string,
}

export interface MsgI {
  from: string,
  to: string,
  _id?: string,
  chat_id: string,
  content: string,
  read: boolean,
  create_time: number,
}

export interface NavI {
  path: string,
  component: React.Component,
  title: string,
  icon: string,
  text: string,
}


export interface UserStateI {
  username: string,
  type: string,
  msg: string,
  redirectTo: string,
}

export interface ChatStateI {
  users: {[key: string]: any},
  chatMsgs: Array<MsgI>,
  unReadCount: number,
}

