let academyCategory = document.querySelector(".academy-option__academy");
let subjectCategory = document.querySelector(".academy-option__subject");

let lectureList = document.querySelector(".academy-result");
let columnName = "lec.lecture_title";

let pageNum = 1;
let maxPageNum = 0;

function requestSubjectCategoryAPI(url, done, academyId) {
    $.ajax({
        type: "GET",
        url: url + "?academyId=" + academyId,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

// subject 요청 Method
function requestSubjectCategory(academyId, isInit) {
    requestSubjectCategoryAPI("/trainingByInstitution/topicList", (response) => {
        $(subjectCategory).children().remove().end();
        for (const option of response) {
            $(subjectCategory).append("<option value=" + option['academySubjectId'] + ">" + option['academySkill'] + "</option>");
        }
        $(".academy-bottom-note").children("div")[0].innerHTML = $(".academy-option__academy option:selected").attr("location");
        if (isInit) {
            requestLectureList(academyCategory.children[0].value, subjectCategory.children[0].value, pageNum, columnName);
        }
    }, academyId);
}

requestSubjectCategory(academyCategory.children[0].value, true);

function requestListAPI(url, done, academyId, subjectId, pageNum, columnName) {
    $.ajax({
        type: "GET",
        url: url + "?academyId=" + academyId + "&academySubjectId=" + subjectId + "&pageNum=" + pageNum + "&columnName=" + columnName,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
    }).done(done).fail((error) => {
        alert(JSON.stringify(error));
    });
}

function setTotalLectureNumber(response) {
    $(".academy-result__title")[0].innerHTML = "총 " + response['lectureNum'] + "개 검색";
}

function setLectureList(response) {
    $(lectureList).children().slice(2).remove().end();
    for (const lecture of response['lectureList']) {
        let html = "";

        let best = "";
        let wish = "<img class='academy-icon-sm' src='/img/emptyHeart.png' onclick='wishClick(event)'>";
        let index = 20 * (pageNum - 1) + response['lectureList'].indexOf(lecture) + 1 ;
        let online = "온라인";
        let urlImage = "<img class='academy-icon-sm' src='/img/gotosite.png'>";
        let url = "<a href='" + lecture['lectureUrl'] + "' target='_blank'>" + urlImage;
        if (lecture['lectureBestYn'] === 1) {
            best = "<img class='academy-icon-sm' src='/img/star.svg'>"
        }
        if (lecture['wishBool'] === 1) {
            wish = "<img class='academy-icon-sm' src='/img/filledHeart.png' onclick='wishClick(event)'>";
        }
        if (lecture['onlineYn'] === 0) {
            online = "오프라인";
        }
        html += ("<div>" + best + "</div>");
        html += ("<div>" + wish + "</div>");
        html += ("<span>" + index + "</span>");
        html += ("<span>" + lecture['depth2Skill'] + " > " + lecture['depth3Course'] + "</span>");
        html += ("<span>" + lecture['lectureTitle'] + "</span>");
        html += ("<span>" + online + "</span>");
        html += (url + "</a>");

        $(lectureList).append("<li value=" + lecture['lectureId'] + ">" + html + "</li>");
    }
}

function setPage(nextPage) {
    let prevPage = pageNum;
    pageNum = nextPage;
    $(".academy-pagination__number").children((prevPage - 1) % 5).css("background-color", "red");
    $(".academy-pagination__number").children((nextPage - 1) % 5).css("background-color", "yellow");
}

function setPagination(start) {
    if (start < 6) {
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
        $(".academy-pagination__number").append("<li onclick='pageNumberClick(event)'>" + i + "</li>");
    }
    let index = (start - 1) % 5;
    $(".academy-pagination__number li:nth-child(" + index + ")").css("background-color", "red");
}

function requestLectureList(academyId, subjectId, pageNum, columnName) {
    requestListAPI("/trainingByInstitution/trainingSearchResult", (response) => {
        setTotalLectureNumber(response);
        setLectureList(response);
        maxPageNum = response['totalPageNationNum'];
    }, academyId, subjectId, pageNum, columnName);
}

// academy 클릭 Event
academyCategory.addEventListener("change", (event) => {
    requestSubjectCategory(event.target.value, false);
});

// subject 클릭 Event
subjectCategory.addEventListener("change", (event) => {
    setPage(1);
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), event.target.value, pageNum, columnName);
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
    if (event.target.className === "academy-icon-sm") {
        if (event.target.src.includes("emptyHeart.png") === true) {
            event.target.src = "/img/filledHeart.png";
            requestWishAPI("/trainingByInstitution/wishListSelection", () => {},
            $(lectureList).children()[Number(event.target.parentElement.parentElement.children[2].innerHTML) + 1].value, "true");
        }
        else if (event.target.src.includes("filledHeart.png") === true) {
            event.target.src = "/img/emptyHeart.png";
            requestWishAPI("/trainingByInstitution/wishListSelection", () => {},
            $(lectureList).children()[Number(event.target.parentElement.parentElement.children[2].innerHTML) + 1].value, "false");
        }
    }
}

// 컬럼 클릭시 정렬된 리스트 요청
$(".academy-result__column--course-name").click(function() {
    columnName = "lec.lecture_title";
    setPage(1);
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val() , pageNum, columnName);
});
$(".academy-result__column--academy-name").click(function() {
    columnName = "acdm.academy_name";
    setPage(1);
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val(), pageNum, columnName);
});
$(".academy-result__column--is-online").click(function() {
    columnName = "lec.online_yn";
    setPage(1);
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val(), pageNum, columnName);
});

// 페이지
function pageNumberClick(event) {
//    event.target.style.backgroundColor = "#0094d4";
    pageNum = event.target.innerHTML;
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val(), pageNum, columnName);
}

$(".academy-pagination div:first-child img").click(function() {
    pageNum = (Math.floor((pageNum - 1) / 5) - 1) * 5 + 1;
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val(), pageNum, columnName);
});

$(".academy-pagination div:last-child img").click(function() {
    pageNum = (Math.floor((pageNum - 1) / 5) + 1) * 5 + 1;
    setPagination(pageNum);
    requestLectureList($(".academy-option__academy option:selected").val(), $(".academy-option__subject option:selected").val(), pageNum, columnName);
});