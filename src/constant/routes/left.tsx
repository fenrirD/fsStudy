import React from "react";
import MainMap from "../../components/map/map";
import InputAdornments from "../../components/etc/etc";
import Postcode from "../../components/etc/post";
import Board from "../../components/etc/board";
const leftRoutes = [
    {
        path : '/index',
        name : 'Map',
        component : () => <MainMap /> 
    },
    {
        path : '/index2',
        name : 'Map1',
        component : () => <InputAdornments />
    },
    {
        path : '/index3',
        name : 'Map2',
        component : () => <Board />
    },
    {
        path : '/index4',
        name : 'Map3',
        component : () => <MainMap />
    }

]



export default leftRoutes
