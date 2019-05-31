import React, {Component} from 'react';

export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.done
        }
    }

    handleChange(event) {
        let checked = event.target.checked;
        this.setState({
            checked: checked
        },() => this.props.setDone(this.props.id, checked));
    }

    render() {
        return (
            <li className="list-group-item">
                <input id={this.props.id}
                       type="checkbox"
                       className="todoCheckbox"
                       checked={this.state.checked}
                       onChange={(event) => this.handleChange(event)}
                />
                <label htmlFor={this.props.id}>{this.props.text}</label>
            </li>
        );
    }
}


