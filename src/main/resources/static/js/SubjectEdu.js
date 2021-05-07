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
function requestCategoryAPI(url, done) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function requestLargeCategoryAPI(url, done, largeCategoryName) {
    $.ajax({
        type: "GET",
        url: url + "?depth1Field=" + largeCategoryName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function requestMediumCategoryAPI(url, done, largeCategoryName, mediumCategoryName) {
    $.ajax({
        type: "GET",
        url: url + "?depth1Field=" + largeCategoryName + "&depth2Skill" + mediumCategoryName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// 대분류 요청
requestCategoryAPI("/categoryByLecture/mainCategoryKinds", (response) => {
    for (const option of response['mainCategoryList']) {
        $(largeCategory).append("<option>" + option['depth1Field'] + "</option>");
    }
    // 1. 대분류 첫번째 이름을 parameter로 전달
    requestMediumCategory(response.mainCategoryList[0].depth1Field);
})

// 중분류 요청 Method
function requestMediumCategory(largeCategoryName) {
    requestLargeCategoryAPI("/categoryByLecture/middleCategoryKinds", (response) => {
        // 1. 중분류 데이터 추가
        $(mediumCategory).children().remove().end();
        for (const option of response['middleCategoryList']) {
            $(mediumCategory).append("<option>" + option['depth2Skill'] + "</option>");
        }
        requestSmallCategory(largeCategoryName, response.middleCategoryList[0].depth2Skill);
    }, largeCategoryName);
}

// 소분류 요청 Method
function requestSmallCategory(largeCategoryName, mediumCategoryName) {
    requestMediumCategoryAPI("/categoryByLecture/subclassKinds", (response) => {
        // 1. 소분류 데이터 추가
        $(smallCategory).children().remove().end();
        categoryId.length = 0;
        for (const option of response['subClassList']) {
            $(smallCategory).append("<option>" + option['depth3Course'] + "</option>");
            categoryId.push(option['categoryId']);
        }
        if (isInit) {
            selectLevelAll();
            requestLevelNumber(categoryId[response.subClassList[0].depth3Course]);
            requestCourseList(categoryId[response.subClassList[0].depth3Course]);
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

function requestInitListAPI(url, done, categoryId) {
    $.ajax({
        type: "GET",
        url: url + "?categoryId=" + categoryId,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function requestListAPI(url, done, categoryId, pageNum, columnName) {
    $.ajax({
        type: "GET",
        url: url + "?categoryId=" + categoryId + "&pageNum=" + pageNum + "&levelList=" + levelToList() + "&columnName=" + columnName,
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
    requestInitListAPI("/categoryByLecture/courseLevelKinds", (response) => {
        setLevelNumber(response);
    }, categoryId);
}

function setTotalCourseNumber(response) {
    totalCourseNumber = response['lectureNum'];
    $(".subject-result__title")[0].innerHTML = "총 " + totalCourseNumber + "개 검색";
}

function setCourseList(response) {
    $(courseList).children().slice(2).remove().end();
    lectureId.length = 0;
    for (const lecture of response['lectureList']) {
        lectureId.push(lecture['lectureId']);

        let list = [];

        let best = "";
        let wish = "<img class='subject-icon-sm' src='img/empty-heart.png'>";
        let index = response['lectureList'].indexOf(lecture) + 1;
        let online = "온라인";
        let urlImage = "<img class='subject-icon-sm' src='img/link.png'>";
        let url = "<a href='" + lecture['lectureUrl'] + "' target='_blank'>" + urlImage;
        if (lecture['lectureBestYn'] === true) {
            best = "<img class='subject-icon-sm' src='img/star.svg'>"
        }
        if (lecture['wishBool'] === true) {
            wish = "<img class='subject-icon-sm' src='img/full-heart.png'>";
        }
        if (lecture['onlineYn'] === false) {
            online = "오프라인";
        }
        list.push("<div>" + best + "</div>");
        list.push("<div>" + wish + "</div>");
        list.push("<span>" + index + "</span>");
        list.push("<span>" + lecture['lectureTitle'] + "</span>");
        list.push("<span>" + lecture['academyName'] + "</span>");
        list.push("<span>" + online + "</span>");
        list.push("<span>" + lecture['academyLoc'] + "</span>");
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
    requestListAPI("/categoryByLecture/DuplicateCourseSelection", (response) => {
        setTotalCourseNumber(response);
        setCourseList(response);
        maxPageNum = response['totalPageNationNum'];
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
        type: "GET",
        url: url + "?lectureId=" + lectureId + "&wishYn=" + wishTo,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

$(document).click(function(event) {
    if (event.target.className === "subject-icon-sm") {
        if (event.target.src.includes("empty-heart.png") === true) {
            event.target.src = "img/full-heart.png";
            requestWishAPI("/categoryByLecture/wishListSelection", () => {}, lectureId[event.target.parentElement.parentElement.children[2].innerHTML - 1], true);
        }
        else if (event.target.src.includes("full-heart.png") === true) {
            event.target.src = "img/empty-heart.png";
            requestWishAPI("/categoryByLecture/wishListSelection", () => {}, lectureId[event.target.parentElement.parentElement.children[2].innerHTML - 1], false);
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