import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import StatusButton from './status_button'

export default class BuildTaskPanel extends React.PureComponent {

    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask() {
        const setTaskId = this.props.buildTask.get('set_task_id');

        $.ajax({
            url: '/set_tasks/' + setTaskId + '/build_tasks/' + this.props.buildTask.get('id') + '.json',
            method: 'DELETE',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-CSRF-Token', window.csrfToken)
            },
            success: function () {
                window.location = '/set_tasks/' + setTaskId;
            }
        })
    }

    render() {

        const task = this.props.buildTask;

        return (
            <div className="panel panel-default task-panel build-task-panel">
                <div className="panel-body">
                    <a href={'/set_tasks/' + task.get('set_task_id') + '/build_tasks/' + task.get('id') + '/edit'} className="pull-right panel-button">
                        <i className="fa fa-pencil" />
                    </a>

                    <a className="pull-right panel-button" onClick={this.deleteTask}>
                        <i className="fa fa-trash" />
                    </a>

                    <br />

                    <h1 className="text-center">
                        {task.get('name')}
                    </h1>

                    <h2 className="text-center">
                        <a href={'/set_tasks/' + task.get('set_task_id')}>
                            Part of {task.get('set_task_name')}
                        </a>
                    </h2>

                    <div className="text-center">
                        <StatusButton
                            buildTask={this.props.buildTask}
                            user={this.props.user}
                        />
                    </div>

                    <div className="larger">
                        <div>
                            <h2>Required Skills</h2>
                            <ul>
                                {
                                    task.get('skills').length == 0 &&
                                    <li>None</li>
                                }
                                {task.get('skills').map(function (skill) {
                                    return <li key={skill}>{skill}</li>
                                })}
                            </ul>
                        </div>

                        <div>
                            {task.get('notes').split("\n").map(function (line, i) {
                                return <p key={i}>{line}</p>
                            })}
                        </div>
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

BuildTaskPanel.propTypes = {
    buildTask: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map)
};
