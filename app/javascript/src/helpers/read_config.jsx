

export default function readConfig(store) {

    (function getUser() {
        store.dispatch({
            type: 'SET_USER',
            user: window.user
        });
    })();

    (function getTasks() {
        store.dispatch({
            type: 'SET_SET_TASK',
            set_task: window.set_task
        });

        store.dispatch({
            type: 'SET_SET_TASKS',
            set_tasks: window.set_tasks
        });

        store.dispatch({
            type: 'SET_BUILD_TASK',
            build_task: window.build_task
        });
    })();

}
