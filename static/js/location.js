function loadMap(type) {
    // Get user input
    let input;
    if (type === 'year') {
        input = document.getElementById('yearInput').value;
    } else if (type === 'suburb') {
        input = document.getElementById('suburbInput').value;
    } else {
        console.error('Unknown type for map generation');
        return;
    }

    // Construct request address
    let apiUrl = `/generate_map?type=${type}&value=${input}`;
    
    // Initiate a request to let the backend start generating the map
    fetch(apiUrl, { method: 'POST' })
    .then(response => {
        if(response.ok) {
            return response.text();
        } else {
            return response.json(); // If the response is not ok, assume it returns an error message in JSON format
        }
    })
    .then(data => {
        if (typeof data === 'string') {
            // Load the map normally
            let iframeId = type === 'year' ? 'yearMapFrame' : 'suburbMapFrame';
            let iframe = document.getElementById(iframeId);
            iframe.contentDocument.open();
            iframe.contentDocument.write(data);
            iframe.contentDocument.close();
        } else {
            // Error handling, display error information
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while generating the map.');
    });
}
