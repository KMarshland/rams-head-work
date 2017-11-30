import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import BuildTaskSubpanel from './build_task_subpanel'

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
        const createdAt = new Date(task.get('created_at'));

        return (
            <div className="panel panel-default task-panel set-task-panel">
                <div className="panel-body">
                    <a href={'/set_tasks/' + task.get('id') + '/edit'} className="pull-right panel-button">
                        <i className="fa fa-pencil" />
                    </a>

                    <a className="pull-right panel-button" onClick={this.deleteTask}>
                        <i className="fa fa-trash" />
                    </a>

                    <h1 className="text-center">
                        {task.get('name')}
                    </h1>

                    <div className={'priority priority-' + task.get('priority')}>
                        <p>
                            {task.get('priority') === 0 ? 'URGENT' : ('Priority ' + task.get('priority'))}
                        </p>

                        <p>
                            Created at {SetTaskPanel.formatAMPM(createdAt)} by {task.get('user_name') || task.get('user_email')}
                        </p>
                    </div>

                    <div className="sub-panels">

                        {
                            task.get('build_tasks').sortBy((task) => {
                                return task.get('id');
                            }).map((function (buildTask, i) {
                                return (
                                    <BuildTaskSubpanel key={i}
                                                       buildTask={buildTask}
                                                       user={this.props.user}
                                    />
                                )
                            }).bind(this))
                        }

                        {
                            this.props.user && this.props.user.get('is_admin') &&
                            <div className="col-md-4">
                                <div className="panel panel-default sub-panel">
                                    <div className="panel-body" onClick={() => {window.location = '/set_tasks/' + task.get('id') + '/build_tasks/new'}}>
                                        <a className="add-build-task" href={'/set_tasks/' + task.get('id') + '/build_tasks/new'}>
                                            <i className="fa fa-plus" />
                                            <span className="label">Add a build task</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                </div>
            </div>
        );
    }

    static formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;

        const strTime = hours + ':' + minutes + ampm;
        return strTime;
    }

}

SetTaskPanel.propTypes = {
    setTask: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map)
};
