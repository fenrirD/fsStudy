import React, {Component, Fragment} from "react";

import clsx from 'clsx';
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
* layout index
*
 * */

class LayoutContainer extends Component<any, any> {


    render(): React.ReactNode {
        const {contentBackground, sidebarFixed, children} = this.props
        console.log(this.props)

        return(
            <Fragment>
                <div className={clsx('app-wrapper', contentBackground)}>
                    <Header />
                    <div
                        className={clsx('app-main', {
                            'app-main-sidebar-static': !sidebarFixed
                        })}>
                        <Sidebar/>
                        <div
                            className={clsx('app-content', {
                                // 'app-content-sidebar-collapsed': sidebarToggle,
                                'app-content-sidebar-fixed': sidebarFixed,
                                // 'app-content-footer-fixed': footerFixed
                            })}>
                            <div className="app-content--inner">
                                <div className="app-content--inner__wrapper">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default LayoutContainer
