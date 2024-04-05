
function changeHeroContent() {
  // 设置新的内容
  var newTitle = "Join Our Community";
  var newHeading = "Explore Our Events";
  var newText = "Discover events for kids and family";
  var newImageSrc = "/static/images/img_1.jpg"; //

  // 更新内容
  $('#hero-title').text(newTitle);
  $('#hero-heading').text(newHeading);
  $('#hero-text').text(newText);
  $('#hero-image').attr('src', newImageSrc);
}


const quizData = {
  "location": [
    { question: "Cane toads prefer………..,……. areas.", answer: "" }, // 答案需要您根据实际情况填写
    { question: "Cane toads thrive in …………………….", answer: "" },
    { question: "Cane toads are the most common in ……………….", answer: "" },
    { question: "Cane toads are commonly found in habitats such as ……., ……….. and urban areas.", answer: "" },
    { question: "Cane toads prefer access to water for ………. and reproduction.", answer: "" }
  ],
  "behaviour": [
    { question: "Cane toads are………… animals, they are the most active during the night.", answer: "" },
    { question: "Cane toads prefer the night time because of …………… temperatures and ………….. moisture levels.", answer: "" },
    { question: "Male cane toads produce unique ………… to attract the females. These calls on dependent on the cane toad’s …………, ……….. and …………… conditions.", answer: "" },
    { question: "Cane toad mating generally happens in …………… locations.", answer: "" },
    { question: "Female cane toads prefer male cane toads with ………. and ……….. calls.", answer: "" },
    { question: "Female cane toads deposit their ………………. eggs in ………………….", answer: "" },
    { question: "Cane toads ………… jump long distances.", answer: "" },
    { question: "Cane toads stay close to the ………………….", answer: "" },
    { question: "Being active in the night, cane toads are able to reduce their risk of ………… and ……….. conditions.", answer: "" },
    { question: "Cane toads exhibit ……….. behaviours during mating.", answer: "" }
  ]
};



// location quiz
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前问题索引为 0
    let currentQuestionIndex = 0;
    const userAnswers = [];

    // 绑定开始测试按钮的点击事件
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

    // 绑定下一题按钮的点击事件
    document.querySelector('.next').addEventListener('click', function() {
        const answerInput = document.querySelector('.answer');
        userAnswers[currentQuestionIndex] = answerInput.value.trim(); // 存储答案
        currentQuestionIndex++; // 增加问题索引

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
    // 如果是最后一个问题，更改按钮文本
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
    // 隐藏问题区域，显示结果
    document.querySelector('.quiz-section').style.display = 'none';
    const finalScoreElement = document.querySelector('.final-score');
    finalScoreElement.style.display = 'block';
    finalScoreElement.textContent = `Your Score：${score}/${quizData[quizType].length}`;
}


