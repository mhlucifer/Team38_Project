document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('imageUpload');
    var submitBtn = document.getElementById('submitBtn');
    var resultDiv = document.getElementById('result');
    var loadingSpinner = document.getElementById('loadingSpinner'); // Get the spinner element

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var previewImage = document.getElementById('previewImage');
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Submit button click event handler function
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        loadingSpinner.style.display = 'block'; // Show the spinner when submit is clicked
        var formData = new FormData();
        formData.append('imageFile', fileInput.files[0]);

        fetch('/model_identifier', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none'; // Hide the spinner when data is received
            if (data.error) {
                resultDiv.innerHTML = 'Error: ' + data.error;
            } else {
                var resultMessage = '<strong style="font-size: 1.5em;">Is it a Cane Toad?</strong>: ';
                resultMessage += data.is_canetoad 
                    ? '<span style="color: green; font-size: 1.5em;">Yes</span>' 
                    : '<span style="color: red; font-size: 1.5em;">No</span>';
                resultDiv.innerHTML = resultMessage;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Sorry, an unexpected error has occurred. Please try uploading another image?';
            loadingSpinner.style.display = 'none'; // Hide the spinner on error
        });
    });
});
