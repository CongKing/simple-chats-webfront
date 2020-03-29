import React from 'react'

export interface UserI {
  username: string,
  password: string,
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

