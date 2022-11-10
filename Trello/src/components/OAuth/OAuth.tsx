import React, {FunctionComponent} from "react";
import {RouteChildrenProps, Redirect} from "react-router";
import {ROUTES_URLS} from "../App/Routes";
import {setToken} from "../../store";
import {connect} from "react-redux";

interface OAuthProps extends RouteChildrenProps {
    onSetToken?: (token: string) => void;
}

const OAuth: FunctionComponent<OAuthProps> = ({location: {hash}, onSetToken}: OAuthProps) => {
    const token = hash.split('=')[1];
    onSetToken && onSetToken(token);

    return <Redirect to={ROUTES_URLS.DASHBOARD} />
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSetToken: (token: string) => dispatch(setToken(token))
    }
}

const ConnectedOAuth = connect(undefined, mapDispatchToProps)(OAuth);

export {ConnectedOAuth as OAuth};