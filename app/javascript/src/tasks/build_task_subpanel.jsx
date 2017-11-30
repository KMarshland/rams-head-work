import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import StatusButton from './status_button'

export default class BuildTaskSubpanel extends React.PureComponent {

    render() {

        const task = this.props.buildTask;
        const link = '/set_tasks/' + task.get('set_task_id') + '/build_tasks/' + task.get('id');

        return (
            <div className="col-md-4">
                <div className="panel panel-default sub-panel build-task-subpanel">
                    <div className="panel-body" onClick={() => {window.location = link}}>
                        <a href={link}>
                            {task.get('name')}
                        </a>

                        <StatusButton
                            buildTask={this.props.buildTask}
                            user={this.props.user}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

BuildTaskSubpanel.propTypes = {
    buildTask: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map)
};
