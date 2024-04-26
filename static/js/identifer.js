// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('imageUpload');
    var fileInputLabel = document.getElementById('fileInputLabel'); // Make sure to add this id to your custom label or button in HTML
  
    // When the custom button is clicked, trigger the file input click event
    fileInputLabel.addEventListener('click', function() {
      fileInput.click();
    });
  
    // When a file is selected, change the label accordingly
    fileInput.addEventListener('change', function(event) {
      var fileName = event.target.files[0].name;
      fileInputLabel.innerText = fileName; // Update the custom label/button text
  
      var reader = new FileReader();
      reader.onload = function() {
        var output = document.getElementById('previewImage');
        output.src = reader.result;
        output.style.display = 'block';
      };
      reader.readAsDataURL(event.target.files[0]);
    });
  
  });
  
  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("previewImage");
      var uploadText = document.getElementById("uploadText");
      
      preview.src = src;
      preview.style.display = "block";
    }
  }

  document.getElementById('submitBtn').addEventListener('click', function() {
    alert('This feature is currently under development and not yet available.');
  });