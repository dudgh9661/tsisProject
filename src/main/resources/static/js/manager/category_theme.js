/* ---------------------------------------------------- base code */
const appendOption = (e1, arr) => {
    e1.innerHTML = "";
    let cnt = 1;
    arr.forEach((e2) => {
        const temp = document.createElement("tr");
        const best = document.createElement("td");
        if(e2.lectureBestYn == 0) {
            best.innerText = "N";
        } else {
            best.innerText = "Y";
        }

        const count = document.createElement("td");
        count.innerText = cnt++;

        const cat = document.createElement("td");
        cat.innerText = e2.depth1Field + ">" + e2.depth2Skill + ">" + e2.depth3Course;

        const lectureName = document.createElement("td");
        lectureName.innerText = e2.lectureTitle;

        const academyName = document.createElement("td");
        academyName.innerText = e2.academyName;
        academyName.setAttribute("data-id", e2.lectureId);

        const online = document.createElement("td");
        if(e2.onlineYn == 0) {
            online.innerText = "N";
        } else {
            online.innerText = "Y";
        }

        const loc = document.createElement("td");
        loc.innerText = e2.academyLoc;

        temp.appendChild(best);
        temp.appendChild(count);
        temp.appendChild(cat);
        temp.appendChild(lectureName);
        temp.appendChild(academyName);
        temp.appendChild(online);
        temp.appendChild(loc);
        e1.appendChild(temp);
    });
};
/*  base code ----------------------------------------------------*/

// load
$(function () {
    $.ajax({
        url: "/category/getDepth1",
        method: "GET",
        contentType: "application/json",
        success: function (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<div class='category_list_one_div category_list_one_div_bg'>"
                html += "<input type='hidden' class='depth1' value='" + item + "'>"
                html += "<input type='text' class='cate_name bg_cate_name' id='" + item + "' onclick='bgcatename(" + item + ");' readonly value='" + item + "'>";
                html += "<button class='cate_del' onclick='bg_del(" + item + ");'>삭제</button>";
                html += "<button class='cate_up' onclick='bg_update(" + item + ")'>수정</button>";
                html += "</div>"
            });
            html += "<div class='plus_btn_div bg_plus_btn_div' onclick='bg_plus_btn();'><i class='fas fa-plus-circle'></i></div>"
            $(".category_list_one_bg").append(html);
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

});

/*
    <대분류 입력창 클릭>
        첫번째 :                             두번째 :
        class 추가 => sort 클래스명 존재시 => ajax 실행에서 중분류 가져오기
                => sort 클래스명 없을시 => ajax 실행 안되기

*/
function bgcatename(depth1) {
    $(".category_list_one_div_m").remove(); // 중분류 리셋
    $(".category_list_one_div_s").remove(); /* 소분류 reset */
    $(".sorted_lecture_list_table").remove(); /* 테이블 reset */
    $(".m_plus_btn_div").remove(); /* +btn reset */
    $(".s_plus_btn_div").remove(); /* +btn reset */

    let category = {
        depth1Field: $(depth1).val()
    }
    // 첫번째
    if (document.getElementById(depth1.id).getAttribute('class').includes('sort')) {
        document.getElementById(depth1.id).classList.remove('sort');
        $(".category_list_one_div_m").remove();
    } else {
        $(".bg_cate_name").removeClass("sort");
        document.getElementById(depth1.id).classList.add('sort');

        $.ajax({
            url: "/category/getDepth2",
            method: "GET",
            data: category,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var html = "";
                $.each(data, function (i, item) {
                    html += "<div class='category_list_one_div category_list_one_div_m'>"
                    html += "<input type='text' class='cate_name m_cate_name' id='" + item + "' onclick='mcatename(" + [depth1.id, item] + ");' readonly value='" + item + "'>";
                    html += "<button class='cate_del' onclick='m_del(" + [depth1.id, item] + ");'>삭제</button>";
                    html += "<button class='cate_up' onclick='m_update(" + [depth1.id, item] + ")'>수정</button>";
                    html += "</div>"
                });
                html += "<div class='plus_btn_div m_plus_btn_div' onclick='m_plus_btn(" + depth1.id + ");'><i class='fas fa-plus-circle'></i></div>"
                $(".category_list_one_m").append(html);
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }
        });

    }

}

/*
    <중분류 입력창 클릭>
    첫번째 :                             두번째 :
    class 추가 => sort 클래스명 존재시 => ajax 실행에서 중분류 가져오기
                => sort 클래스명 없을시 => ajax 실행 안되기
*/
function mcatename(depth1, depth2) {
    $(".category_list_one_div_s").remove(); /* 소분류 reset */
    $(".sorted_lecture_list_table").remove(); /* 테이블 reset */
    $(".s_plus_btn_div").remove(); /* +btn reset */

    let category = {
        depth1Field: $(depth1).val(),
        depth2Skill: $(depth2).val()
    }

    if (document.getElementById(depth2.id).getAttribute('class').includes('sort')) {
        document.getElementById(depth2.id).classList.remove('sort');
        $(".category_list_one_div_s").remove();
    } else {
        $(".m_cate_name").removeClass("sort");
        document.getElementById(depth2.id).classList.add('sort');

        $.ajax({
            url: "/category/getDepth3",
            method: "GET",
            data: category,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var html = "";
                $.each(data, function (i, item) {
                    html += "<div class='category_list_one_div category_list_one_div_s' id='category_list_one_div_s_id'>"
                    html += "<input type='hidden' class='category_theme" + i + "' value='" + item + "'>"
                    html += "<input type='text' class='cate_name s_cate_name s_cate_name"+i+"' id='" + item + "' onclick='scatename(" + [depth1.id, depth2.id, i] + ");' readonly value='" + item + "'>";
                    html += "<button class='cate_del' onclick='s_del(" + [depth1.id, depth2.id, i] + ");'>삭제</button>";
                    html += "<button class='cate_up' onclick='s_update(" + [depth1.id, depth2.id, i] + ")'>수정</button>";
                    html += "</div>"
                });
                html += "<div class='plus_btn_div s_plus_btn_div' onclick='s_plus_btn(" + [depth1.id, depth2.id] + ");'><i class='fas fa-plus-circle'></i></div>"
                $(".category_list_one_s").append(html);
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }
        });
    }
}

/*
    <소분류 입력창 클릭>
    첫번째 :                             두번째 :
    class 추가 => sort 클래스명 존재시 => ajax 실행에서 소분류 가져오기
                => sort 클래스명 없을시 => ajax 실행 안되기
*/
function scatename(depth1, depth2, i) {
    $(".sorted_lecture_list_table").remove(); /* 테이블 reset */

    let category = {
        depth1Field: $(depth1).val(),
        depth2Skill: $(depth2).val(),
        depth3Course: $(".category_theme" + i).val()
    }

    let depth3 = $(".category_theme" + i);

    if(($(".s_cate_name"+i)[0].classList.value.includes('sort'))){
        $(".s_cate_name"+i)[0].classList.remove('sort');
    }else {
        $(".s_cate_name").removeClass("sort");
        $(".s_cate_name"+i)[0].classList.add('sort');

        $.ajax({
            url: "/category/getList",
            method: "GET",
            data: category,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if(data.length>0){
                var html = "";
                if(data){
                    html += "<table class='sorted_lecture_list_table' style='width:100%; text-align: center;'>"
                    html += "<tr><th>No.</th><th>베스트 강좌</th><th>강좌 이름</th><th>기관 이름</th><th>온라인 여부</th><th>기관 위치</th></tr>"
                    $.each(data, function (i, item) {
                        html += "<tr>"
                        html += "<input type='hidden' class='category_theme_depth3" + i + "' value='" + category.depth3Course + "'>"
                        html += "<input type='hidden' class='category_theme_lec" + i + "' value='" + item.lectureId + "'>"
                        html += "<input type='hidden' class='category_theme_title" + i + "' value='" + item.lectureTitle + "'>"
                        html += "<td>" + (i+1) + "</td>";
                        html += "<td>" + (item.lectureBestYn==1?"YES":"NO") + "</td>";
                        html += "<td><a href= 'javascript:detailLecture(" + [category.depth1Field, category.depth2Skill, i] + ")'>" + item.lectureTitle + "</a></td>";
                        html += "<td>" + item.academyName + "</td>";
                        html += "<td>" + item.onlineYn + "</td>";
                        html += "<td>" + item.academyLoc + "</td>";
                        html += "</tr>"
                    });
                }
                html += "</table>"
                $(".sorted_lecture_list").append(html);
                }
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }
        });
    }

}

/*
    테이블에서 강좌 리스트 타이틀 누르면 popup창으로 가기
*/
function detailLecture(depth1, depth2, i) {

    const depth1Field =  $(depth1).val();
    const depth2Skill = $(depth2).val();
    const depth3Course = $(".category_theme_depth3" + i).val();
    const lectureId = $(".category_theme_lec" + i).val();
    const lectureTitle = $(".category_theme_title"+i).val();
    categoryForm = {
        "depth1Field" : $(depth1).val()
    }

    var url = "/category/getTitle?depth1Field=" + depth1Field +"&depth2Skill="+ depth2Skill + "&depth3Course=" + depth3Course + "&lectureId="+lectureId;
    var name = "updateLectureCategory";
    var option = "width = 1000, height = 800, top = 100, left = 200, location = no"
    window.open(url, name, option);
}

/*
    대분류 + 버튼 눌러서 카테고리 add 하기
*/
function bg_plus_btn() {
    const depth1Field = "";
    const depth2Skill = "";

    var url = "/category/add?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);

}
/*
    중분류 + 버튼 눌러서 카테고리 add 하기 /category/add
*/
function m_plus_btn(depth1) {
    const depth1Field = depth1.id;
    const depth2Skill = "";

    var url = "/category/add?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);

}

/*
    소분류 + 버튼 눌러서 카테고리 add 하기
*/
function s_plus_btn(depth1, depth2) {
        const depth1Field = $(depth1).val();
        const depth2Skill = $(depth2).val();

    var url = "/category/add?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);
}

/**
 *
 *  수정 버튼
 *
 */
/* 대분류 수정 버튼 */
function bg_update(depth1) {
    const depth1Field = depth1.id;
    const depth2Skill = "";
    const depth3Course = "";

    var url = "/category/modify?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill + "&depth3Course=" + depth3Course;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);
}
/* 중분류 수정 버튼 */
function m_update(depth1, depth2) {

    const depth1Field = depth1.id;
    const depth2Skill = depth2.id;
    const depth3Course = "";

    var url = "/category/modify?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill + "&depth3Course=" + depth3Course;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);

}
/* 소분류 수정 버튼 */
function s_update(depth1, depth2, i) {

    const depth1Field = depth1.id;
    const depth2Skill = depth2.id;
    const depth3Course = $(".category_theme" + i).val();

    var url = "/category/modify?depth1Field=" + depth1Field + "&depth2Skill=" + depth2Skill + "&depth3Course=" + depth3Course;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);
}



/**
 *
 *  삭제 버튼
 *
 */
/* 대분류 삭제 버튼 */
function bg_del(depth1) {


    Swal.fire({
        title: '삭제하시겠습니까?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `YES`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            let category = {
                depth1Field: depth1.id
            }

            $.ajax({
                url: "/category/delDepth1",
                method: "POST",
                data: JSON.stringify(category),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    alert(data);
                   /* if(data>0){
                        Swal.fire('삭제가 완료되었습니다!');
                    }else{
                        Swal.fire('삭제가 완료되었습니다!');
                    }*/
                },
                error: function (x, s, e) {
                    console.log(x, s, e);
                }
            });
        }
    })
}
/* 중분류 삭제 버튼 */
function m_del(depth1, depth2) {

    Swal.fire({
        title: '삭제하시겠습니까?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `YES`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let category = {
                depth1Field: depth1.id,
                depth2Skill: depth2.id
            }
            console.log(category);

            $.ajax({
                url: "/category/delDepth2",
                method: "POST",
                data: JSON.stringify(category),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if(data>0){
                        Swal.fire('삭제가 완료되었습니다!');
                    }else{
                        Swal.fire('삭제가 완료되었습니다!');
                    }
                },
                error: function (x, s, e) {
                    console.log(x, s, e);
                }
            });
        }
    })
}
/* 소분류 삭제 버튼 */
function s_del(depth1, depth2, i) {

    Swal.fire({
        title: '삭제하시겠습니까?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `YES`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let category = {
                depth1Field: depth1.id,
                depth2Skill: depth2.id,
                depth3Course: $(".category_theme" + i).val()
            }

            $.ajax({
                url: "/category/delDepth3",
                method: "POST",
                data: JSON.stringify(category),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if(data>0){
                        Swal.fire('삭제가 완료되었습니다!');
                    }else{
                        Swal.fire('삭제가 완료되었습니다!');
                    }
                },
                error: function (x, s, e) {
                    console.log(x, s, e);
                }
            });
        }
    })
}

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// 추가 버튼
function add_sub(){
    //window.open("addSubject.mustache", "강좌 주제 추가","width=600px, height=600px");
    window.open("/theme/getTheme?themeLectureId=0", "안녕하세요^^", "width=500, height=300");
}

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// 삭제버튼
const setDeleteBtn = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-success",
        },
        buttonsStyling: false,
    });
    swalWithBootstrapButtons
        .fire({
            title: "삭제하시겠습니까?",
            text: "되돌릴 수 없는 작업입니다!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            reverseButtons: false,
        })
        .then((result) => {
            if (result.isConfirmed) {
                const themeLectureId = e.target.getAttribute("data-id");

                fetch("/theme/delTheme", {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: JSON.stringify({themeLectureId}),
                }).then(
                    () => swalWithBootstrapButtons.fire("삭제완료!", "성공적으로 삭제되었습니다", "success")
                ).then(
                    () => window.location.reload()
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire("취소되었습니다");
            }
        });

}
const setDeleteBtns = () => {
    document.querySelectorAll(".btn_delete").forEach(e1 => {
        e1.addEventListener("click", setDeleteBtn);
    })
}
setDeleteBtns();

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// 수정버튼
const setModifyBtn = (e) => {
    window.open(
        "/theme/getTheme?themeLectureId=" + e.target.getAttribute("data-id"),
        "안녕하세요^^",
        "width=600,height=370");
}

const setModifyBtns = () => {
    document.querySelectorAll(".btn_modify").forEach(e1 => {
        e1.addEventListener("click", setModifyBtn);
    })
}

// 주제명 누르면 강좌 검색
const searchLecture = (e) => {
    const data = {
        themeLectureId: e.target.getAttribute("data-id"),
        curpage: 1
    }
    $.ajax({
        url: "/theme/getLectureList",
        method: "GET",
        data: data,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            const cnt = data.totalCount;
            const totalPage = data.totalPage;
            const lectureList = data.lectures;
            appendOption(document.querySelector(".theme-lecture-result"),lectureList);
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });
}
const setSearchLecture = () => {
    document.querySelectorAll(".subject-name").forEach(e1 => {
      e1.addEventListener("click", searchLecture);
    })
}
setModifyBtns();
setSearchLecture();
