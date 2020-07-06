import React from "react";
import MainMap from "../../components/map/map";
import InputAdornments from "../../components/etc/etc";
import Postcode from "../../components/etc/post";
import Dashboard from "../../components/dashboard";

const hierarchyRoutes = [
    {
        to : '/dashboard',
        label : 'Dashboard',
        component : () => <Dashboard />
    },
    {
        to : '/index',
        label : 'Map',
        component : (location:any) => <MainMap location={location}/>
    },
    {
        to : '/index2',
        label : 'Map1',
        component : () => <InputAdornments />
    },
    {
        to : '/index3',
        label : '현장 조사',
        component : () => <Postcode />
    },
    {
        to : '/general',
        label : '일반 임대',
        children: [
            {
                to: '/general/1',
                label: '건물관리 정도',
            },
            {
                to: '/general/2',
                label: '생활 편의성 정보',
            },
            {
                to: '/general/3',
                label: '기타 점검 및 확인 사항',
            },
            {
                to: '/general/4',
                label: '현장 조사 요약',
            },
        ]
    }

]





export default hierarchyRoutes

