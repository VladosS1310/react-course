import React from "react";
import { Login } from "../Login";
import { Dashboard } from "../Dashboard";
import { Redirect } from "react-router-dom";
import { NotFound } from "../NotFound";
import { RouteChildrenProps } from "react-router";
import { Profile } from "../Profile";


export enum ROUTES_URLS {
    HOME = "/",
    LOGIN = "/login",
    DASHBOARD = "/dashboard",
    OAUTH = "/oauth",
    NOT_FOUND = "/404",
    PROFILE = "/profile"
}

export interface AppRoute {
    path: ROUTES_URLS,
    render: (props: any) => void,
    title?: string,
    exact?: boolean,
    isHidden?: boolean,
    isProtected?: boolean,
}

export const routes: Array<AppRoute> = [
    {
        path: ROUTES_URLS.LOGIN,
        render: (props: any) => <Login {...props}/>,
        title: "Login"
    },
    {
        path: ROUTES_URLS.DASHBOARD,
        isProtected: true,
        render: (props: RouteChildrenProps) => <Dashboard {...props}/>,
        title: "Dashboard"
    },
    {
        path: ROUTES_URLS.PROFILE,
        isProtected: true,
        render: (props: RouteChildrenProps) => <Profile {...props} />,
        title: "Profile"
    },
    {
        path: ROUTES_URLS.HOME,
        isHidden: true,
        exact: true,
        render: () => <Redirect to={ROUTES_URLS.LOGIN}/>,
    },
    {
        path: ROUTES_URLS.NOT_FOUND,
        isHidden: true,
        render: (props: RouteChildrenProps) => <NotFound {...props}/>,
    }
]