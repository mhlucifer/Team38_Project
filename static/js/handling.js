document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector('.carousel-inner');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    if (carousel && nextButton && prevButton) {
        nextButton.addEventListener('click', function() {
            // Move right by the width of the carousel's visible area
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });

        prevButton.addEventListener('click', function() {
            // Move left by the width of the carousel's visible area
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });
    } else {
        console.error('Carousel or navigation buttons not found.');
    }
});

const stateInfo = {
    "Victoria": "Contact Customer Service Center on <strong>136186</strong>. <br>If in doubt, take a photograph and email to <strong>highrisk.invasiveanimals@agriculture.vic.gov.au</strong>",
    "Queensland": "No contact number, please follow the instructions provided above.",
    "Western Australia": "If you think what you spot is a cane toad, please call the Government of Western Australia Cane Toad Hotline on <strong>1800 084 881</strong>.",
    "New South Wales": "Use this form to report a cane toad: <a href='https://forms.bf.dpi.nsw.gov.au/forms/9247' target='_blank'>Report Form</a>",
    "South Australia": "Report any cane toad to National Pest Alert Hotline (Freecall): <strong>1800 084 881</strong>.",
    "Northern Territory": "No contact number, please follow the instructions provided above.",
    "Tasmania": "Report any sightings or concerns to Quarantine Tasmania on <strong>1800 084 881</strong>."
};

function showSuggestions(input) {
    const suggestionBox = document.getElementById('suggestionBox');
    if (suggestionBox) {
        suggestionBox.innerHTML = ''; // Clear previous suggestions
        if (input.length > 0) {
            const matches = Object.keys(stateInfo).filter(state => state.toLowerCase().startsWith(input.toLowerCase()));
            if (matches.length > 0) {
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
    } else {
        console.error('Suggestion box not found.');
    }
}

function searchLocation() {
    const input = document.getElementById('suburbInput').value;
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        if (stateInfo[input]) {
            messageBox.innerHTML = stateInfo[input];
            messageBox.style.display = 'block'; // Make sure the message box is displayed
        } else {
            messageBox.textContent = 'No matching state found. Please try again.';
            messageBox.style.display = 'block'; // Display message even if there is no match
        }
    } else {
        console.error('Message box not found.');
    }
}

function changeSlide(index) {
    const carousel = document.getElementById('carouselInner');
    const item = document.querySelector('.carousel-item');
    if (carousel && item) {
        const itemWidth = item.offsetWidth;
        carousel.style.transform = `translateX(-${(index - 1) * itemWidth}px)`;

        // Highlight active label
        const labels = document.querySelectorAll('.carousel-controls label');
        labels.forEach(label => {
            label.classList.remove('active');
        });
        const activeLabel = document.getElementById(`label${index}`);
        if (activeLabel) {
            activeLabel.classList.add('active');
        } else {
            console.error(`Label with id label${index} not found.`);
        }
    } else {
        console.error('Carousel or carousel item not found.');
    }
}
