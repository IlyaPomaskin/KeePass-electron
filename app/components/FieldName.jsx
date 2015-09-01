import React, { findDOMNode } from 'react';

export default class FieldNameInput extends React.Component {
    static defaultProps = {
        defaultValue: ''
    };

    onKeyDown = (e) => {
        switch (e.keyCode) {
            case 13:
                this.onApply();
                break;
            case 27:
                this.onCancel();
                break;
            default:
                break;
        }
    };

    onApply = () => {
        const input = findDOMNode(this.refs.input);
        if (this.props.onApply) {
            this.props.onApply(input.value);
        }
        input.blur();
    };

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        findDOMNode(this.refs.input).blur();
    };

    onBlur = () => {
        if (this.props.saveOnBlur) {
            this.onApply();
        } else {
            this.onCancel();
        }
    };

    render() {
        return <input className="uk-form-width-large"
                      defaultValue={this.props.value}
                      {...this.props}
                      onBlur={this.onBlur}
                      onKeyDown={this.onKeyDown}
                      ref="input"
                      type="text"/>
    }
}
