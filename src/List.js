import React, {Component} from 'react';

import Item from './Item';

export default class List extends Component {

    render() {        

        if(this.props.todoList.length) {
        let items = this.props.todoList.map(task =>
            <Item key={task.id}
                  id={task.id}
                  text={task.task} 
                  task={task.task}        
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
        else {
            return ( <h1>NO DATA</h1>)
        }
    }
}


