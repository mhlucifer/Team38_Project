document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('imageUpload');
    var submitBtn = document.getElementById('submitBtn');
    var resultDiv = document.getElementById('result');

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
        event.preventDefault();  //
        var formData = new FormData();
        formData.append('imageFile', fileInput.files[0]);
        fetch('/model_identifier', {
    method: 'POST',
    body: formData,
})
.then(response => response.json())
.then(data => {
    if (data.error) {
        resultDiv.innerHTML = 'Error: ' + data.error;
    } else {
        resultDiv.innerHTML = '<strong>Is it a Cane Toad?</strong>: ' + (data.is_canetoad ? 'Yes' : 'No') +
                              '<br><strong>Confidence:</strong> ' + (data.confidence * 100).toFixed(2) + '%';
    }
})
.catch(error => {
    console.error('Error:', error);
    resultDiv.innerHTML = 'An error occurred.';
});
    });
});
