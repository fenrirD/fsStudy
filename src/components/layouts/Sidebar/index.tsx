import React, { Fragment } from 'react';
import {Hidden, Drawer, Paper, Box, IconButton, Tooltip} from '@material-ui/core';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as menuActions from "../../../store/modules/menu";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import projectLogo from '../../../assets/images/react.svg';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SliderMenus from "./sliderMenus";

const Sidebar = (props:any) => {
    const {
        setSidebarToggleMobile,
        isMenuOpen,
        menuActions,
        sidebarFixed,
        sidebarShadow
    } = props;

    const renderSidebarHeader = () => {
        return (
            <Fragment>
                <div className={clsx('app-sidebar-header', {})} style={{
                    backgroundColor:'#09142a'
                }}>
                    <Box
                        className="header-logo-wrapper"
                        title="Carolina React Admin Dashboard with Material-UI Free">
                        <Link to="/DashboardDefault" className="header-logo-wrapper-link">
                            <IconButton
                                color="primary"
                                size="medium"
                                className="header-logo-wrapper-btn">
                                <img
                                    className="app-sidebar-logo"
                                    alt="Carolina React Admin Dashboard with Material-UI Free"
                                    src={projectLogo}
                                />
                            </IconButton>
                        </Link>
                        <Box className="header-logo-text" style={{
                            color:'#fafafa'
                        }}>매입임대 신청주택</Box>
                    </Box>
                    <Box className="app-sidebar-header-btn-mobile">
                        <Tooltip title="Toggle Sidebar" placement="right">
                            <IconButton
                                color="inherit"
                                onClick={handleMenuClick}
                                size="medium">
                                {isMenuOpen ? (
                                    <MenuOpenRoundedIcon />
                                ) : (
                                    <MenuRoundedIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </div>
            </Fragment>
        )
    }


    const handleMenuClick = () => menuActions.handleMenuClick();

    return(
        <Fragment>
            <Drawer
                anchor="left"
                open={isMenuOpen}
                onClose={handleMenuClick}
                variant="temporary"
                elevation={4}
                className="app-sidebar-wrapper-lg">
                {renderSidebarHeader()}
                <PerfectScrollbar>
                    <div>
                        <SliderMenus/>
                    </div>
                </PerfectScrollbar>
            </Drawer>
        </Fragment>
    )
}
export default  connect((state:any)=>({
    // headerShadow: state.ThemeOptions.headerShadow,
    // headerFixed: state.ThemeOptions.headerFixed,
    isMenuOpen: state.menu.isMenuOpen
}), (dispatch) =>({
    menuActions : bindActionCreators(menuActions, dispatch)
}))(Sidebar)
