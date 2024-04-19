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
