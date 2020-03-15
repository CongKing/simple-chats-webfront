import React, {Component} from 'react'
import {
    List, Grid
} from 'antd-mobile'

import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {

    static propTypes = {
        setAvatar: PropTypes.func.isRequired,
    }

    state = {
        icon: ''
    }

    constructor(props) {
        super(props)
        this.avatarList = []
        for(let i=0; i < 20; i++){
            this.avatarList.push({
                text: `${i+1}`,
                icon: require(`../../assets/images/${i+1}.png`)
            })
        }
    }

    handleClick = ({text, icon}) => {
        this.setState({icon})
        this.props.setAvatar(text)
    }

    render() {
        const {icon} = this.state
        const listHeader = !icon ? '请选择头像' : (
            <div>
                选择头像 <img style={{width: '30px'}} src={icon} />
            </div>
        )
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.avatarList} 
                      columnNum={5} onClick={this.handleClick}></Grid>
            </List>
        )
    }
}