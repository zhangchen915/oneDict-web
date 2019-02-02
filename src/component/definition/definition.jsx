import {h, Component} from 'preact';
import {speak} from "../ttf/ttf";
import Portal from 'preact-portal';

import './definition.scss'

export default class Definition extends Component {
    constructor() {
        super();
        this.state = {
            selectWord: '',
            locate: {},
        };
    }

    open() {
        let s = window.getSelection();
        let oRange = s.getRangeAt(0);
        let oRect = oRange.getBoundingClientRect();
        console.log(s, oRect)
        if (s.anchorOffset !== s.extentOffset) this.setState({
            selectWord: s.toString(),
            locate: {
                width: oRect.width,
                left: oRect.x,
                top: oRect.y + oRect.height
            }
        })
    }

    close() {
        this.setState({selectWord: ''})
    }

    render() {
        const popupStyle = {
            top: this.state.locate.top,
            left: this.state.locate.left, // note the capital 'W' here
        };

        return (<div className='definition'>
            {
                this.props.definition && <div className="voice-icon" onClick={() => {
                    speak(this.props.word)
                }}/>
            }
            <div onMouseUp={event => this.open(event)} onDblClick={event => this.open(event)}
                 dangerouslySetInnerHTML={{__html: this.props.definition}}/>
            {
                this.state.selectWord && <Portal into="body">
                    <div class="popup" style={popupStyle}>
                        <div onClick={() => this.props.search(this.state.selectWord)}>🔍</div>
                        {/*<div onClick={event => this.copy()}>📋</div>*/}
                        <div onClick={event => this.copy()}>🏷</div>
                        <div onClick={event => speak(this.state.selectWord)}>🔊</div>
                        <div onClick={event => this.close()}>×</div>
                    </div>
                </Portal>
            }
        </div>);
    }
}