import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import refreshSetTasks from '../helpers/refresh_set_tasks'
import store from '../store'

export default class StatusButton extends React.PureComponent {

    constructor(props) {
        super(props);

        this.markComplete = this.markComplete.bind(this);
        this.relinquish = this.relinquish.bind(this);
        this.claim = this.claim.bind(this);
    }

    markComplete(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.sendRequest({
            path: '/mark_complete',
            messageTitle: 'Marked complete!',
            requestNotes: true
        })
    }

    relinquish(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.sendRequest({
            path: '/relinquish',
            messageTitle: 'Relinquished!',
            messageText: 'That means that other people can now claim this task, and you can work on something else',
            requestNotes: true
        })
    }

    claim(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.sendRequest({
            path: '/claim',
            messageTitle: 'Claimed!'
        })
    }

    sendRequest(opts) {

        if (opts.requestNotes) {
            swal({title: 'Any notes?', input: 'textarea'}).then((function(r){
                if (r.value) {
                    go.call(this, r.value);
                }
            }).bind(this));
        } else {
            go.call(this);
        }

        function go(notes) {
            const setTaskId = this.props.buildTask.get('set_task_id');
            const baseUrl = '/set_tasks/' + setTaskId + '/build_tasks/' + this.props.buildTask.get('id');

            $.ajax({
                url: baseUrl + opts.path + '.json',
                data: {
                    notes: notes
                },
                method: 'POST',
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('X-CSRF-Token', window.csrfToken)
                },
                success: function (response) {
                    swal({title: opts.messageTitle, type: 'success', text: opts.messageText});

                    window.build_task = response.build_task;
                    window.set_task = response.set_task;

                    store.dispatch({
                        type: 'SET_BUILD_TASK',
                        build_task: window.build_task
                    });

                    store.dispatch({
                        type: 'SET_SET_TASK',
                        set_task: window.set_task
                    });

                    refreshSetTasks();
                },
                error: function (err) {
                    const reason = (err.responseJSON || {reason: 'Unexpected error'}).reason;
                    swal({title: 'Failure', type: 'error', text: reason})
                }
            })
        }
    }

    render() {

        const task = this.props.buildTask;

        const complete = task.get('complete');

        if (complete) {
            return (
                <div className="status-button completed">
                    <i className="fa fa-check-circle-o" /> Completed
                </div>
            )
        }

        const claimedByYou = this.props.user && task.get('user_id') === this.props.user.get('id');

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
    user: PropTypes.instanceOf(Immutable.Map)
};
