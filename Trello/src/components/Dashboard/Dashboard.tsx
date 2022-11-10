import * as React from 'react';
import {RouteChildrenProps} from "react-router";
import {connect} from "react-redux";
import {decreaseCount, increaseCount, AppState} from "../../store";
import {fetchBoards, getBoards, editBoardName} from "../../store/boards";
import {BoardPreview} from "../BoardPreview";
import {IBoard} from "../../types";
import './Dashboard.css';


interface DashboardProps extends RouteChildrenProps{
    token?: string;
    boards: Array<IBoard>;
    onIncrease: () => void;
    onDecrease: () => void;
    onFetchBoards: () => void;
    onEditBoard: (id: string, name: string) => void;
}

class Dashboard extends React.Component<DashboardProps> {
    goBack = () => {
        this.props.history.goBack();
    }

    increase = () => {
        this.props.onIncrease!();
    }

    decrease = () => {
        this.props.onDecrease!();
    }

    componentDidMount() {
        this.props.onFetchBoards!();
    }

    onSubmitEditing = (id: string, name: string) => {
        console.log(id, name)
        this.props.onEditBoard(id, name);
    }

    render () {
        const {boards} = this.props;

        return (
            <div className="dashboard-container">
                {
                    boards?.map(({name, id}) => {
                        return (
                            <BoardPreview
                                key={id}
                                name={name}
                                id={id}
                                onSubmitEditing={this.onSubmitEditing}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        boards: getBoards(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onIncrease: () => dispatch(increaseCount()),
        onDecrease: () => dispatch(decreaseCount()),
        onFetchBoards: () => dispatch(fetchBoards()),
        onEditBoard: (id: string, name: string) => dispatch(editBoardName(id, name))
    }
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export {ConnectedDashboard as Dashboard};