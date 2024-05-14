document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel-inner');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    nextButton.addEventListener('click', function() {
        // Move right by half the width of the carousel's visible area
        carousel.scrollBy({left: carousel.offsetWidth, behavior: 'smooth'});
    });

    prevButton.addEventListener('click', function() {
        // Move left by half the width of the carousel's visible area
        carousel.scrollBy({left: -carousel.offsetWidth, behavior: 'smooth'});
    });
});



const stateInfo = {
     "Victoria": "Contact Customer Service Center on 136186. If in doubt, take a photograph and email to highrisk.invasiveanimals@agriculture.vic.gov.au",
     "Queensland": "No contact number , please follow the instructions provided above.",
     "Western Australia": "If you think what you spot is a cane toad, please call the Government of Western Australia Cane Toad Hotline on 1800 084 881.",
     "New South Wales": "Use this form to report a cane toad https://forms.bf.dpi.nsw.gov.au/forms/9247",
     "South Australia": "Report any cane toad to National Pest Alert Hotline (Freecall): 1800 084 881.",
     "Northen Territory" : "No contact number , please follow the instructions provided above."
};

function showSuggestions(input) {
     const suggestionBox = document.getElementById('suggestionBox');
     suggestionBox.innerHTML = ''; // Clear previous suggestions
     if (input. length > 0) {
         const matches = Object.keys(stateInfo).filter(state => state.toLowerCase().startsWith(input.toLowerCase()));
         if (matches. length > 0) {
             suggestionBox.style.display = 'block'; // Show suggestions box
             matches.forEach(state => {
                 const div = document.createElement('div');
                 div.textContent = state;
                 div.onclick = function() {
                     document.getElementById('suburbInput').value = state;
                     suggestionBox.innerHTML = '';
                     suggestionBox.style.display = 'none'; // Hide after selection
                 };
                 suggestionBox.appendChild(div);
             });
         } else {
             suggestionBox.style.display = 'none'; // Hide if no matches
         }
     } else {
         suggestionBox.style.display = 'none'; // Hide if input is empty
     }
}

function searchLocation() {
     var input = document.getElementById('suburbInput').value;
     var messageBox = document.getElementById('messageBox');
     if (stateInfo[input]) {
         messageBox.textContent = stateInfo[input];
         messageBox.style.display = 'block'; // Make sure the message box is displayed
     } else {
         messageBox.textContent = 'No matching state found. Please try again.';
         messageBox.style.display = 'block'; // Display message even if there is no match
     }
}

function changeSlide(index) {
    const carousel = document.getElementById('carouselInner');
    const itemWidth = document.querySelector('.carousel-item').offsetWidth;
    carousel.style.transform = `translateX(-${(index - 1) * itemWidth}px)`;

    // Highlight active label
    const labels = document.querySelectorAll('.carousel-controls label');
    labels.forEach(label => {
        label.classList.remove('active');
    });
    const activeLabel = document.getElementById(`label${index}`);
    activeLabel.classList.add('active');
}
