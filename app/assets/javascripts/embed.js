
function embed(url, container) {
    var extension = url.split('.').pop().toLowerCase();


    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif') {
        $(container).append($('<img src="' + url + '""></img>'))
    } else {
        $(container).append($('<a href="' + url + '">Download schematic</a>'));
    }
}

