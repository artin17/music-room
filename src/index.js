import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch);


ReactDOM.render(
    <App />, document.getElementById('root')
)