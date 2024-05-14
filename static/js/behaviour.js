let offset = 0;
const maxOffset = 2;
const minOffset = 0;

const slides = Array.from(document.querySelectorAll(".card"));

const clock = document.querySelector("#clock-table");

const timeLabels = ['Daytime Preference', 'Mobility', 'Mating Behaviour'];

timeLabels.forEach((label, index) => {
    addThickClockScale(index * 120, label); // 360 / 3 = 120
});

function addThickClockScale(degree, label) {
    const invisibleClockTable = document.createElement("div");
    invisibleClockTable.className = "invisible-table";
    invisibleClockTable.style.transform = `rotate(${degree}deg)`;
    const thickClockScale = document.createElement("div");
    thickClockScale.className = "clock-thick";
    const scaleContent = document.createElement("span");
    scaleContent.textContent = label;
    thickClockScale.appendChild(scaleContent);
    invisibleClockTable.appendChild(thickClockScale);
    clock.appendChild(invisibleClockTable);
}

function slideToPrev() {
    offset = offset === minOffset ? maxOffset : offset - 1;
    updateSlidesAndClock();
}

function slideToNext() {
    offset = offset === maxOffset ? minOffset : offset + 1;
    updateSlidesAndClock();
}

function updateSlidesAndClock() {
    slides.forEach((slide, index) => {
        if (index === offset) {
            slide.classList.add('active'); // Add active class to display the card
        } else {
            slide.classList.remove('active'); // Remove active class to hide the card
        }
    });
    clockRotate(offset * 120); // Rotate clock based on offset
}


function clockRotate(degree) {
    clock.style.transform = `rotate(${degree}deg)`;
}
updateSlidesAndClock();
