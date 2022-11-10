import React from "react";
import {RouteChildrenProps} from "react-router";
import {AppState} from "../../store";
import {connect} from "react-redux";
import {fetchProfile, getProfile} from "../../store/profile";
import './Profile.css';


interface ProfileProps extends RouteChildrenProps {
    profile: any;
    onFetchProfile: () => void;
}

class Profile extends React.Component<ProfileProps> {
    componentDidMount() {
        this.props.onFetchProfile!();
    }


    render() {
        console.log(this.props.profile);
        const {avatarUrl, fullName, email, username, url} = this.props.profile;

        return (
            <div className="profile-container">
                <h1>Profile</h1>
                <div className="profile-card">
                    <img src={`${avatarUrl}/50.png`} alt="Avatar"/>
                    <h2>{fullName}</h2>
                    <p>{email}</p>
                    <p>{username}</p>
                    <a href={url}>My Trello link</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        profile: getProfile(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchProfile: () => dispatch(fetchProfile()),
    }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export {ConnectedProfile as Profile};