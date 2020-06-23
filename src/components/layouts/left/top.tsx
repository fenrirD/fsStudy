import React from "react";
import clsx from 'clsx';
import {Divider, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton,} from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon  from '@material-ui/icons/MoveToInbox';
import leftRoutes from "../../../constant/routes/left";
import {NavLink} from "react-router-dom";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Postcode from "../../etc/post";


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
        },
        fullList: {
            width: 'auto',

        },
        a : {
            marginTop: '64px'
        }
    }),
);
interface leftMenu {
    path: string,
    name: string,

}
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Top = (props:{isOpen :boolean, leftRoutes:Array<leftMenu>, handleMenuClick:Function }) => {
    const classes = useStyles();
    const theme = useTheme();
    const {leftRoutes} = props

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        // props.handleMenuClick()

    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list,)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Postcode/>
        </div>
    );



    return(
        <div >
            <React.Fragment key={'top'}>
                <SwipeableDrawer
                    anchor={'top'}
                    open={props.isOpen}
                    onClose={toggleDrawer('top', false)}
                    onOpen={toggleDrawer('top', true)}
                    elevation={14}
                    disableBackdropTransition={true}
                    variant={'persistent'}
                    classes={{
                        paper : classes.a
                    }}

                >
                    {list('top')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>

)}

export default Top
