import {h, Component} from 'preact';
import {speak} from "../ttf/ttf";
import Portal from 'preact-portal';

import './definition.scss'

export default class Definition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.word,
            selectWord: '',
            locate: {},
        };
    }

    componentDidUpdate() {
        if (this.props.word !== this.state.word) {
            this.definition.innerHTML = this.props.definition;
            this.setState({
                word: this.props.word
            })
        }
    }

    handleMouseUp() {
        let s = window.getSelection();
        let position = s.getRangeAt(0).getBoundingClientRect();

        const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
        this.setState(s.anchorOffset !== s.extentOffset ? {
            selectWord: s.toString(),
            locate: {
                width: position.width,
                left: position.x,
                top: position.y + position.height + DOCUMENT_SCROLL_TOP
            }
        } : {selectWord: ''})
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

    render() {
        const popupStyle = {
            top: this.state.locate.top,
            left: this.state.locate.left,
        };

        return (<div className='definition'>
            {
                this.props.definition && <div className="voice-icon" onClick={() => {
                    speak(this.props.word)
                }}/>
            }
            <div onMouseUp={event => this.handleMouseUp(event)}
                 onDblClick={event => this.handleMouseUp(event)}
                 ref={definition => this.definition = definition}
            />
            {
                this.state.selectWord && <Portal into="body">
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