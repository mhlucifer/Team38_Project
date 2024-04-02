 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: false
 });

jQuery(document).ready(function($) {

	"use strict";

	
	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	

	var siteCarousel = function () {
		if ( $('.nonloop-block-13').length > 0 ) {
			$('.nonloop-block-13').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 20,
		    smartSpeed: 1000,
		    autoplay: true,
		    nav: true,
		    dots: true,
		    responsive:{
	        600:{
	        	margin: 20,
	        	nav: true,
	          items: 1
	        },
	        1000:{
	        	margin: 20,
	        	stagePadding: 0,
	        	nav: true,
	          items: 1
	        }
		    }
			});
			$('.custom-next').click(function(e) {
				e.preventDefault();
				$('.nonloop-block-13').trigger('next.owl.carousel');
			})
			$('.custom-prev').click(function(e) {
				e.preventDefault();
				$('.nonloop-block-13').trigger('prev.owl.carousel');
			})

			
		}

		$('.slide-one-item').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
			stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1500,
	    autoplay: true,
	    pauseOnHover: false,
	    dots: true,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
	  });

	  if ( $('.owl-all').length > 0 ) {
			$('.owl-all').owlCarousel({
		    center: false,
		    items: 1,
		    loop: false,
				stagePadding: 0,
		    margin: 0,
		    autoplay: false,
		    nav: false,
		    dots: true,
		    touchDrag: true,
  			mouseDrag: true,
  			smartSpeed: 1000,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        768:{
	        	margin: 30,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	          items: 1
	        },
	        992:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        },
	        1200:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: false,
	        	responsiveRefreshRate: 10,
	        	touchDrag: false,
  					mouseDrag: false,
	          items: 3
	        }
		    }
			});
		}
		
	};
	siteCarousel();

	

	var siteCountDown = function() {

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	// siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');

   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 50
      }, 600, 'easeInOutExpo', function() {
        // window.location.hash = hash;

      });

    });
  };
  OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
  siteScroll();

  // Stellar
  $(window).stellar({
  	horizontalScrolling: false,
    responsive: true,
  });


  var counter = function() {
		
		$('#about-section').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number > span').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();



});


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



//
 document.getElementById('start-quiz').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username.length > 0) {
    document.getElementById('start-section').style.display = 'none'; // 隐藏开始部分
    document.getElementById('quiz-section').style.display = 'block'; // 显示测验部分
    renderCurrentQuestion(); // 显示第一个问题
  } else {
    alert('请输入一个名字。');
  }
});

const quizQuestions = [
    { type: 'multiple-choice', question: '3 + 4 = ?', choices: ['5', '6', '7', '8'], correctAnswer: '7' },
    { type: 'text', question: '2 * 5 = ?', correctAnswer: '10' },
    { type: 'multiple-choice', question: '8 - 3 = ?', choices: ['3', '4', '5', '6'], correctAnswer: '5' },
    // 可以在这里添加更多问题
];

let currentQuestionIndex = 0;
let score = 0;

// Render the current question
function renderCurrentQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz');
    if (q.type === 'multiple-choice') {
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <p>${q.question}</p>
                ${q.choices.map(choice => `
                    <label>
                        <input type="radio" name="answer" value="${choice}">
                        ${choice}
                    </label>
                `).join('')}
            </div>
        `;
    } else if (q.type === 'text') {
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <p>${q.question}</p>
                <input type="text" id="answer" placeholder="你的答案">
            </div>
        `;
    }
}

// Get the selected answer
function getSelectedAnswer() {
    if (quizQuestions[currentQuestionIndex].type === 'multiple-choice') {
        const radios = document.getElementsByName('answer');
        for (let radio of radios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return null; // 如果没有选择任何选项
    } else {
        return document.getElementById('answer').value;
    }
}

// Start quiz event
document.getElementById('start-quiz').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (username.length > 0) {
        document.getElementById('start-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        renderCurrentQuestion();
    } else {
        alert('请输入你的名字。');
    }
});

// Next question event
document.getElementById('next').addEventListener('click', () => {
    const userAnswer = getSelectedAnswer();
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    if (userAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderCurrentQuestion();
    } else {
        const username = document.getElementById('username').value;
        // 这里假设 quiz-section 已经包括 next 按钮和 quiz
        document.getElementById('quiz-section').style.display = 'none'; // 隐藏包括问题和下一题按钮的整个区域
        // 显示最终结果
		const finalScore = document.getElementById('final-score');
        finalScore.style.display = 'block'; // 确保结果区域是可见的
        finalScore.innerHTML = `${username}的得分是：${score} / ${quizQuestions.length}`;

    }
});
