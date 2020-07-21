import React from "react";
import MainMap from "../../components/map/map";
import InputAdornments from "../../components/etc/etc";
import Postcode from "../../components/etc/post";
import Dashboard from "../../components/dashboard";
import DemoTabs from "../../components/etc/samplePage";

const leftRoutes = [
    {
        path : '/dashboard',
        name : 'Dashboard',
        component : () => <Dashboard />
    },
    {
        path : '/index',
        name : 'Map',
        component : (location:any) => <MainMap location={location}/>
    },
    {
        path : '/index2',
        name : 'Map1',
        component : () => <InputAdornments />
    },
    {
        path : '/index3',
        name : '현장 조사',
        component : () => <Postcode />
    },
    {
        path : '/general',
        name : '일반 임대',
        component : () => <MainMap />
    },
    {
        path: '/general/1',
        name: '건물관리 정도',
        component : () => <InputAdornments />
    },
    {
        path: '/general/2',
        name: '생활 편의성 정보',
        component : () => <InputAdornments />
    },
    {
        path: '/general/3',
        name: '기타 점검 및 확인 사항',
        component : () => <InputAdornments />
    },
    {
        path: '/general/4',
        name: '현장조사 요약',
        component : () => <InputAdornments />
    },
    {
        path: '/sample',
        name: '샘플',
        component : () => <DemoTabs />
    },


]





export default leftRoutes

