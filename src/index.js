import {parse_mdict} from './mdict/mdict-parser';
import 'babel-polyfill';

document.querySelector('#btnLookup').addEventListener('click', async () => {
    let dic = document.querySelector('#dictfile').files[0];
    console.log(dic)
    const lookup = await parse_mdict(dic);
    console.log(await lookup('paddle'))
});