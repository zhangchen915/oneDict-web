import {h, render} from 'preact';

import App from './component/app';

const mountNode = document.getElementById('app');
render(<App/>, mountNode, mountNode.lastChild);