let largeCategory = document.querySelector(".subject-option__large");
let mediumCategory = document.querySelector(".subject-option__medium");
let smallCategory = document.querySelector(".subject-option__small");
let categoryId = [];

let isInit = true;

let selectedAdvanced = document.querySelector(".subject-option__level--advanced");
let selectedBasic = document.querySelector(".subject-option__level--basic");
let selectedElective = document.querySelector(".subject-option__level--elective");

let courseList = document.querySelector(".subject-result");
let lectureId = [];
let totalCourseNumber = 0;
let columnName = "";

let pageNum = 1;
let maxPageNum = 0;

// 서버 요청
function requestCategoryAPI(url, done, largeCategoryName, mediumCategoryName, smallCategoryName) {
    $.ajax({
        type: "GET",
        url: "js/" + url + "?largeCategoryName=" + largeCategoryName + "&mediumCategoryName=" + mediumCategoryName + "&smallCategoryName=" + smallCategoryName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// 대분류 요청
requestCategoryAPI("test1.json", (response) => {
    for (const option of response['lecture_category']) {
        $(largeCategory).append("<option>" + option['depth1_field'] + "</option>");
    }
    // 1. 대분류 첫번째 이름을 parameter로 전달
    requestMediumCategory(response.lecture_category[0].depth1_field);
})

// 중분류 요청 Method
function requestMediumCategory(largeCategoryName) {
    requestCategoryAPI("test2.json", (response) => {
        // 1. 중분류 데이터 추가
        $(mediumCategory).children().remove().end();
        for (const option of response['lecture_category']) {
            $(mediumCategory).append("<option>" + option['depth2_skill'] + "</option>");
        }
        requestSmallCategory(largeCategoryName, response.lecture_category[0].depth2_skill);
    }, largeCategoryName);
}

// 소분류 요청 Method
function requestSmallCategory(largeCategoryName, mediumCategoryName) {
    requestCategoryAPI("test3.json", (response) => {
        // 1. 소분류 데이터 추가
        $(smallCategory).children().remove().end();
        categoryId.length = 0;
        for (const option of response['lecture_category']) {
            $(smallCategory).append("<option>" + option['depth3_course'] + "</option>");
            categoryId.push(option['category_id']);
        }
        if (isInit) {
            selectLevelAll();
            requestLevelNumber(categoryId[response.lecture_category[0].depth3_course]);
            requestCourseList(categoryId[response.lecture_category[0].depth3_course]);
        }
    }, largeCategoryName, mediumCategoryName);
}

function selectLevelAll() {
    selectedAdvanced.children[0].checked = true;
    selectedBasic.children[0].checked = true;
    selectedElective.children[0].checked = true;
}

function levelToList() {
    levelList = [
        Number(selectedAdvanced.children[0].checked),
        Number(selectedBasic.children[0].checked),
        Number(selectedElective.children[0].checked)
    ];
    return levelList;
}

function requestListAPI(url, done, categoryId, pageNum, columnName) {
    $.ajax({
        type: "GET",
        url: "js/" + url + "?categoryId=" + categoryId + "&pageNum=" + pageNum + "&levelList=" + levelToList() + "&columnName=" + columnName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function setLevelNumber(response) {
    $(selectedAdvanced).children("span")[0].innerHTML = "전문과정 " + response['education_level'][2]['lecture_num'] + "개 조회가능";
    $(selectedBasic).children("span")[0].innerHTML = "기본과정 " + response['education_level'][2]['lecture_num'] + "개 조회가능";
    $(selectedElective).children("span")[0].innerHTML = "선택과정 " + response['education_level'][2]['lecture_num'] + "개 조회가능";
}

function requestLevelNumber(categoryId) {
    requestListAPI("test4.json", (response) => {
        setLevelNumber(response);
    }, categoryId);
}

function setTotalCourseNumber(response) {
    totalCourseNumber = response['total_course'];
    $(".subject-result__title")[0].innerHTML = "총 " + totalCourseNumber + "개 검색";
}

function setCourseList(response) {
    $(courseList).children().slice(2).remove().end();
    lectureId.length = 0;
    for (const lecture of response['lecture_list']) {
        lectureId.push(lecture['lecture_id']);

        let list = [];

        let best = "";
        let wish = "<img class='subject-icon-sm' src='../../../static/img/empty-heart.png'>";
        let index = response['lecture_list'].indexOf(lecture) + 1;
        let online = "온라인";
        let urlImage = "<img class='subject-icon-sm' src='../../../static/img/link.png'>";
        let url = "<a href='" + lecture['lecture_url'] + "' target='_blank'>" + urlImage;
        if (lecture['lecture_best_yn'] === true) {
            best = "<img class='subject-icon-sm' src='../../../static/img/star.svg'>"
        }
        if (lecture['wish_yn'] === true) {
            wish = "<img class='subject-icon-sm' src='../../../static/img/full-heart.png'>";
        }
        if (lecture['online_yn'] === false) {
            online = "오프라인";
        }
        list.push("<div>" + best + "</div>");
        list.push("<div>" + wish + "</div>");
        list.push("<span>" + index + "</span>");
        list.push("<span>" + lecture['lecture_title'] + "</span>");
        list.push("<span>" + lecture['academy_name'] + "</span>");
        list.push("<span>" + online + "</span>");
        list.push("<span>" + lecture['academy_loc'] + "</span>");
        list.push(url + "</a>");

        $(courseList).append("<li>" + list + "</li>");
    }
}

function setPagination(start) {
    if ((start - 1) / 5 == 0) {
        $(".subject-pagination div:first-child img").css("display", "none");
    }
    else {
        $(".subject-pagination div:first-child img").css("display", "block");
    }
    if (start + 4 >= maxPageNum) {
        $(".subject-pagination div:last-child img").css("display", "none");
    }
    else {
        $(".subject-pagination div:last-child img").css("display", "block");
    }
    $(".subject-pagination__number").children().remove().end();
    let end = start + 4;
    if (end > maxPageNum) {
        end = maxPageNum;
    }
    for (let i = start; i <= end; i++) {
        $(".subject-pagination__number").append("<li>" + i + "</li>");
    }
}

function requestCourseList(categoryId, pageNum, columnName = "") {
    requestListAPI("test5.json", (response) => {
        setTotalCourseNumber(response);
        setCourseList(response);
        maxPageNum = response['max_page'];
        setPagination(1);
    }, categoryId, pageNum, columnName);
    isInit = false;
}

// 대분류 클릭 Event
largeCategory.addEventListener("change", (event) => {
    requestMediumCategory(event.target.value);
});

// 중분류 클릭 Event
mediumCategory.addEventListener("change", (event) => {
    requestSmallCategory($(".subject-option__large option:selected").text(), event.target.value);
});

// 소분류 클릭 Event
smallCategory.addEventListener("change", (event) => {
    requestLevelNumber(categoryId[event.target.selectedIndex]);
    requestCourseList(categoryId[event.target.selectedIndex], 1);
});

// 수준별 클릭 Event
selectedAdvanced.addEventListener("click", () => {
    if (selectedAdvanced.children[0].checked === true) {
        $(selectedAdvanced.children[2]).css("display", "none");
    }
    else {
        $(selectedAdvanced.children[2]).css("display", "inline-block");
    }
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], 1);
});

selectedBasic.addEventListener("click", () => {
    if (selectedBasic.children[0].checked === true) {
        $(selectedBasic.children[2]).css("display", "none");
    }
    else {
        $(selectedBasic.children[2]).css("display", "inline-block");
    }
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], 1);
});

selectedElective.addEventListener("click", () => {
    if (selectedElective.children[0].checked === true) {
        $(selectedElective.children[2]).css("display", "none");
    }
    else {
        $(selectedElective.children[2]).css("display", "inline-block");
    }
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], 1);
});

function requestWishAPI(url, done, lectureId, wishTo) {
    $.ajax({
        type: "PUT",
        url: "js/" + url + "?lecturedId=" + lectureId + "&wishTo=" + wishTo,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

$(document).click(function(event) {
    if (event.target.className === "subject-icon-sm") {
        if (event.target.src.includes("empty-heart.png") === true) {
            event.target.src = "../../../static/img/full-heart.png";
            requestWishAPI("test6.json", () => {}, lectureId[event.target.parentElement.parentElement.children[2].innerHTML - 1], true);
        }
        else if (event.target.src.includes("full-heart.png") === true) {
            event.target.src = "../../../static/img/empty-heart.png";
            requestWishAPI("test6.json", () => {}, lectureId[event.target.parentElement.parentElement.children[2].innerHTML - 1], false);
        }
    }
});

// 컬럼 클릭시 정렬된 리스트 요청
$(".subject-result__column--course-name").click(function() {
    columnName = "lec.lecture_title";
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});
$(".subject-result__column--academy-name").click(function() {
    columnName = "acdm.academy_name";
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});
$(".subject-result__column--is-online").click(function() {
    columnName = "lec.online_yn";
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

// 페이지
$(".subject-pagination__number *").click(function() {
    pagaeNum = $(this).text();
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

$(".subject-pagination div:first-child img").click(function() {
    pageNum = (((pageNum - 1) / 5) - 1) * 5 + 1;
    setPagination(pageNum);
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

$(".subject-pagination div:last-child img").click(function() {
    pageNum = (((pageNum - 1) / 5) + 1) * 5 + 1;
    setPagination(pageNum);
    requestCourseList(categoryId[$(".subject-option__small option:selected").index()], pageNum, columnName);
});