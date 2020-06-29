import React, {Component} from 'react'
import HeaderContainer from './layouts/header/index'
import MainMap from "./map/map";
import {withStyles, makeStyles, createStyles, Theme,} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import leftRoutes from '../constant/routes/left'
import {Redirect, Route, Switch} from "react-router";
import {bindActionCreators} from "redux";
import * as menuActions from "../store/modules/menu";
import webViewBridge from './webView/webViewBridge'

const styles = (theme : Theme) => createStyles({
        content: {
            flexGrow: 1,
            // padding: theme.spacing(3),
            paddingTop: 28,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            // marginLeft: -240,
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
        this.state ={
            location:[]
        }
        webViewBridge.init()

    }

    componentDidMount(): void {

        // @ts-ignore
        window.counter = 0;
        // user location get!
        this.getAppUserLocation()
    }

    getAppUserLocation = () => {
        // @ts-ignore
        setTimeout(()=> window.webViewBridge.send('getUserLocation', window.counter, (res)=> this.setUserLocation(res), (error)=> alert(error))
        ,5000)

    }


    clickHandler = () => {

        // @ts-ignore
        window.counter++;
        // window.postMessage('handleDataReceived','*')
        // @ts-ignore

        window.webViewBridge.send('handleDataReceived', window.counter, (res)=> {
            alert(res)
            this.setUserLocation(res)
            // @ts-ignore
            // window.document.getElementById("button").setAttribute("style", "background-color: " + res);
        }, function(err:any) {
            // @ts-ignore
            // window.document.getElementById("container").setAttribute("style", "background-color: " + err);
        });
        alert('tt')

    }

    setUserLocation = (res:any) => {
        const {menuActions} = this.props
        alert(res)
        alert('call set uset location!!!')
        menuActions.setUserLocation(res)
    }

    renderLeftRoutes = (isOpen:Boolean) => {
        return (
            <Switch>
                {
                    leftRoutes.map(route => (
                        <Route path={route.path} key={route.name} component={route.component} />
                    ))
                }
                <Redirect to='/index2'/>
            </Switch>
        )
    }

    render(): React.ReactNode {
        const classes = this.props.classes
        return (
            <div style={{height:'100%'}}>

                {/*TODO Header Component 이벤트 혹은 필요한 상태 전달.*/}
                <HeaderContainer leftRoutes={leftRoutes}/>
                <main className={classes.content}>
                    <button onClick={this.clickHandler}>ddddddddddd</button>
                    {
                        this.renderLeftRoutes(this.props.isOpen)
                        // <MainMap></MainMap>
                    }

                </main>
            </div>
        )

    }
}

export default withStyles(styles)(connect(
    ({menu} : any,) => ({
        isOpen : menu.isMenuOpen
    }),dispatch => ({
        menuActions : bindActionCreators(menuActions, dispatch)
    }))(Main)
)


