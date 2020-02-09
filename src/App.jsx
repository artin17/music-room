import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from './Profile';
import Gallery from './gallery';
import queryString from 'query-string';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            name: null,
            tracks: [],
        }
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(response => response.json())
            .then(data => this.setState({
                user: {
                    name: data.display_name
                }
            }))


    }


    search() {

        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;


        // const API_KEY = '73d6f49a55237ace767a46e51cc2ba06';
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1&access_token=${accessToken}`;
        ;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';



        fetch(FETCH_URL, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({ artist });

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&access_token=${accessToken}`

                fetch(FETCH_URL, {
                    method: 'GET'
                }).then(response => response.json())
                    .then(json => {
                        let { tracks } = json;
                        this.setState({ tracks })
                    })
            }

            )




    }



    render() {
        return (

            <div className="App" >
                {this.state.user ?
                    <div>
                        <div className="App-title">{this.state.user.name}'s Music Room</div>
                        <FormGroup>
                            <InputGroup className="input-field">
                                <FormControl
                                    type="text"
                                    placeholder="Search for your artist"
                                    query={this.state.query}
                                    className="input-textarea"
                                    onChange={event => this.setState({ query: event.target.value })}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.search();
                                        }
                                    }}
                                />
                                <InputGroup.Append onClick={() => this.search()}>
                                    <button><FontAwesomeIcon icon="search" /></button>
                                </InputGroup.Append>
                            </InputGroup>
                        </FormGroup>

                        {
                            this.state.artist ?
                                <div>
                                    <Profile artist={this.state.artist} />
                                    <Gallery tracks={this.state.tracks} />
                                </div>
                                : <div></div>
                        }
                    </div> : <div>
                        <h1>Welcome to your Music Room.</h1>
                        <p>To proceed you will have to login with your Spotify account.</p>
                        <button onClick={() => {
                            window.location = window.location.href.includes('localhost')
                                ? 'http://localhost:8888/login'
                                : 'https://musicroom-backend.herokuapp.com/login'
                        }
                        }
                            style={{ padding: '10px', 'fontSize': '32px', 'marginTop': '20px' }}>Sign in with Spotify</button></div>
                }
            </div>

        )
    }
}

export default App;