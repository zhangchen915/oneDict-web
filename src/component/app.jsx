import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import Search from '../component/search/search'
import './app.scss'
import {Mdict} from 'mdict-ts'

import TTF from './ttf/ttf';
import Definition from './definition/definition'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fileHint: '',
            word: '',
            definition: ''
        };
    }

    async getFile(e) {
        let filesCount = e.currentTarget.files.length;
        this.setState({
            fileHint: filesCount === 1 ? e.currentTarget.files[0].name : `${filesCount} files selected`,
            lookup: new Mdict(e.currentTarget.files[0])
        });
    }

    async search(word, offset) {
        if (!word) {
            this.setState({word: '', definition: ''});
            return;
        }

        if (!offset) {
            const list = await this.state.lookup.getWordList(word.trim());
            if (word === list[0]) offset = list[0].offset
        }

        if (offset) this.setState({
            word: word,
            definition: await this.state.lookup.getDefinition(offset)
        });

        return offset;
    }

    render() {
        return (<div className="wrap">
            <h2 className='title'>Mdict</h2>
            <Localizer>
                <div class="file-drop-area">
                    <span class="fake-btn"><Text id="file.choose">选择文件</Text></span>
                    <span class="file-msg">{this.state.fileHint || <Text id="file.drop">或将文件拖拽于此</Text>}</span>
                    <input class="file-input" type="file" onChange={e => this.getFile(e)} multiple/>
                </div>
            </Localizer>

            <TTF className="voice"/>

            <Search className='search' lookup={this.state.lookup} setDefinition={(w, o) => this.search(w, o)}/>

            <Definition word={this.state.word} definition={this.state.definition} search={(w) => this.search(w)}/>
        </div>);
    }
}