function loadMap(type) {
    let input;
    if (type === 'year') {
        input = document.getElementById('yearInput').value;
    } else if (type === 'suburb') {
        input = document.getElementById('suburbInput').value;
    } else {
        console.error('Unknown type for map generation');
        return;
    }

    let apiUrl = `/generate_map?type=${type}&value=${input}`;

    fetch(apiUrl, { method: 'POST' })
    .then(response => {
        if(response.ok) {
            return response.text();
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (typeof data === 'string') {
            let iframeId = type === 'year' ? 'yearMapFrame' : 'suburbMapFrame';
            let iframe = document.getElementById(iframeId);
            iframe.contentDocument.open();
            iframe.contentDocument.write(data);
            iframe.contentDocument.close();
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while generating the map.');
    });
}