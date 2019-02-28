import {h, Component} from 'preact';
import {speak} from "../ttf/ttf";
import Portal from 'preact-portal';
import fetchJsonp from 'fetch-jsonp'

import './definition.scss'

export default class Definition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.word,
            selectWord: '',
            locate: {},
            daily: {
                content: '',
                note: ''
            }
        };
    }

    componentWillMount() {
        fetchJsonp('http://open.iciba.com/dsapi', {
            headers: {'content-type': 'application/json'}
        }).then(res => res.json()).then(json => {
            this.setState({
                daily: {
                    content: json.content,
                    note: json.note
                }
            })
        })
    }

    componentDidUpdate() {
        if (this.props.word !== this.state.word) {
            this.definition.innerHTML = this.props.definition;
            this.setState({
                word: this.props.word,
                selectWord: ''
            });
        }
    }

    handleMouseUp() {
        let s = window.getSelection();
        let position = s.getRangeAt(0).getBoundingClientRect();

        const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
        setTimeout(this.setState(!!window.getSelection().toString() ? {
            selectWord: s.toString(),
            locate: {
                width: position.width,
                left: position.x,
                top: position.y + position.height + DOCUMENT_SCROLL_TOP
            }
        } : {selectWord: ''}), 10)
    }

    handlePopupClick(e) {
        e.preventDefault();
        switch (e.target.innerHTML) {
            case '🔍':
                this.props.search(this.state.selectWord);
                break;
            // case '📋':
            //     document.execCommand("copy");
            //     break;
            case '🔊':
                speak(this.state.selectWord);
                break
        }
        this.setState({selectWord: ''})
    }

    render(props, state) {
        const popupStyle = {
            top: state.locate.top,
            left: state.locate.left,
        };

        return (<div className='definition'>
            {
                this.props.definition ? <div className="voice-icon" onClick={() => {
                    speak(props.word)
                }}/> : <div className="daily">
                    <div>每日一句</div>
                    <div className="daily-en">{state.daily.content}</div>
                    <div className="daily-cn">{state.daily.note}</div>
                </div>
            }

            <div className="content">
                <div onMouseUp={event => this.handleMouseUp(event)}
                     onDblClick={event => this.handleMouseUp(event)}
                     ref={definition => this.definition = definition}
                />
            </div>

            {
                state.selectWord && <Portal into="body">
                    <div class="popup" style={popupStyle} onClick={e => this.handlePopupClick(e)}>
                        <div>🔍</div>
                        {/*<div>📋</div>*/}
                        <div>🔊</div>
                    </div>
                </Portal>
            }
        </div>);
    }
}