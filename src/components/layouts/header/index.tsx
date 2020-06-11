import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from "./header";
import {bindActionCreators} from "redux";
import * as menuActions from "../../../store/modules/menu";

export class HeaderContainer extends Component<any, any> {

    render(): React.ReactNode {
        const {isOpen, menuActions} : any = this.props

        console.log(this.props)
        return (
            <Header isOpen={isOpen} handleMenuClick = {menuActions.handleMenuClick} />
            // <Header/>

        )
    }

}


export default connect(
    ({menu} : any) => ({
        isOpen : menu.isMenuOpen
    }),
    dispatch => ({
        menuActions : bindActionCreators(menuActions, dispatch)
    })
)(HeaderContainer)
