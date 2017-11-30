import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

export default class StatusButton extends React.PureComponent {

    constructor(props) {
        super(props);

        this.markComplete = this.markComplete.bind(this);
        this.relinquish = this.relinquish.bind(this);
        this.claim = this.claim.bind(this);
    }

    markComplete() {

    }

    relinquish() {

    }

    claim() {

    }

    render() {

        const task = this.props.buildTask;

        const completed = task.get('completed');

        if (completed) {
            return (
                <div className="status-button completed">
                    <i className="fa fa-check-circle-o" /> Completed
                </div>
            )
        }

        const claimedByYou = this.props.user.get('id') && task.get('user_id') === this.props.user.get('id');

        if (claimedByYou) {
            return (
                <div className="status-button claimed-by-you">
                    <p>
                        <button className="btn btn-default" onClick={this.markComplete}>
                            Mark complete
                        </button>
                    </p>

                    <p>
                        <button className="btn btn-default" onClick={this.relinquish}>
                            Relinquish
                        </button>
                    </p>
                </div>
            )
        }

        const claimed = !!task.get('user_id');
        if (claimed) {
            return (
                <div className="status-button claimed">
                    Claimed by {task.get('user_name') || task.get('user_email')}
                </div>
            )
        }

        return (
            <div className="status-button unclaimed">
                <button className="btn btn-default btn-lg" onClick={this.claim}>
                    Claim!
                </button>
            </div>
        )
    }

}

StatusButton.propTypes = {
    buildTask: PropTypes.instanceOf(Immutable.Map).isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
};
