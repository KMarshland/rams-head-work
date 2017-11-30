import store from '../store'

export default function refreshSetTasks() {
    $.ajax({
        url: '/set_tasks.json',
        method: 'GET',
        success: function(response) {
            window.set_tasks = response.set_tasks;

            store.dispatch({
                type: 'SET_SET_TASKS',
                set_tasks: window.set_tasks
            });
        }
    })
}