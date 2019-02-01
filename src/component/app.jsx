import {h, Component} from 'preact';
import {withText, Text} from 'preact-i18n';
import Search from '../component/search/search'
import './app.scss'
import {parse_mdict} from "../mdict/mdict-parser";

import TTF, {speak} from './ttf/ttf'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fileHint: 'or drag and drop files here',
            word: '',
            definition: ''
        };
    }

    async getFile(e) {
        let filesCount = e.currentTarget.files.length;
        this.setState({
            fileHint: filesCount === 1 ? e.currentTarget.files[0].name : `${filesCount} files selected`,
            lookup: await parse_mdict(e.currentTarget.files[0])
        });
    }

    setDefinition(word, definition) {
        this.setState({
            word: word,
            definition: definition
        })
    }

    render() {
        return (<div className="wrap">
            <h2 className='title'>Mdict</h2>
            <div class="file-drop-area">
                <span class="fake-btn">Choose files</span>
                <span class="file-msg">{this.state.fileHint}</span>
                <input class="file-input" type="file" onChange={e => this.getFile(e)} multiple/>
            </div>

            <TTF className="voice"/>

            <Search className='search' lookup={this.state.lookup} setDefinition={(w, d) => this.setDefinition(w, d)}/>

            <div className='definition'>
                {
                    this.state.definition && <div className="voice-icon" onClick={() => {
                        speak(this.state.word)
                    }}/>
                }
                <div dangerouslySetInnerHTML={{__html: this.state.definition}}/>
            </div>

        </div>);
    }
}