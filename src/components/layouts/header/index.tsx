import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from "./header";
import {bindActionCreators} from "redux";
import * as menuActions from "../../../store/modules/menu";
import Left from "../left/left";

export class HeaderContainer extends Component<any, any> {

    render(): React.ReactNode {
        const {isOpen, menuActions} : any = this.props

        console.log(this.props)
        return (
            <div style={{display:'flex'}}>
                <Header isOpen={isOpen} handleMenuClick = {menuActions.handleMenuClick} />
                <Left isOpen={isOpen} leftRoutes={this.props.leftRoutes}></Left>
            </div>
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
