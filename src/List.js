import React, {Component} from 'react';

import Item from './Item';

export default class List extends Component {

    render() {
        if (this.props.todoList.length === 0) {
            return <p>List is empty</p>;
        }

        let items = this.props.todoList.map(task =>
            <Item key={task.id}
                  id={task.id}
                  text={task.task}
                  done={task.done}
                  setDone={this.props.setDone}
            />);

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        The list
                    </div>
                    <div className="card-body">
                        <ol className="list-group" id="itemList">
                            {items}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}


