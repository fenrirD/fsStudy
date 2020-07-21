import React, {Component, Fragment} from "react"
import DashboardDefaultSection1 from './DashboardDefault/DashboardDefaultSection1';
class Dashboard extends Component<any, any>{

    render(): React.ReactNode {
        return(

            <Fragment>
                <DashboardDefaultSection1 />
            </Fragment>
        )

    }


}

export default Dashboard


