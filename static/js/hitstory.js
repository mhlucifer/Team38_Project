// JavaScript代码
window.addEventListener('scroll', function () {
    // Get all navigation items and content areas
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.drawerbox a');
    const mainPageLink = document.querySelector('a[href="#img-one"]');

    let current = '';
    // Set the initial state for the "Main Page" link
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
                    selectors.item.last().addClass(selectors.activeClass);
                } else if (pos <= max - 10 && pos >= min) {
                    selectors.item.removeClass(selectors.activeClass);
                    $(this).addClass(selectors.activeClass);
                }
            });
        });
    };
})(jQuery);

$("#shell").timeline();



window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.item');
    const navLinks = document.querySelectorAll('.sidebar a');
    const buffer = 200; // Set a buffer
    let currentActiveId = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top; // Position relative to the window
        const sectionHeight = section.getBoundingClientRect().height;

        //Activated when the top of the section enters the viewport and takes the buffer into account
        if (sectionTop <= buffer && sectionTop + sectionHeight >= 0) {
            currentActiveId = section.getAttribute('id');
        }
    });

    //Update highlight status
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentActiveId) {
            link.classList.add('active');
        }
    });
});
