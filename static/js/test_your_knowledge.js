let currentTopic = '';
let currentQuestions = [];  // Global variable to store the displayed questions

const quizzes = {
    'Behaviour': [
        { question: "Cane toads are …… animals, they are the most active during the night.", answer: "nocturnal" },
        { question: "Cane toads prefer the night time because of …… temperatures and …… moisture levels.", answer: "cooler, higher" },
        { question: "Male cane toads produce …… to attract females. These calls depend on the toad's ……, ……, and …… conditions.", answer: "mating calls, size, health, environmental" },
        { question: "Cane toad mating generally happens in …… locations.", answer: "wet" },
        { question: "Female cane toads prefer male cane toads with …… and …… calls.", answer: "loud, intense" },
        { question: "Female cane toads deposit their …… eggs in …….", answer: "string like, water" },
        { question: "Cane toads …… jump long distances.", answer: "cannot" },
        { question: "Cane toads stay close to the …….", answer: "ground" },
        { question: "Being active at night helps cane toads reduce their risk of …… in hot and …… conditions.", answer: "dehydration, dry" },
        { question: "Cane toads exhibit …… behaviours during mating.", answer: "aggressive" }
    ],
    'Handling': [
        { question: "Cane toads are invasive species for …….", answer: "Australia" },
        { question: "Cane toads’ poison can cause …… to other species that come into contact.", answer: "harm" },
        { question: "The uncontrolled increase in cane toad populations poses a significant threat to …… ecosystems.", answer: "native" },
        { question: "There has been a loss in …… due to loss of native species.", answer: "tourism" },
        { question: "…… are some of the predators whose population has decreased due to cane toads.", answer: "Snakes, lizards" },
        { question: "Cane toads release poison via …… glands on their …….", answer: "parotoid, shoulders" },
        { question: "The dominance of cane toads …… the survival of smaller animals.", answer: "threatens" },
        { question: "Cane toads have no …… in Australia, leading to their excessive populations.", answer: "natural predators" },
        { question: "Cane toads cause …… modification because native species must leave their …… due to the threat.", answer: "habitat, habitat" },
        { question: "Cane toads cause a decline in …… stocks due to poison.", answer: "fish" },
        { question: "The best method to kill toads is to …… them.", answer: "freeze" },
        { question: "One way to stop the spread of cane toads is to remove …….", answer: "water" },
        { question: "Make sure you stay …… when you encounter a cane toad.", answer: "calm" },
        { question: "Keep your …… away from cane toads.", answer: "pets" },
        { question: "Notify ……, they can provide guidance on the next steps.", answer: "authorities" },
        { question: "Share your …… and raise …… about the threat of cane toads.", answer: "knowledge, awareness" }
    ],
    'Location': [
        { question: "Cane toads prefer ……, open areas.", answer: "large" },
        { question: "Cane toads thrive in …… areas.", answer: "moist" },
        { question: "Cane toads are the most common in …….", answer: "Queensland and New South Wales" },
        { question: "Cane toads are commonly found in habitats such as ……, ……, and urban areas.", answer: "grasslands, open woodlands" },
        { question: "Cane toads prefer access to water for …… and reproduction.", answer: "hydration" }
    ]
};


function loadQuiz(topic) {
    currentTopic = topic;
    currentQuestionIndex = 0;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.display = 'flex';

    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    overlay.appendChild(questionContainer);

    document.body.appendChild(overlay);

    currentQuestions = selectRandomQuestions(topic);
    showAllQuestions(questionContainer, currentQuestions);
}

function selectRandomQuestions(topic) {
    let questionSet = [];
    if (topic === 'Expert Quiz') {
        let allQuestions = [];
        Object.values(quizzes).forEach(questions => allQuestions.push(...questions));
        questionSet = chooseRandom(allQuestions, 4);
    } else {
        questionSet = chooseRandom(quizzes[topic], 4);
    }
    return questionSet;
}

function chooseRandom(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function showAllQuestions(container, questions) {
    questions.forEach((item, index) => {
        let questionBox = document.createElement('div');
        questionBox.className = 'question-box';
        questionBox.innerHTML = `<div>${item.question}</div><input type="text" id="answer${index}" class="quiz-input">`;
        container.appendChild(questionBox);
    });
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = submitQuiz;
    container.appendChild(submitButton);

    let quitButton = document.createElement('button');
    quitButton.textContent = 'Quit';
    quitButton.style.marginTop = "10px";
    quitButton.style.backgroundColor = "#c70000";
    quitButton.style.color = "white";
    quitButton.onclick = quitQuiz;
    container.appendChild(quitButton);
}

function submitQuiz() {
    let correctCount = 0;
    let wrongAnswers = [];
    currentQuestions.forEach((item, index) => {
        let answerInput = document.getElementById(`answer${index}`);
        item.userAnswer = answerInput ? answerInput.value : '';
        if (item.userAnswer.toLowerCase() === item.answer.toLowerCase()) {
            correctCount++;
        } else {
            wrongAnswers.push({ question: item.question, correctAnswer: item.answer, userAnswer: item.userAnswer });
        }
    });
    showResults(correctCount, wrongAnswers);
}

function showResults(correctCount, wrongAnswers) {
    const overlay = document.querySelector('.overlay');
    overlay.innerHTML = '';
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    resultsContainer.style.overflowY = 'auto';
    resultsContainer.style.maxHeight = '80vh';
    resultsContainer.innerHTML = `<h1>Quiz Results</h1>
                                  <p>You got ${correctCount} out of ${currentQuestions.length} questions right.</p>
                                  <h2>Incorrect Answers</h2>`;
    wrongAnswers.forEach(wrong => {
        resultsContainer.innerHTML += `<div class="incorrect-answer">
                                           <h3>Question: ${wrong.question}</h3>
                                           <p>Your answer: ${wrong.userAnswer}</p>
                                           <p>Correct answer: ${wrong.correctAnswer}</p>
                                       </div>`;
    });
    resultsContainer.innerHTML += '<button onclick="restartQuiz()">Try Again</button>';
    overlay.appendChild(resultsContainer);
}

function restartQuiz() {
    document.body.removeChild(document.querySelector('.overlay'));
    document.getElementById('quiz-container').style.display = 'block';
}

function quitQuiz() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}
