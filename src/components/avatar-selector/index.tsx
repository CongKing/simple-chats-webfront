import React from 'react'
import {
    List, Grid
} from 'antd-mobile'

interface Props {
    setAvatar: Function
}

interface State {
    icon: string
}

interface avatar {
    text: string,
    icon: string,
}

interface handleClickFun {
    (avatar: any): void;
}

export default class AvatarSelector extends  React.Component<Props, State> {

    readonly state: State = {
        icon: ''
    }
    avatarList: Array<avatar>

    constructor(props: Props) {
        super(props)
        this.avatarList = []
        for(let i=0; i < 20; i++){
            this.avatarList.push({
                text: `${i+1}`,
                icon: require(`../../assets/images/${i+1}.png`)
            })
        }
    }

    handleClick: handleClickFun = ({text, icon}: avatar) => {
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