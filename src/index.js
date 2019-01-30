import 'babel-polyfill';

import {h, render} from 'preact';
import {IntlProvider} from 'preact-i18n';
import definition from './i18n/zh.json';
import App from './component/app';

const mountNode = document.getElementById('app');
render(
<IntlProvider definition={definition}>
    <App/>
    </IntlProvider>
    , mountNode, mountNode.lastChild);