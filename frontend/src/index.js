import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />,document.getElementById('root'));

serviceWorker.unregister();
