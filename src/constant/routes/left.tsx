import React from "react";
import MainMap from "../../components/map/map";

const leftRoutes = [
    {
        path : '/index',
        name : 'Map',
        component : () => <MainMap />
    },
    {
        path : '/index2',
        name : 'Map1',
        component : () => <MainMap />
    },
    {
        path : '/index3',
        name : 'Map2',
        component : () => <MainMap />
    },
    {
        path : '/index4',
        name : 'Map3',
        component : () => <MainMap />
    }

]



export default leftRoutes
