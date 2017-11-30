import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

export default class Navigation extends React.PureComponent {
    render() {
        return (
            <section className="navbar navbar-white navbar-fixed-top sticky-navigation" role="navigation">
                <div className="container">

                    <div className="navbar-header">
                        <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <i className="fa fa-bars" />
                        </button>
                        <a href="/" className="navbar-brand">
                            Ram's Head Theater
                        </a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right main-navigation">
                            {
                                this.props.user && this.props.user.get('is_admin') &&
                                <li>
                                    <a href="/set_tasks/new">New Set Task</a>
                                </li>
                            }

                            {
                                !this.props.user &&
                                <li>
                                    <a href="/users/sign_in">Sign in</a>
                                </li>
                            }

                            {
                                this.props.user &&
                                <li>
                                    <a href="/users/edit">
                                        Edit profile
                                    </a>
                                </li>
                            }

                            {
                                this.props.user &&
                                <li>
                                    <a href="/users/sign_out">
                                        Log out
                                    </a>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </section>
        );
    }
}

Navigation.propTypes = {
    user: PropTypes.instanceOf(Immutable.Map)
};
