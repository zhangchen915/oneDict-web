import {h, Component} from 'preact';
import './ttf.scss'

export function speak(word) {
    const voice = localStorage.getItem('voice');
    if (!voice) return;

    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = speechSynthesis.getVoices()[voice];
    speechSynthesis.speak(utterThis);
}

// TODO 有道词典发音 http://dict.youdao.com/dictvoice?audio=hello

export default class TTF extends Component {
    constructor() {
        super();
        this.state = {
            voices: [],
            value: 0
        };

        speechSynthesis.onvoiceschanged = () => {
            this.setState({
                voices: speechSynthesis.getVoices()
            })
        };
    }

    componentDidMount() {
        this.setState({value: localStorage.getItem('voice')})
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        localStorage.setItem('voice', e.target.value);
    }

    render() {
        return (
            <select id="ttf-select"
                    value={this.state.value}
                    onChange={e => this.handleChange(e)}>
                <option value="0">Choose a voice engine</option>
                {this.state.voices.map((e, i) => <option value={i + 1}>{e.name}</option>)}

            </select>
        );
    }
}