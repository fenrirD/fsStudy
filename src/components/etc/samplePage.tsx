import React, {Fragment} from "react";

import {Tabs, Tab, MenuItem, Select, Card } from '@material-ui/core';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';

const styles = {
    tabs: {
        background: '#fff',
    },
    slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
    },
    slide1: {
        backgroundColor: '#FEA900',
    },
    slide2: {
        backgroundColor: '#B3DC4A',
    },
    slide3: {
        backgroundColor: '#6AC0FF',
    },
};

class DemoTabs extends React.Component {
    state = {
        index: 0,
    };

    handleChange = (event:any, value:any) => {
        this.setState({
            index: value,
        });
    };

    handleChangeIndex = (index:any) => {
        this.setState({
            index,
        });
    };

    render() {
        const { index } = this.state;

        return (
            <Card>

                <Tabs value={index} onChange={this.handleChange} style={styles.tabs} >
                    <Tab label="건물관리정도" />
                    <Tab label="생활편의성" />
                    <Tab label="기타점검" />
                </Tabs>

                <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents>
                    <div style={Object.assign({}, styles.slide, styles.slide1)}>건물 관리정보 </div>
                    <div style={Object.assign({}, styles.slide, styles.slide2)}>
                        생활편의성
                        <Select value={10} autoWidth={false}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                    </div>
                    <div style={Object.assign({}, styles.slide, styles.slide3)}>기타점검</div>
                </SwipeableViews>
            </Card>
        );
    }
}

export default DemoTabs;

// const SamplePage = () => {
//
// }
// export default SamplePage
