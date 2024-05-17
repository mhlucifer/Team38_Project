$(document).ready(function() {
    // Request default map
    loadMap('suburb', 'default');
    loadMap('year', 'default');

    $("#suburbInput").on("input", function() {
        var inputVal = $(this).val();
        if(inputVal.length > 0){ // Start search after at least 2 characters
            $.ajax({
                url: "/autocomplete?query=" + encodeURIComponent(inputVal),
                type: "GET",
                success: function(data) {
                    $("#autocomplete-results").empty();
                    data.forEach(function(item) {
                        $("#autocomplete-results").append(`<div onclick="selectResult('${item}')">${item}</div>`);
                    });
                }
            });
        } else {
            $("#autocomplete-results").empty();
        }
    });

    $("#searchSuburbBtn").click(function() {
        loadMap('suburb');
    });

    $("#searchYearBtn").click(function() {
        loadMap('year');
    });
});

function selectResult(value) {
    $("#suburbInput").val(value);
    $("#autocomplete-results").empty();
}

function showLoader() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
}

function loadMap(type, value = null) {
    let input = value;
    if (!input) {
        if (type === 'year') {
            input = document.getElementById('yearInput').value;
        } else if (type === 'suburb') {
            input = document.getElementById('suburbInput').value;
        } else {
            console.error('Unknown type for map generation');
            return;
        }
    }

    let apiUrl = `/generate_map?type=${type}&value=${input}`;

    // Show the loader
    showLoader();

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
    })
    .finally(() => {
        // Hide the loader
        hideLoader();
    });
}


// Clear previous maps when user leaves the page
window.addEventListener('beforeunload', function (event) {
    navigator.sendBeacon('/clear_maps');
});