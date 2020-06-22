import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from "./header";
import {bindActionCreators} from "redux";
import * as menuActions from "../../../store/modules/menu";
import Left from "../left/left";
import Top from "../left/top";

export class HeaderContainer extends Component<any, any> {

    render(): React.ReactNode {
        const {isOpen, menuActions, isPostOpen} : any = this.props
        return (
            <div>
                <Header isOpen={isOpen} handleMenuClick = {menuActions.handleMenuClick} handlePostClick = {menuActions.handlePostClick} />
                <Left isOpen={isOpen} leftRoutes={this.props.leftRoutes} handleMenuClick={menuActions.handleMenuClick}></Left>
                <Top isOpen={isPostOpen} leftRoutes={this.props.leftRoutes} handleMenuClick={menuActions.handlePostClick}></Top>
            </div>
            // <Header/>

        )
    }

}


export default connect(
    ({menu} : any) => ({
        isOpen : menu.isMenuOpen,
        isPostOpen: menu.isPostOpen
    }),
    dispatch => ({
        menuActions : bindActionCreators(menuActions, dispatch)
    })
)(HeaderContainer)
