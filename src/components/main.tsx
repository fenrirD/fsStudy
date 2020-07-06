import React, {Component} from 'react'
import HeaderContainer from './layouts/Header/indexO'
import MainMap from "./map/map";
import {withStyles, makeStyles, createStyles, Theme,} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import leftRoutes from '../constant/routes/left'
import {Redirect, Route, Switch} from "react-router";
import {bindActionCreators} from "redux";
import * as menuActions from "../store/modules/menu";
import webViewBridge from './webView/webViewBridge'
import Container from '@material-ui/core/Container';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import MuiTheme from './theme';
import '../assets/base.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    fab,
    faFacebook,
    faTwitter,
    faVuejs,
    faReact,
    faHtml5,
    faGoogle,
    faInstagram,
    faPinterest,
    faYoutube,
    faDiscord,
    faSlack,
    faDribbble,
    faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
    far,
    faSquare,
    faLifeRing,
    faCheckCircle,
    faTimesCircle,
    faDotCircle,
    faThumbsUp,
    faComments,
    faFolderOpen,
    faTrashAlt,
    faFileImage,
    faFileArchive,
    faCommentDots,
    faFolder,
    faKeyboard,
    faCalendarAlt,
    faEnvelope,
    faAddressCard,
    faMap,
    faObjectGroup,
    faImages,
    faUser,
    faLightbulb,
    faGem,
    faClock,
    faUserCircle,
    faQuestionCircle,
    faBuilding,
    faBell,
    faFileExcel,
    faFileAudio,
    faFileVideo,
    faFileWord,
    faFilePdf,
    faFileCode,
    faFileAlt,
    faEye,
    faChartBar
} from '@fortawesome/free-regular-svg-icons';
import {
    fas,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faSmile,
    faHeart,
    faBatteryEmpty,
    faBatteryFull,
    faChevronRight,
    faSitemap,
    faPrint,
    faMapMarkedAlt,
    faTachometerAlt,
    faAlignCenter,
    faExternalLinkAlt,
    faShareSquare,
    faInfoCircle,
    faSync,
    faQuoteRight,
    faStarHalfAlt,
    faShapes,
    faCarBattery,
    faTable,
    faCubes,
    faPager,
    faCameraRetro,
    faBomb,
    faNetworkWired,
    faBusAlt,
    faBirthdayCake,
    faEyeDropper,
    faUnlockAlt,
    faDownload,
    faAward,
    faPlayCircle,
    faReply,
    faUpload,
    faBars,
    faEllipsisV,
    faSave,
    faSlidersH,
    faCaretRight,
    faChevronUp,
    faPlus,
    faLemon,
    faChevronLeft,
    faTimes,
    faChevronDown,
    faFilm,
    faSearch,
    faEllipsisH,
    faCog,
    faArrowsAltH,
    faPlusCircle,
    faAngleRight,
    faAngleUp,
    faAngleLeft,
    faAngleDown,
    faArrowUp,
    faArrowDown,
    faArrowRight,
    faArrowLeft,
    faStar,
    faSignOutAlt,
    faLink
} from '@fortawesome/free-solid-svg-icons';
import LayoutContainer from "./layouts";
library.add(
    far,
    faSquare,
    faLifeRing,
    faCheckCircle,
    faTimesCircle,
    faDotCircle,
    faThumbsUp,
    faComments,
    faFolderOpen,
    faTrashAlt,
    faFileImage,
    faFileArchive,
    faCommentDots,
    faFolder,
    faKeyboard,
    faCalendarAlt,
    faEnvelope,
    faAddressCard,
    faMap,
    faObjectGroup,
    faImages,
    faUser,
    faLightbulb,
    faGem,
    faClock,
    faUserCircle,
    faQuestionCircle,
    faBuilding,
    faBell,
    faFileExcel,
    faFileAudio,
    faFileVideo,
    faFileWord,
    faFilePdf,
    faFileCode,
    faFileAlt,
    faEye,
    faChartBar
);
library.add(
    fab,
    faFacebook,
    faTwitter,
    faVuejs,
    faReact,
    faHtml5,
    faGoogle,
    faInstagram,
    faPinterest,
    faYoutube,
    faDiscord,
    faSlack,
    faDribbble,
    faGithub
);
library.add(
    fas,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faSmile,
    faHeart,
    faBatteryEmpty,
    faBatteryFull,
    faChevronRight,
    faSitemap,
    faPrint,
    faMapMarkedAlt,
    faTachometerAlt,
    faAlignCenter,
    faExternalLinkAlt,
    faShareSquare,
    faInfoCircle,
    faSync,
    faQuoteRight,
    faStarHalfAlt,
    faShapes,
    faCarBattery,
    faTable,
    faCubes,
    faPager,
    faCameraRetro,
    faBomb,
    faNetworkWired,
    faBusAlt,
    faBirthdayCake,
    faEyeDropper,
    faUnlockAlt,
    faDownload,
    faAward,
    faPlayCircle,
    faReply,
    faUpload,
    faBars,
    faEllipsisV,
    faSave,
    faSlidersH,
    faCaretRight,
    faChevronUp,
    faPlus,
    faLemon,
    faChevronLeft,
    faTimes,
    faChevronDown,
    faFilm,
    faSearch,
    faEllipsisH,
    faCog,
    faArrowsAltH,
    faPlusCircle,
    faAngleRight,
    faAngleUp,
    faAngleLeft,
    faAngleDown,
    faArrowUp,
    faArrowDown,
    faArrowRight,
    faArrowLeft,
    faStar,
    faSignOutAlt,
    faLink
);

const styles = (theme : Theme) => createStyles({
        content: {
            flexGrow: 1,
            // padding: theme.spacing(3),
            paddingTop: 28,
            // transition: theme.transitions.create('margin', {
            //     easing: theme.transitions.easing.sharp,
            //     duration: theme.transitions.duration.leavingScreen,
            // }),

            // marginLeft: -240,
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
                <Redirect to='/dashboard'/>
            </Switch>
        )
    }

    render(): React.ReactNode {
        const classes = this.props.classes
        return (
            <ThemeProvider theme={MuiTheme}>
                <div style={{height:'100%'}}>
                    {/*TODO Header Component 이벤트 혹은 필요한 상태 전달.*/}
                    {/*<HeaderContainer leftRoutes={leftRoutes}/>*/}
                    <LayoutContainer>
                        {
                            this.renderLeftRoutes(this.props.isOpen)
                            // <MainMap></MainMap>
                        }
                    </LayoutContainer>
                    {/*<main className={classes.content}>*/}
                            {/*<button onClick={this.clickHandler}>ddddddddddd</button>*/}

                    {/*</main>*/}
                </div>
            </ThemeProvider>
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


