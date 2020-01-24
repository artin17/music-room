import React, { Component } from 'react';



class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        console.log("props", this.props.artist)

        let artist = {
            name: ' ',
            followers: { total: '' },
            images: [{

            }]
        };

        artist = this.props.artist !== null ? this.props.artist : artist;

        console.log("artist is ", artist);

        return (
            <div>
                <div>{artist.name}</div>
                <div>{artist.listeners} Followers</div>
            </div>
        )
    }
}

export default Profile;