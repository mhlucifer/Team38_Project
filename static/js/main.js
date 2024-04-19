$("#nav a").on("click", function () {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav .slide1").css({opacity: 1, left: +position.left, width: width});
});
$("#nav a").on("mouseover", function () {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#nav .slide2").css({opacity: 1, left: +position.left, width: width}).addClass("squeeze");
});
$("#nav a").on("mouseout", function () {
    $("#nav .slide2").css({opacity: 0}).removeClass("squeeze");
});
var currentWidth = $("#nav li:nth-of-type(3) a").parent("li").width();
var current = $("li:nth-of-type(3) a").position();
$("#nav .slide1").css({left: +current.left, width: currentWidth});


// JavaScript代码
window.addEventListener('scroll', function () {
    // Get all navigation items and content areas
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.drawerbox a');
    const mainPageLink = document.querySelector('a[href="#img-one"]');

    let current = '';
    //Set the initial state for the "Main Page" link
    let isAtTop = window.pageYOffset === 0;

    // Iterate through each content area
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => link.classList.remove('active'));

    if (isAtTop) {
        mainPageLink.classList.add('active');
    } else {
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
});


(function ($) {
    $.fn.timeline = function () {
        var selectors = {
            id: $(this),
            item: $(this).find(".item"),
            activeClass: "item--active",
            img: ".img"
        };
        // Activate the first timeline project and set the timeline background image to the image of the first project
        selectors.item.eq(0).addClass(selectors.activeClass);
        selectors.id.css(
            "background-image",
            "url(" +
            selectors.item.first()
                .find(selectors.img)
                .attr("src") +
            ")"
        );
        var itemLength = selectors.item.length;
        $(window).scroll(function () {
            var max, min;
            var pos = $(this).scrollTop();
            selectors.item.each(function (i) {
                min = $(this).offset().top;
                max = $(this).height() + $(this).offset().top;
                var that = $(this);
                if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
                    selectors.item.removeClass(selectors.activeClass);
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        selectors.item.last()
                            .find(selectors.img)
                            .attr("src") +
                        ")"
                    );
                    selectors.item.last().addClass(selectors.activeClass);
                } else if (pos <= max - 10 && pos >= min) {
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        $(this)
                            .find(selectors.img)
                            .attr("src") +
                        ")"
                    );
                    selectors.item.removeClass(selectors.activeClass);
                    $(this).addClass(selectors.activeClass);
                }
            });
        });
    };
})(jQuery)

$("#shell").timeline();


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
    offset = Math.max(minOffset, offset - 1);
    updateSlidesAndClock();
}


function slideToNext() {
    offset = Math.min(maxOffset, offset + 1);
    updateSlidesAndClock();
}


function updateSlidesAndClock() {
    slides.forEach(slide => {
        slide.style.transform = `translateY(${offset * -100}%)`;
    });
    clockRotate(offset * 120);
}


function clockRotate(degree) {
    clock.style.transform = `rotate(${degree}deg)`;
}


updateSlidesAndClock();




const quizData = {
  "handling": [
    { question: "Cane toads are invasive species for ...", answer: "Australia" },
    { question: "Cane toads' poison can cause ... harm to other species that come into contact.", answer: "harm" },
    { question: "The uncontrolled increase in cane toad populations poses a significant threat to ...", answer: "native ecosystems" },
    { question: "There has been a loss in ... due to loss of native species.", answer: "tourism" },
    { question: "... are some of the predators whose population has decreased due to cane toads.", answer: "Snakes/lizards" },
    { question: "Cane toads release poison via ... gland on their ...", answer: "parotoid, shoulder" },
    { question: "The dominance of cane toads ... the survival of smaller animals.", answer: "threatens" },
    { question: "Cane toads have no ... in Australia, leading to their excessive populations.", answer: "natural predators" },
    { question: "Cane toads cause ... modification because the native species must leave their natural ... due to the threat of cane toads.", answer: "habitat, habitat" },
    { question: "Cane toads cause a decline in ... stocks due to poison.", answer: "fish" },
    { question: "The best method to kill toads is to ... them.", answer: "freeze" },
    { question: "One way to stop the spread of cane toads is to remove ...", answer: "water" },
    { question: "Make sure you stay ... when you encounter a cane toad.", answer: "calm" },
    { question: "Keep your ... away.", answer: "pets" },
    { question: "Notify ..., they can provide guidance on the next steps.", answer: "authorities" },
    { question: "Share your ... and raise ...", answer: "knowledge, awareness" }
  ],
  "location": [
    { question: "Cane toads prefer ... areas.", answer: "large, open" },
    { question: "Cane toads thrive in ...", answer: "moist areas" },
    { question: "Cane toads are the most common in ...", answer: "Queensland and New South Wales" },
    { question: "Cane toads are commonly found in habitats such as ..., ... and urban areas.", answer: "grasslands, open woodlands" },
    { question: "Cane toads prefer access to water for ... and reproduction.", answer: "hydration" }
  ],
  "behaviour": [
    { question: "Cane toads are ... animals, they are the most active during the night.", answer: "nocturnal" },
    { question: "Cane toads prefer the night time because of ... temperatures and ... moisture levels.", answer: "cooler, higher" },
    { question: "Male cane toads produce unique ... to attract the females. These calls on dependent on the cane toad’s ..., ... and ... conditions.", answer: "mating calls, size, health, environmental" },
    { question: "Cane toad mating generally happens in ... locations.", answer: "wet" },
    { question: "Female cane toads prefer male cane toads with ... and ... calls.", answer: "loud, intense" },
    { question: "Female cane toads deposit their ... eggs in ...", answer: "string like, water" },
    { question: "Cane toads ... jump long distances.", answer: "cannot" },
    { question: "Cane toads stay close to the ...", answer: "ground" },
    { question: "Being active in the night, cane toads are able to reduce their risk of ... in hot and ... conditions.", answer: "dehydration, dry" },
    { question: "Cane toads exhibit ... behaviours during mating.", answer: "aggressive" }
  ]
};




// location quiz
document.addEventListener('DOMContentLoaded', function() {
    // Set current question index to 0
    let currentQuestionIndex = 0;
    const userAnswers = [];

    // Bind the click event of the start test button
    document.querySelector('.start-quiz').addEventListener('click', function() {
        const username = document.querySelector('.username').value.trim();
        if (username.length > 0) {
            document.getElementById('start-section').style.display = 'none';
            document.querySelector('.quiz-section').style.display = 'block';
            renderQuestion(quizType, currentQuestionIndex);
        } else {
            alert('Please input your name');
        }
    });

    // Bind the click event of the next question button
    document.querySelector('.next').addEventListener('click', function() {
        const answerInput = document.querySelector('.answer');
        userAnswers[currentQuestionIndex] = answerInput.value.trim(); // save answer
        currentQuestionIndex++; // Add question index

        if (currentQuestionIndex < quizData[quizType].length) {
            renderQuestion(quizType, currentQuestionIndex);
        } else {
            showResults(quizType, userAnswers);
        }
    });
});

function renderQuestion(quizType, index) {
    const quizContainer = document.querySelector('.quiz');
    const item = quizData[quizType][index];
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <p>${index + 1}. ${item.question}</p>
            <input type="text" class="answer" data-index="${index}" placeholder="Your Answer">
            <br>
        </div>
    `;
    // If it's the last question, change the button text
    const nextButton = document.querySelector('.next');
    if (index === quizData[quizType].length - 1) {
        nextButton.textContent = 'Submit The Answer';
    } else {
        nextButton.textContent = 'Next Question';
    }
}

function showResults(quizType, userAnswers) {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[quizType][index].answer) {
            score++;
        }
    });
    // Hide problem areas, show results
    document.querySelector('.quiz-section').style.display = 'none';
    const finalScoreElement = document.querySelector('.final-score');
    finalScoreElement.style.display = 'block';
    finalScoreElement.textContent = `Your Score：${score}/${quizData[quizType].length}`;
}


