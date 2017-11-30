

export default function readConfig(store) {

    (function getUser() {
        store.dispatch({
            type: 'SET_USER',
            user: window.user
        })
    })();

}
