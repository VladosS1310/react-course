import React, {FunctionComponent} from "react";
import {Route, Redirect, RouteProps, RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {AppState, isAuthenticated} from "../../store";


interface ProtectedRouteProps extends RouteProps {
    isAuthenticated?: boolean;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ render,isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                (routeCompProps:RouteComponentProps) =>
                    isAuthenticated ? (
                        render!(routeCompProps)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: routeCompProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        isAuthenticated: isAuthenticated(state)
    }
}

const connectedRoute = connect(mapStateToProps)(ProtectedRoute)

export {connectedRoute as ProtectedRoute }