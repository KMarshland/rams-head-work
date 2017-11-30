import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

export default class NewTaskButton extends React.PureComponent {
    render() {
        if (!this.props.user || !this.props.user.get('is_admin')) {
            return null;
        }

        return (
            <div className="text-center">
                <a href="/set_tasks/new" className="btn btn-default btn-lg">
                    New Set Task
                </a>
            </div>
        );
    }
}

NewTaskButton.propTypes = {
    user: PropTypes.instanceOf(Immutable.Map)
};
