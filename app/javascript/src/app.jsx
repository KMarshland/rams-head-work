// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'

class MainPage extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>Hi</h1>
            </div>
        )
    }
}

class BlankPage extends React.PureComponent {
    render() {
        return (
            <div>

            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {

    let pageType = window.location.pathname;

    const page = {
        '/': MainPage,
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
