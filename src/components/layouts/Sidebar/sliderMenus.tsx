import React, {Fragment} from "react";
import leftRoutes from "../../../constant/routes/left2";
import { List, Typography } from '@material-ui/core';
import useRouter from '../../../utils/useRouter';
import { matchPath } from 'react-router-dom';
import SidebarMenuListItem from "./SidebarMenuListItem";

interface leftMenu {
    path: string,
    name: string,

}

const SidebarMenuList = (props:any) => {
    const { pages, ...rest } = props;
    console.log(pages, rest)
    return (
        <List className="p-0">
            {pages.reduce(
                (items:any, page:any) => reduceChildRoutes({ items, page, ...rest }),
                []
            )}
        </List>
    );
};

const reduceChildRoutes = (props:any) => {
    const { router, items, page, depth } = props;
    console.log('dd=>', props)
    if (page.children) {
        const open = matchPath(router.location.pathname, {
            path: page.to,
            exact: false
        });

        items.push(
            <SidebarMenuListItem
                depth={depth}
                icon={page.icon}
                key={page.label}
                label={page.badge}
                open={Boolean(open)}
                title={page.label}>
                <div className="sidebar-menu-children py-2">
                    <SidebarMenuList
                        depth={depth + 1}
                        pages={page.children}
                        router={router}
                    />
                </div>
            </SidebarMenuListItem>
        );
    } else {
        items.push(
            <SidebarMenuListItem
                depth={depth}
                href={page.to}
                icon={page.icon}
                key={page.label}
                label={page.badge}
                title={page.label}
            />
        );
    }

    return items;
};


const SliderMenus = (props:any) => {
    const router = useRouter()

    return (
        <Fragment>
                    <div>
                        <SidebarMenuList depth={0} pages={leftRoutes} router={router} />
                        {/*<Typography className="app-sidebar-heading">{route.name}</Typography>*/}
                    </div>
        </Fragment>
    )
}

export default SliderMenus
