import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

export default class SetTaskPanel extends React.PureComponent {

    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask() {
        $.ajax({
            url: '/set_tasks/' + this.props.setTask.get('id') + '.json',
            method: 'DELETE',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-CSRF-Token', window.csrfToken)
            },
            success: function () {
                window.location = '/';
            }
        })
    }

    render() {

        const task = this.props.setTask;

        return (
            <div className="panel panel-default task-panel set-task-panel">
                <div className="panel-body">
                    <a className="pull-right delete-button" onClick={this.deleteTask}>
                        <i className="fa fa-trash" />
                    </a>

                    <h1>
                        {task.get('name')}
                    </h1>
                </div>
            </div>
        );
    }

}

SetTaskPanel.propTypes = {
    setTask: PropTypes.instanceOf(Immutable.Map).isRequired
};
