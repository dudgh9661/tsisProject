let academyCategory = document.querySelector(".academy-option__academy");
let subjectCategory = document.querySelector(".academy-option__subject");
let academyId = [];
let subjectId = [];

let isInit = true;

let courseList = document.querySelector(".academy-result");
let lectureId = [];
let totalCourseNumber = 0;
let columnName = "";

let pageNum = 1;
let maxPageNum = 0;

// 서버 요청
function requestCategoryAPI(url, done, academyId) {
    $.ajax({
        type: "GET",
        url: "js/" + url + "?academyId=" + academyId + "&subjectId=" + subjectId,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// academy 요청
requestCategoryAPI("test11.json", (response) => {
    for (const option of response['academy']) {
        $(academyCategory).append("<option>" + option['academy_name'] + "</option>");
        academyId.push(option['academy_id']);
    }
    $(".academy-bottom-note").children("div")[0].innerHTML = response['academy'][0]['academy_loc'];
    requestSubjectCategory(academyId[0]);
})

// subject 요청 Method
function requestSubjectCategory(academyId) {
    requestCategoryAPI("test12.json", (response) => {
        $(subjectCategory).children().remove().end();
        subjectId.length = 0;
        for (const option of response['subject']) {
            $(subjectCategory).append("<option>" + option['academy_skill'] + "</option>");
            subjectId.push(option['subject_id']);
        }
        if (isInit) {
            requestCourseList(academyId[0], subjectId[0]);
        }
    }, academyId);
}

function requestListAPI(url, done, academyId, subjectId, pageNum, columnName) {
    $.ajax({
        type: "GET",
        url: "js/" + url + "?academyId=" + academyId + "&subjectId=" + subjectId + "&pageNum=" + pageNum + "&columnName=" + columnName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function setTotalCourseNumber(response) {
    totalCourseNumber = response['total_course'];
    $(".academy-result__title")[0].innerHTML = "총 " + totalCourseNumber + "개 검색";
}

function setCourseList(response) {
    $(courseList).children().slice(2).remove().end();
    lectureId.length = 0;
    for (const lecture of response['lecture_list']) {
        lectureId.push(lecture['lecture_id']);

        let list = [];

        let best = "";
        let wish = "<img class='academy-icon-sm' src='../../../static/img/empty-heart.png'>";
        let index = response['lecture_list'].indexOf(lecture) + 1;
        let online = "온라인";
        let urlImage = "<img class='academy-icon-sm' src='../../../static/img/link.png'>";
        let url = "<a href='" + lecture['lecture_url'] + "' target='_blank'>" + urlImage;
        if (lecture['lecture_best_yn'] === true) {
            best = "<img class='academy-icon-sm' src='../../../static/img/star.svg'>"
        }
        if (lecture['wish_yn'] === true) {
            wish = "<img class='academy-icon-sm' src='../../../static/img/full-heart.png'>";
        }
        if (lecture['online_yn'] === false) {
            online = "오프라인";
        }
        list.push("<div>" + best + "</div>");
        list.push("<div>" + wish + "</div>");
        list.push("<span>" + index + "</span>");
        list.push("<span>" + lecture['lecture_category'] + "</span>");
        list.push("<span>" + lecture['lecture_title'] + "</span>");
        list.push("<span>" + online + "</span>");
        list.push(url + "</a>");

        $(courseList).append("<li>" + list + "</li>");
    }
}

function setPagination(start) {
    if ((start - 1) / 5 == 0) {
        $(".academy-pagination div:first-child img").css("display", "none");
    }
    else {
        $(".academy-pagination div:first-child img").css("display", "block");
    }
    if (start + 4 >= maxPageNum) {
        $(".academy-pagination div:last-child img").css("display", "none");
    }
    else {
        $(".academy-pagination div:last-child img").css("display", "block");
    }
    $(".academy-pagination__number").children().remove().end();
    let end = start + 4;
    if (end > maxPageNum) {
        end = maxPageNum;
    }
    for (let i = start; i <= end; i++) {
        $(".academy-pagination__number").append("<li>" + i + "</li>");
    }
}

function requestCourseList(academyId, subjectId, pageNum, columnName = "") {
    requestListAPI("test13.json", (response) => {
        setTotalCourseNumber(response);
        setCourseList(response);
        maxPageNum = response['max_page'];
        setPagination(1);
    }, academyId, subjectId, pageNum, columnName);
    isInit = false;
}

// academy 클릭 Event
academyCategory.addEventListener("change", (event) => {
    requestSubjectCategory(academyId[event.target.selectedIndex]);
});

// subject 클릭 Event
subjectCategory.addEventListener("change", (event) => {
    requestCourseList(academyId[$(".subject-option__academy option:selected").index()], subjectId[event.target.selectedIndex], 1);
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
    if (event.target.className === "academy-icon-sm") {
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
$(".academy-result__column--course-name").click(function() {
    columnName = "lec.lecture_title";
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});
$(".academy-result__column--academy-name").click(function() {
    columnName = "acdm.academy_name";
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});
$(".academy-result__column--is-online").click(function() {
    columnName = "lec.online_yn";
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});

// 페이지
$(".academy-pagination__number *").click(function() {
    pagaeNum = $(this).text();
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});

$(".academy-pagination div:first-child img").click(function() {
    pageNum = (((pageNum - 1) / 5) - 1) * 5 + 1;
    setPagination(pageNum);
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});

$(".academy-pagination div:last-child img").click(function() {
    pageNum = (((pageNum - 1) / 5) + 1) * 5 + 1;
    setPagination(pageNum);
    requestCourseList(academyId[$(".academy-option__academy option:selected").index()], subjectId[$(".academy-option__subject option:selected").index()], pageNum, columnName);
});