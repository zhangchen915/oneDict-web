import {h, Component} from 'preact';
import {speak} from "../ttf/ttf";
import Portal from 'preact-portal';

import './definition.scss'

export default class Definition extends Component {
    constructor() {
        super();
        this.state = {
            locate: {},
        };
    }

    open() {
        let s = window.getSelection();
        let oRange = s.getRangeAt(0); //get the text range
        let oRect = oRange.getBoundingClientRect();
        console.log(s, oRect)
        if (oRange.startContainer !== oRange.endContainer) this.setState({
            open: true,
            locate: {
                width: oRect.width,
                left: oRect.x,
                top: oRect.y + oRect.height
            }
        })
    }

    close() {
        this.setState({open: false})
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
                this.state.open && <Portal into="body">
                    <div class="popup" style={popupStyle}>
                        <div onClick={event => this.close()}>×</div>
                    </div>
                </Portal>
            }
        </div>);
    }
}