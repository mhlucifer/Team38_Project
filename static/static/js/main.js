// Make sure the DOM is fully loaded before binding events
document.addEventListener('DOMContentLoaded', function() {
    // Bind click events to switch the display and hiding of the drop-down menu
    document.querySelector('.dropbtn').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent events from bubbling up to document
        let dropdownContent = this.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    //Hide the drop-down menu when clicking elsewhere on the page
    document.addEventListener('click', function(event) {
        let dropdownContents = document.querySelectorAll('.dropdown-content');
        dropdownContents.forEach(function(content) {
            if (content.style.display === 'block') {
                content.style.display = 'none';
            }
        });
    });
});


// JavaScript for action button
document.getElementById('action-button').addEventListener('click', function() {
    window.location.href = '/take_action';
});

document.getElementById('explore-locator').addEventListener('click', function() {
    window.location.href = '/location';
  });
  document.getElementById('identify-tools').addEventListener('click', function() {
    window.location.href = '/identifier';
  });


  document.getElementById('identify-tools').addEventListener('click', function() {
    window.location.href = '/identifier';
  });

   document.getElementById('learn-more-button').addEventListener('click', function() {
    window.location.href = '/history';
  });

  document.getElementById('learn-handling').addEventListener('click', function() {
    window.location.href = '/handle';
  });
