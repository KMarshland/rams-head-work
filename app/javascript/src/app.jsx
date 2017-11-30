// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import readConfig from './helpers/read_config'

import Navigation from './navigation'
import NewTaskButton from './main_page/new_task_button'
import SetTaskPanel from './set_tasks/set_task_panel'

class MainPage extends React.PureComponent {
    render() {
        return (
            <div>
                <Navigation user={this.props.user} />
                <div className="below">
                    <NewTaskButton user={this.props.user} />
                </div>
            </div>
        )
    }
}

class SetTaskPage extends React.PureComponent {
    render() {
        return (
            <div>
                <Navigation user={this.props.user} />
                <div className="below container">
                    <SetTaskPanel setTask={this.props.setTask} />
                </div>
            </div>
        )
    }
}

class BlankPage extends React.PureComponent {
    render() {
        return (
            <div>
                <Navigation user={this.props.user} />
            </div>
        )
    }
}

document.addEventListener('turbolinks:load', () => {

    readConfig(store);

    let pageType = window.location.pathname;

    if (/\/set_tasks\/\d+/.test(pageType)) {
        pageType = '/set_tasks/*';
    }

    const page = {
        '/': MainPage,
        '/set_tasks/*': SetTaskPage
    }[pageType] || BlankPage;

    const Connection = connect(function (store) {
        return store;
    })(page);

    let parent = document.createElement('div');
    parent.className = 'react-container';

    ReactDOM.render(
        <Provider store={store}>
            <Connection />
        </Provider>,
        document.body.insertBefore(parent, document.body.childNodes[0])
    );
});

