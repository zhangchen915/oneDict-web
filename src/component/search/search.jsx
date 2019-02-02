import {h, Component} from 'preact';
import VirtualList from 'preact-virtual-list'
import './search.scss'

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
        this.setDefinition();
    }

    async setDefinition() {
        this.props.setDefinition(this.state.word, this.state.offset)
    }

    async handleInputChange(e) {
        console.log(e, this.state.word)
    }

    async handleKeyUp(e) {
        this.setState({
            word: e.currentTarget.value,
            data: await this.props.lookup.getWordList(e.currentTarget.value)
        });
    }

    render() {
        return (<div className="search">
            <input type="text"
                   disabled={!this.props.lookup}
                   value={this.state.word}
                   placeholder={'请输入单词'}
                   onKeyUp={e => this.handleKeyUp(e)}
                   onChange={e => this.handleInputChange(e)}/>
            {!!this.state.data.length && <VirtualList
                class="list"
                data={this.state.data}
                renderRow={row => <div className={'row'} data-offset={row.offset}>{row.valueOf()}</div>}
                rowHeight={23}
                overscanCount={5}
                onClick={e => this.handleClick(e)}
            />}
        </div>);
    }
}