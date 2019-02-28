import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import VirtualList from 'preact-virtual-list'
import './search.scss'
import {setSearchHistory} from "../../store/history";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            word: '',
            offset: 0,
            data: []
        };
    }

    handleClick(e) {
        this.setState({
            word: e.target.innerText,
            offset: e.target.dataset.offset,
            data: []
        });
        setSearchHistory([this.state.word, this.state.offset]);
        this.setDefinition();
    }

    async setDefinition() {
        this.props.setDefinition(this.state.word, this.state.offset)
    }

    async handleKeyUp(e) {
        const input = e.currentTarget.value.trim();
        if (e.key === "Enter") {
            this.setState({
                word: input,
                offset: this.state.data.length ? this.state.data[0].offset : 0,
                data: []
            });
            this.setDefinition();
        } else {
            if (input !== this.state.word) this.setState({
                word: input,
                data: await this.props.lookup.getWordList(input)
            });
        }
    }

    render() {
        return (<div className="search">
            <Localizer>
                <input type="text"
                       disabled={!this.props.lookup}
                       value={this.state.word}
                       placeholder={<Text id="input">请输入单词</Text>}
                       onKeyUp={e => this.handleKeyUp(e)}/>
            </Localizer>
            {!!this.state.data.length && <VirtualList
                class="list"
                data={this.state.data}
                renderRow={row => <div className={'row'} data-offset={row.offset}>{row.word}</div>}
                rowHeight={23}
                overscanCount={5}
                onClick={e => this.handleClick(e)}
            />}
        </div>);
    }
}