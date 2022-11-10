import * as React from "react";
import {routes, AppRoute, ROUTES_URLS} from "./Routes";
import {Route, Switch, RouteComponentProps, RouteChildrenProps, withRouter} from "react-router-dom";
import {OAuth} from "../OAuth";
import {ProtectedRoute} from "../ProtectedRoute";
import {getFromLocalStorage, setToLocalStorage} from "../../utils";
import {Header} from "../Header";
import './App.css';
import {logDOM} from "@testing-library/react";


const TOKEN_STORAGE_KEY = 'TOKEN';

interface Board {
    id: string;
    name: string;
    pinned: boolean;
    desc?: string;
}

interface AppStore {
    token: string,
    boards: Array<Board>,
    userProfile: any
}

interface AppProps extends RouteComponentProps{}

const {REACT_APP_KEY} = process.env;

const INITIAL_STATE = {
    token: '',
    userProfile: undefined,
    boards: []
}

class App extends React.Component<AppProps, AppStore> {
    public state:AppStore = INITIAL_STATE;

    private renderContent = () => {
        return (
            <div className="app_content">
                <Switch>
                    {
                        routes.map(this.renderRoute)
                    }
                    <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OAuth {...props} />}/>
                </Switch>
            </div>
        )
    }

    private renderRoute = (route: AppRoute, i: number) => {
        if(route.isProtected) {
            return <ProtectedRoute
                key={i}
                exact={route.exact}
                path={route.path}
                render={route.render}
            />
        } else {
            return <Route
                key={i}
                exact={route.exact}
                path={route.path}
                render={(props) => route.render({...props})}
            />
        }
    }

    public render () {
       return (
           <div className="App">
               <Header onLogOut={() => console.log("asd")} />
               {this.renderContent()}
           </div>
       )
   };
}

const AppWithRouter = withRouter(App);

export {AppWithRouter as App}