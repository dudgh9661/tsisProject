var slides3 = document.querySelector('.slides3'),
    slide3 = document.querySelectorAll('.slides3 li'),
    currentIdx3 = 0,
    slideCount3 = slide3.length,
    slideWidth3 = 200,
    slideMargin3 = 30,
    prevBtn3 = document.querySelector('.prev3'),
    nextBtn3 = document.querySelector('.next3');

slides3.style.width = (slideWidth3 + slideMargin3) * slideCount3 - slideMargin3 + 'px';

function moveSlide3(num3) {
    slides3.style.left = -num3 * 230 + 'px'
    currentIdx3 = num3;
}

nextBtn3.addEventListener('click', function () {
    if (currentIdx3 < slideCount3 - 5) {
        moveSlide3(currentIdx3 + 1);

    } else {
        moveSlide3(0);
    }

});

prevBtn3.addEventListener('click', function () {
    if (currentIdx3 > 0) {
        moveSlide3(currentIdx3 - 1);
    } else {
        moveSlide3(slideCount3 - 5);
    }

});