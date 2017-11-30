import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

export default class SetTaskPanel extends React.PureComponent {

    render() {

        const task = this.props.setTask;

        return (
            <div className="panel panel-default task-panel set-task-panel">
                <div className="panel-body">
                    <a className="pull-right">
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
