import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from './Profile';
import { tsMethodSignature } from '@babel/types';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
        }
    }


    search() {
        console.log('This state is', this.state)
        const API_KEY = '73d6f49a55237ace767a46e51cc2ba06';
        const BASE_URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo';
        const FETCH_URL = `${BASE_URL}&artist=${this.state.query}&&api_key=${API_KEY}&format=json`;
        console.log(FETCH_URL);

        fetch(FETCH_URL, {
            method: 'GET'
        }
        ).then(response => response.json()).then(json => {
            const profile = json.results.artistmatches.artist[0];
            const artist = json.results.artistmatches.artist[0];
            console.log('artist', artist, 'profile', profile);
            this.setState({ artist: artist });
        });


    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Room</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for your artist"
                            query={this.state.query}
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
                <Profile artist={this.state.artist} />
                <div className="Gallery">
                    Gallery
                </div>
            </div>

        )
    }
}

export default App;