import React, {Component, Fragment} from "react"
import {Paper, Grid, Typography, Divider, Card, CardActions, CardContent,  } from "@material-ui/core"
import Button from '@material-ui/core/Button';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import DashboardDefaultSection1 from './DashboardDefault/DashboardDefaultSection1';
class Dashboard extends Component<any, any>{

    render(): React.ReactNode {
        return(
            // <div style={{
            //
            // }}>
            <Fragment>
                <DashboardDefaultSection1 />
                {/*<Grid container >*/}
                {/*    <Grid item xs={12} style={{padding: '8px'}} >*/}
                {/*        /!*<Paper style={{*!/*/}
                {/*        /!*    height: 200*!/*/}
                {/*        /!*}}>*!/*/}
                {/*            <Card>*/}
                {/*                <CardContent>*/}
                {/*                    <Typography variant='h4'>*/}
                {/*                        공지사항*/}
                {/*                    </Typography>*/}
                {/*                    <Divider />*/}
                {/*                    <Typography variant='h6'>*/}
                {/*                        공지사항 내용*/}
                {/*                    </Typography>*/}
                {/*                </CardContent>*/}
                {/*                <CardActions>*/}
                {/*                    <Button size="small">Learn More</Button>*/}
                {/*                </CardActions>*/}
                {/*            </Card>*/}
                {/*        /!*</Paper>*!/*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            통계 1*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            통계 2*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={3} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            일*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={3} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            목*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={3} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            요*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={3} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            연*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} style={{padding: '8px'}} >*/}
                {/*        <Paper style={{*/}
                {/*            height: 200*/}
                {/*        }}>*/}
                {/*            <Typography variant='h4'>*/}
                {/*                게시판 2*/}
                {/*            </Typography>*/}

                {/*        </Paper>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            {/*</div>*/}
            </Fragment>
        )

    }


}

export default Dashboard


