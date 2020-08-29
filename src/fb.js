import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {

    state = {
        auth: false,
        name: '',
        picture: '',
    };

    responseFacebook = response => {
        console.log(response);
        if (response.status !== 'unknown')
            this.setState({
                auth: true,
                name: response.name,
                picture: response.picture.data.url,
            });
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    render() {
        let facebookData;

        this.state.auth ?
            facebookData = (
                <div>
                    WOWWOWOWOWOW AMAZE YOU LOGGED IN GGGGGG
                </div>
            ) :
            facebookData = (<FacebookLogin
                appId="956629761469528" // Konnect
                autoLoad={true}
                fields="name,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        return (
            <>
                {facebookData}
            </>
        );
    }
}