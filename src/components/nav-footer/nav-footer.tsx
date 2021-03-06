import React from 'react'
import {TabBar} from 'antd-mobile'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {NavI} from '../../types'

const Item = TabBar.Item

interface Props extends RouteComponentProps {
    navList: Array<NavI>,
    unReadCount: number,
}

interface State {
}

class NavFooter extends React.Component<Props, State> {

    render() {
        const {navList, unReadCount} = this.props
        const path = this.props.location.pathname

        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.path}
                              badge={nav.path === '/message' ? unReadCount : 0}
                              title={nav.text}
                              icon={{uri: require(`./images/${nav.icon}.png`) }}
                              selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                              selected={path === nav.path}
                              onPress={() => this.props.history.replace(nav.path) }
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)