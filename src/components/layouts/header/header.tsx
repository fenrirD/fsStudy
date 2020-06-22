import React, {Component} from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import DaumPostcode from 'react-daum-postcode';
const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    }),
)

const Header = (props:{isOpen :boolean, handleMenuClick: any }) => {
    const classes = useStyles();
    const   renderPostCode = ()=>{
        const handleComplete = (data:any) => {
            let fullAddress = data.address;
            let extraAddress = '';

            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }

            console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        }

        return (
            <DaumPostcode
                onComplete={handleComplete}

            />
        );

    }
    return (
        <div>
            <AppBar
                position="fixed"
                // className={clsx(classes.appBar, {
                //     [classes.appBarShift]: props.isOpen,
                // })}
            >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={()=> props.handleMenuClick()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {/*{renderPostCode()}*/}
        </div>
    )

}

export default Header

