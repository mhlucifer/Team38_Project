
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


