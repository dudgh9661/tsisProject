let largeCategory = document.querySelector(".subject-option__large");
let mediumCategory = document.querySelector(".subject-option__medium");
let smallCategory = document.querySelector(".subject-option__small");
let categoryIdList = [];

let selectedAdvanced = document.querySelector(".subject-option__level--advanced");
let selectedBasic = document.querySelector(".subject-option__level--basic");
let selectedElective = document.querySelector(".subject-option__level--elective");

let lectureList = document.querySelector(".subject-result");
let columnName = "lec.lecture_title";

let pageNum = 1 ;
let maxPageNum = 0;

function requestMediumCategoryAPI(url, done, largeCategoryName) {
    $.ajax({
        type: "GET",
        url: url + "?depth1Field=" + largeCategoryName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// 중분류 요청 Method
function requestMediumCategory(largeCategoryName, isInit) {
    requestMediumCategoryAPI("/categoryByLecture/middleCategoryKinds", (response) => {
        $(mediumCategory).children().remove().end();
        for (const option of response) {
            $(mediumCategory).append("<option>" + option['depth2Skill'] + "</option>");
        }
        requestSmallCategory(largeCategoryName, mediumCategory.children[0].text, isInit);
    }, largeCategoryName);
}

function requestSmallCategoryAPI(url, done, largeCategoryName, mediumCategoryName) {
    $.ajax({
        type: "GET",
        url: url + "?depth1Field=" + largeCategoryName + "&depth2Skill=" + mediumCategoryName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// 소분류 요청 Method
function requestSmallCategory(largeCategoryName, mediumCategoryName, isInit) {
    requestSmallCategoryAPI("/categoryByLecture/subclassKinds", (response) => {
        $(smallCategory).children().remove().end();
        categoryIdList.length = 0;
        for (const option of response) {
            $(smallCategory).append("<option>" + option['depth3Course'] + "</option>");
            categoryIdList.push(option['categoryId']);
        }
        if (isInit) {
            selectLevelAll();
            requestLevelNumber(categoryIdList[0]);
            setPage(1);
            setPagination(pageNum);
            requestLectureList(categoryIdList[0], pageNum, columnName);
        }
    }, largeCategoryName, mediumCategoryName);
}
requestMediumCategory(largeCategory.children[0].text, true);

function selectLevelAll() {
    selectedAdvanced.children[0].checked = true;
    selectedBasic.children[0].checked = true;
    selectedElective.children[0].checked = true;
    $(selectedAdvanced.children[2]).css("display", "none");
    $(selectedBasic.children[2]).css("display", "none");
    $(selectedElective.children[2]).css("display", "none");
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
        url: url + "?categoryId=" + categoryId + "&pageNum=" + pageNum + "&levelList=" + levelToList() + "&columnName=" + columnName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
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

function setLevelNumber(response) {
    let basic = 0;
    let advanced = 0;
    let elective = 0;
    for (const level of response) {
        if (level['eduLevel'] === "전문과정") {
            basic = level['lectureNum'];
        }
        else if (level['eduLevel'] === "기본과정") {
            advanced = level['lectureNum'];
        }
        else if (level['eduLevel'] === "선택과정") {
            elective = level['lectureNum'];
        }
    }
    $(selectedAdvanced).children("span")[0].innerHTML = "전문과정 " + advanced + "개 조회가능";
    $(selectedAdvanced).children("span")[0].value = advanced;
    $(selectedBasic).children("span")[0].innerHTML = "기본과정 " + basic + "개 조회가능";
    $(selectedBasic).children("span")[0].value = basic;
    $(selectedElective).children("span")[0].innerHTML = "선택과정 " + elective + "개 조회가능";
    $(selectedElective).children("span")[0].value = elective;
}

function requestLevelNumber(categoryId) {
    requestInitListAPI("/categoryByLecture/courseLevelKinds", (response) => {
        setLevelNumber(response);
    }, categoryId);
}

function setTotalLectureNumber(response) {
    totalLectureNumber = response['lectureNum'];
//    if (selectedAdvanced.children[0].checked === false) {
//        totalLectureNumber -= $(selectedAdvanced).children("span")[0].value;
//    }
//    console.log(totalLectureNumber, $(selectedAdvanced).children("span")[0].value, $(selectedBasic).children("span")[0].value, $(selectedElective).children("span")[0].value);
//    if (selectedBasic.children[0].checked === false) {
//        totalLectureNumber -= $(selectedBasic).children("span")[0].value;
//    }
//        console.log(totalLectureNumber, $(selectedAdvanced).children("span")[0].value, $(selectedBasic).children("span")[0].value, $(selectedElective).children("span")[0].value);
//    if (selectedElective.children[0].checked === false) {
//        totalLectureNumber -= $(selectedElective).children("span")[0].value;
//    }
//        console.log(totalLectureNumber, $(selectedAdvanced).children("span")[0].value, $(selectedBasic).children("span")[0].value, $(selectedElective).children("span")[0].value);
//    console.log($(selectedAdvanced).children("span")[0].value, $(selectedBasic).children("span")[0].value, $(selectedElective).children("span")[0].value)
    $(".subject-result__title")[0].innerHTML = "총 " + totalLectureNumber + "개 검색";
}

function setLectureList(response) {
    $(lectureList).children().slice(2).remove().end();
    for (const lecture of response['lectureList']) {
        let html = "";

        let best = "";
        let wish = "<img class='subject-icon-sm' src='/img/emptyHeart.png' onclick='wishClick(event)'>";
        let index = 20 * (pageNum - 1) + response['lectureList'].indexOf(lecture) + 1 ;
        let online = "온라인";
        let urlImage = "<img class='subject-icon-sm' src='/img/gotosite.png'>";
        let url = "<a href='" + lecture['lectureUrl'] + "' target='_blank'>" + urlImage;
        if (lecture['lectureBestYn'] === 1) {
            best = "<img class='subject-icon-sm' src='/img/star.svg'>"
        }
        if (lecture['wishBool'] === 1) {
            wish = "<img class='subject-icon-sm' src='/img/filledHeart.png' onclick='wishClick(event)'>";
        }
        if (lecture['onlineYn'] === 0) {
            online = "오프라인";
        }
        html += ("<div>" + best + "</div>");
        html += ("<div class='subject-result__wish'>" + wish + "</div>");
        html += ("<span>" + index + "</span>");
        html += ("<span>" + lecture['lectureTitle'] + "</span>");
        html += ("<span>" + lecture['academyName'] + "</span>");
        html += ("<span>" + online + "</span>");
        html += ("<span>" + lecture['academyLoc'] + "</span>");
        html += (url + "</a>");
        $(lectureList).append("<li value=" + lecture['lectureId'] + ">" + html + "</li>");
    }
}

function setPage(nextPage) {
    let prevPage = pageNum;
    pageNum = nextPage;
    $(".subject-pagination__number").children((prevPage - 1) % 5).css("background-color", "red");
    $(".subject-pagination__number").children((nextPage - 1) % 5).css("background-color", "yellow");
}

function setPagination(start) {
    if (start < 6) {
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
        $(".subject-pagination__number").append("<li onclick='pageNumberClick(event)'>" + i + "</li>");
    }
    let index = (start - 1) % 5;
    $(".subject-pagination__number li:nth-child(" + index + ")").css("background-color", "red");
}

function requestLectureList(categoryId, pageNum, columnName) {
    requestListAPI("/categoryByLecture/DuplicateCourseSelection", (response) => {
        setTotalLectureNumber(response);
        setLectureList(response);
        maxPageNum = response['totalPageNationNum'];
    }, categoryId, pageNum, columnName);
}

// 대분류 클릭 Event
largeCategory.addEventListener("change", (event) => {
    selectLevelAll();
    requestMediumCategory(event.target.value, false);
});

// 중분류 클릭 Event
mediumCategory.addEventListener("change", (event) => {
    selectLevelAll();
    requestSmallCategory($(".subject-option__large option:selected").text(), event.target.value, false);
});

// 소분류 클릭 Event
smallCategory.addEventListener("change", (event) => {
    selectLevelAll();
    requestLevelNumber(categoryIdList[event.target.selectedIndex]);
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[event.target.selectedIndex], pageNum, columnName);
});

// 수준별 클릭 Event
selectedAdvanced.addEventListener("click", () => {
    if (selectedAdvanced.children[0].checked === true) {
        $(selectedAdvanced.children[2]).css("display", "none");
    }
    else {
        $(selectedAdvanced.children[2]).css("display", "inline-block");
    }
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

selectedBasic.addEventListener("click", () => {
    if (selectedBasic.children[0].checked === true) {
        $(selectedBasic.children[2]).css("display", "none");
    }
    else {
        $(selectedBasic.children[2]).css("display", "inline-block");
    }
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

selectedElective.addEventListener("click", () => {
    if (selectedElective.children[0].checked === true) {
        $(selectedElective.children[2]).css("display", "none");
    }
    else {
        $(selectedElective.children[2]).css("display", "inline-block");
    }
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
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

function wishClick(event) {
    if (event.target.className === "subject-icon-sm") {
        if (event.target.src.includes("emptyHeart.png") === true) {
            event.target.src = "/img/filledHeart.png";
            requestWishAPI("/categoryByLecture/wishListSelection", () => {},
            $(lectureList).children()[Number(event.target.parentElement.parentElement.children[2].innerHTML) + 1].value, "true");
        }
        else if (event.target.src.includes("filledHeart.png") === true) {
            event.target.src = "/img/emptyHeart.png";
            requestWishAPI("/categoryByLecture/wishListSelection", () => {},
            $(lectureList).children()[Number(event.target.parentElement.parentElement.children[2].innerHTML) + 1].value, "false");
        }
    }
}

// 컬럼 클릭시 정렬된 리스트 요청
$(".subject-result__column--course-name").click(function() {
    columnName = "lec.lecture_title";
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});
$(".subject-result__column--academy-name").click(function() {
    columnName = "acdm.academy_name";
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});
$(".subject-result__column--is-online").click(function() {
    columnName = "lec.online_yn";
    setPage(1);
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

// 페이지
function pageNumberClick(event) {
//    event.target.style.backgroundColor = "#0094d4";
    pageNum = event.target.innerHTML;
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
}

$(".subject-pagination div:first-child img").click(function() {
    pageNum = (Math.floor((pageNum - 1) / 5) - 1) * 5 + 1;
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});

$(".subject-pagination div:last-child img").click(function() {
    pageNum = (Math.floor((pageNum - 1) / 5) + 1) * 5 + 1;
    setPagination(pageNum);
    requestLectureList(categoryIdList[$(".subject-option__small option:selected").index()], pageNum, columnName);
});