import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />,document.getElementById('root'));

serviceWorker.unregister();
