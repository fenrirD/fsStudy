import React, {Component} from 'react'
import HeaderContainer from './layouts/header/index'
import MainMap from "./map/map";
import {withStyles, makeStyles, createStyles, Theme,} from '@material-ui/core/styles'
import clsx from 'clsx';
import {connect} from 'react-redux'
import leftRoutes from '../constant/routes/left'
import {Redirect, Route, Switch} from "react-router";

const styles = (theme : Theme) => createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            //padding: theme.spacing(3),
            paddingTop: 64,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -240,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },

})


class Main extends Component<any, any> {

    constructor(props? : any) {
        super(props);
        console.log(this.props)
        console.log(props)

    }

    componentDidMount(): void {


    }

    renderLeftRoutes = () => {
        return (
            <Switch>
                {
                    leftRoutes.map(route => (
                        <Route path={route.path} key={route.name} component={route.component} />
                    ))
                }
                <Redirect to='/index'/>
            </Switch>
        )
    }

    render(): React.ReactNode {
        const classes = this.props.classes
        console.log(classes)
        return (
            <div className={classes.root}>
                {/*TODO Header Component 이벤트 혹은 필요한 상태 전달.*/}
                <HeaderContainer leftRoutes={leftRoutes}/>
                <main className={clsx(classes.content, {
                    [classes.contentShift] : this.props.isOpen
                })}>
                    {
                        this.renderLeftRoutes()
                    }
                </main>
            </div>
        )

    }
}

export default withStyles(styles)(connect(
    ({menu} : any) => ({
        isOpen : menu.isMenuOpen
    }),{})(Main)
)


