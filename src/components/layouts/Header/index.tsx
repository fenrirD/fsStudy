import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Hidden,
    IconButton,
    AppBar,
    Box,
    Button,
    Tooltip
} from '@material-ui/core';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import projectLogo from '../../../assets/images/react.svg';
import {bindActionCreators} from "redux";
import * as menuActions from "../../../store/modules/menu";

const Header = (props:any) => {

    const {
        headerShadow,
        headerFixed,
        sidebarToggleMobile,
        setSidebarToggleMobile
    } = props;

    return (
        <Fragment>
            <AppBar
                color="primary"
                className={clsx('app-header', {})}
                position={'fixed'}
                elevation={headerShadow ? 11 : 3}>
                {/*{!props.isCollapsedLayout && <HeaderLogo />}*/}
                {/*// TODO mobile 화면*/}
                <Box className="app-header-toolbar">
                    <Hidden lgUp>
                        <Box
                            className="app-logo-wrapper"
                            title="Carolina React Admin Dashboard with Material-UI Free">
                            <Link to="/DashboardDefault" className="app-logo-link">
                                <IconButton
                                    color="primary"
                                    size="medium"
                                    className="app-logo-btn">
                                    <img
                                        className="app-logo-img"
                                        alt="Carolina React Admin Dashboard with Material-UI Free"
                                        src={projectLogo}
                                    />
                                </IconButton>
                            </Link>
                            <Hidden smDown>
                                <Box className="app-logo-text">매입임대 신청주택</Box>
                            </Hidden>
                        </Box>
                    </Hidden>
                    {/*// TODO 웹 화면*/}
                    <Hidden mdDown>
                        <Box
                            className="app-logo-wrapper"
                            title="Carolina React Admin Dashboard with Material-UI Free">
                            <Link to="/DashboardDefault" style={{
                                marginRight: '1rem'
                            }}>
                                <IconButton
                                    color="primary"
                                    size="medium"
                                    className="app-logo-btn">
                                    <img
                                        className="app-logo-img"
                                        alt="Carolina React Admin Dashboard with Material-UI Free"
                                        src={projectLogo}
                                    />
                                </IconButton>
                            </Link>
                            <Hidden smDown>
                                <Box className="app-logo-text">매입임대 신청주택</Box>
                            </Hidden>
                        </Box>
                    </Hidden>
                    <Box className="d-flex align-items-center">
                        {/*<HeaderUserbox />*/}
                        <Box >
                            <Tooltip title="Toggle Sidebar" placement="right">
                                <IconButton
                                    color="inherit"
                                    onClick={()=>props.menuActions.handleMenuClick()}
                                    size="medium">
                                    {props.isMenuOpen ? (
                                        <MenuOpenRoundedIcon />
                                    ) : (
                                        <MenuRoundedIcon />
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </AppBar>

        </Fragment>
    )
}

export default  connect((state:any)=>({
    // headerShadow: state.ThemeOptions.headerShadow,
    // headerFixed: state.ThemeOptions.headerFixed,
    isMenuOpen: state.menu.isMenuOpen
}), (dispatch) =>({
    menuActions : bindActionCreators(menuActions, dispatch)
}))(Header)
