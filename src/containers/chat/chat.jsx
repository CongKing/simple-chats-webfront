
import React, {Component} from 'react'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import {sendMsg, msgRead} from '../../redux/actions'


class Chat extends Component {
    state ={
        content: '',
        showEmoji: false,
    }

    componentWillMount() {
        const emojis =[
                '🙈',
                '🙉',
                '🙊',
                '💥',
                '💫',
                '💦',
                '💨',
                '🐵',
                '🐒',
                '🦍',
                '🐶',
                '🐕',
                '🐩',
                '🐺',
                '🦊',
                '🦝 ',
                '🐱',
                '🐈',
                '🦁',
                '🐯',
                '🐅',
                '🐆',
                '🐴',
                '🐎',
                '🦄',
                '🦓',
                '🦌',
                '🐮',
                '🐂',
                '🐃',
                '🐄',
                '🐷',
                '🐖',
                '🐗',
                '🐽',
                '🐏',
                '🐑',
                '🐐',
                '🐪',
                '🐫',
                '🦙 ',
                '🦒',
                '🐘',
                '🦏',
                '🦛 ',
                '🐭',
                '🐁',
                '🐀',
                '🐹',
                '🐰',
                '🐇',
                '🐿',
                '🦔',
                '🦇',
                '🐻',
                '🐨',
                '🐼',
                '🦘 ',
                '🦡 ',
                '🐾',
                '🦃',
                '🐔',
                '🐓',
                '🐣',
                '🐤',
                '🐥',
                '🐦',
                '🐧',
                '🕊',
                '🦅',
                '🦆',
                '🦢 ',
                '🦉',
                '🦚 ']
        this.emojis = emojis.map((emoji) => ({text: emoji}))
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.msgRead(from, to)
    }

    toggleShow = () => {
        const showEmoji = !this.state.showEmoji
        this.setState({showEmoji})
        if(showEmoji) {
            setTimeout(() => window.dispatchEvent(new Event('resize')))
        }
    }

    handleClick = () => {
        
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送请求
        if(content) {
            this.props.sendMsg({to, from, content})
        }

        this.setState({content: '', showEmoji: false})
    }

    render() {

        const user = this.props.user
        const {users, chatMsgs} = this.props.chat

        const meId = user._id
        if(!users[meId]) {
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')

        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        const targetAvatar = users[targetId].avatar
        const targetIcon = targetAvatar ? require(`../../assets/images/${targetAvatar}.png`) : null

        return (
            <div id='chat-page'>
                <NavBar onLeftClick={() => this.props.history.goBack()} icon={<Icon type="left"></Icon>} className="nav-header">
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop: 50, marginBottom: 50}}>
                {
                        msgs.map(msg => {
                            if(targetId === msg.from) {
                                return (
                                    <List.Item 
                                        key={msg._id} 
                                        thumb={targetIcon}
                                        > 
                                        {msg.content}
                                    </List.Item>
                                )
                            } else {
                                return (
                                    <List.Item 
                                        key={msg._id} 
                                        className='chat-me'
                                        extra='我'
                                        > 
                                        {msg.content}
                                    </List.Item>
                                )
                            }
                        })
                    }        
                </List>

                <div className="input-bar">
                    <InputItem
                        placeholder="请输入"
                        extra={
                            <span>
                                <span onClick={this.toggleShow}>🐱 </span>
                                <span onClick={this.handleClick}>发送</span>
                            </span>
                        }
                        value={this.state.content}
                        onChange={val => this.setState({content: val})}
                    >
                        
                    </InputItem>
                    {
                        this.state.showEmoji ? (
                            <Grid 
                                data={this.emojis} 
                                columnNum={8} 
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({content: this.state.content + item.text})
                                }}
                                >

                            </Grid>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, msgRead}
)(Chat)