import React from "react";
import {Divider, List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton} from "@material-ui/core";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon  from '@material-ui/icons/MoveToInbox';
import leftRoutes from "../../../constant/routes/left";
import {NavLink} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
    }),
);
interface leftMenu {
    path: string,
    name: string,
}

const Left = (props:{isOpen :boolean, leftRoutes:Array<leftMenu> }) => {
    const classes = useStyles();
    const theme = useTheme();
    const {leftRoutes} = props
    leftRoutes.map((route:leftMenu)=> console.log(route))
    return(
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.isOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            {/*<div className={classes.drawerHeader}>*/}
            {/*    <IconButton onClick={handleDrawerClose}>*/}
            {/*        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
            <Divider />
            <List>
                {
                    leftRoutes.map((route:leftMenu, idx)=> (
                        <NavLink className='list-header expanded' activeClassName="active" key={`group-header${idx}`} to={route.path} style={{textDecoration:'none'}} >
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
        </Drawer>
)}

export default Left
