import React from "react";
import clsx from 'clsx';
import {Divider, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton} from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon  from '@material-ui/icons/MoveToInbox';
import leftRoutes from "../../../constant/routes/left";
import {NavLink} from "react-router-dom";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },

    }),
);
interface leftMenu {
    path: string,
    name: string,

}
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Left = (props:{isOpen :boolean, leftRoutes:Array<leftMenu>, handleMenuClick:Function }) => {
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
        props.handleMenuClick()

    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list,)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                                leftRoutes.map((route:leftMenu, idx)=> (
                                    <NavLink className='list-header expanded' activeClassName="active" key={`group-header${idx}`}
                                             to={route.path} style={{textDecoration:'none'}}
                                             /*onClick={() => props.handleMenuClick()}*/
                                    >
                                        <ListItem button key={route.name}>
                                            <ListItemIcon>{idx % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                            <ListItemText primary={route.name}  />
                                        </ListItem>
                                    </NavLink>
                                    )
                                )
                            }
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );



    return(
        <div>
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)}>left</Button>
                <SwipeableDrawer
                    anchor={'left'}
                    open={props.isOpen}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
        // <Drawer
        //     className={classes.drawer}
        //     variant="persistent"
        //     anchor="left"
        //     open={props.isOpen}
        //     classes={{
        //         paper: classes.drawerPaper,
        //     }}
        // >
        //     {/*<div className={classes.drawerHeader}>*/}
        //     {/*    <IconButton onClick={handleDrawerClose}>*/}
        //     {/*        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
        //     {/*    </IconButton>*/}
        //     {/*</div>*/}
        //     <Divider />
        //     <List>
        //         {
        //             leftRoutes.map((route:leftMenu, idx)=> (
        //                 <NavLink className='list-header expanded' activeClassName="active" key={`group-header${idx}`}
        //                          to={route.path} style={{textDecoration:'none'}}
        //                          /*onClick={() => props.handleMenuClick()}*/
        //                 >
        //                     <ListItem button key={route.name}>
        //                         <ListItemIcon>{idx % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                         <ListItemText primary={route.name}  />
        //                     </ListItem>
        //                 </NavLink>
        //                 )
        //             )
        //         }
        //
        //     </List>
        //
        //     <Divider />
        //     <List>
        //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
        //             <ListItem button key={text}>
        //                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        //                 <ListItemText primary={text} />
        //             </ListItem>
        //         ))}
        //     </List>
        // </Drawer>
)}

export default Left
