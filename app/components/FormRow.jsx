import React, { cloneElement } from 'react';
import merge from 'lodash/object/merge';

export default class FormRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label || props.field
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            label: nextProps.label || nextProps.field
        })
    }

    static defaultProps = {
        input: <input type="text"/>
    };

    render() {
        var props = {
            defaultValue: this.props.defaultValue,
            className: 'uk-form-width-large',
            ref: 'input'
        };

        var input = this.props.input;
        input = cloneElement(this.props.input, merge({}, input.props, props));

        return <div className="uk-form-row">
            <label className="uk-form-label">{this.state.label}</label>

            <div className="uk-form-controls">
                {input}
            </div>
        </div>;
    }
}