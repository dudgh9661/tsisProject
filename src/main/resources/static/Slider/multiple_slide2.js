var slides2 = document.querySelector('.slides2'),
    slide2 = document.querySelectorAll('.slides2 li'),
    currentIdx2 = 0,
    slideCount2 = slide2.length,
    slideWidth2 = 200,
    slideMargin2 = 30,
    prevBtn2 = document.querySelector('.prev2'),
    nextBtn2 = document.querySelector('.next2');

slides2.style.width = (slideWidth2 + slideMargin2) * slideCount2 - slideMargin2 + 'px';

function moveSlide2(num2) {
    slides2.style.left = -num2 * 230 + 'px'
    currentIdx2 = num2;
}

nextBtn2.addEventListener('click', function () {
    if (currentIdx2 < slideCount2 - 5) {
        moveSlide2(currentIdx2 + 1);

    } else {
        moveSlide2(0);
    }

});

prevBtn2.addEventListener('click', function () {
    if (currentIdx2 > 0) {
        moveSlide2(currentIdx2 - 1);
    } else {
        moveSlide2(slideCount2 - 5);
    }

});