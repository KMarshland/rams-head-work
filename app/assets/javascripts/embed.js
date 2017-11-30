
function embed(url, container) {

    if (url.split('.').pop() === 'pdf') {
        $(container).append($('<a href="' + url + '">Download schematic</a>'));
    } else {
        $(container).append($('<img src="' + url + '""></img>'))
    }

}

