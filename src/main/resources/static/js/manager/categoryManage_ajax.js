// 삭제 버튼
const del = (data) => console.log(data.id);
// 수정 버튼
const update = (data) => console.log(data.id);

// load
$(function () {
    $.ajax({
        url: "/json/bg_test.json", // /category
        method: "GET",
        dataType: "json",
        success: function (data) {
            var html = "";
            $.each(data.lecture_category, function (i, item) {
                html += "<div class='category_list_one_div category_list_one_div_bg'>"
                html += "<input type='hidden' class='depth1' value='" + item.depth1_field + "'>"
                html += "<input type='text' class='cate_name bg_cate_name' id='" + item.depth1_field + "' onclick='bgcatename(" + item.depth1_field + ");' readonly value='" + item.depth1_field + "'>";
                html += "<button class='cate_del' onclick='del(" + item.depth1_field + ");'>삭제</button>";
                html += "<button class='cate_up' onclick='update(" + item.depth1_field + ")'>수정</button>";
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
        depth1_field: $(depth1).val()
    }

    // 첫번째
    if (document.getElementById(depth1.id).getAttribute('class').includes('sort')) {
        document.getElementById(depth1.id).classList.remove('sort');
        $(".category_list_one_div_m").remove();
    } else {
        $(".bg_cate_name").removeClass("sort");
        document.getElementById(depth1.id).classList.add('sort');

        $.ajax({
            url: "/json/m_test.json", // /category
            method: "GET",
            data: category,
            dataType: "json",
            success: function (data) {
                var html = "";
                $.each(data.lecture_category, function (i, item) {
                    html += "<div class='category_list_one_div category_list_one_div_m'>"
                    html += "<input type='text' class='cate_name m_cate_name' id='" + item.depth2_skill + "' onclick='mcatename(" + [depth1.id, item.depth2_skill] + ");' readonly value='" + item.depth2_skill + "'>";
                    html += "<button class='cate_del' onclick='del(" + item.depth2_skill + ");'>삭제</button>";
                    html += "<button class='cate_up' onclick='update(" + item.depth2_skill + ")'>수정</button>";
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
        depth1_field: $(depth1).val(),
        depth2_skill: $(depth2).val()
    }

    if (document.getElementById(depth2.id).getAttribute('class').includes('sort')) {
        document.getElementById(depth2.id).classList.remove('sort');
        $(".category_list_one_div_s").remove();
    } else {
        $(".m_cate_name").removeClass("sort");
        document.getElementById(depth2.id).classList.add('sort');

        $.ajax({
            url: "/json/s_test.json", // /category
            method: "GET",
            data: category,
            dataType: "json",
            success: function (data) {
                var html = "";
                $.each(data.lecture_category, function (i, item) {
                    html += "<div class='category_list_one_div category_list_one_div_s'>"
                    html += "<input type='hidden' class='" + i + "' value='" + item.depth3_course + "'>"
                    html += "<input type='text' class='cate_name s_cate_name' id='" + item.depth3_course + "' onclick='scatename(" + [depth1.id, depth2.id, i] + ");' readonly value='" + item.depth3_course + "'>";
                    html += "<button class='cate_del' onclick='del(" + item.depth3_course + ");'>삭제</button>";
                    html += "<button class='cate_up' onclick='update(" + item.depth3_course + ")'>수정</button>";
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
        depth1_field: $(depth1).val(),
        depth2_skill: $(depth2).val(),
        depth3_course: $("." + i).val()
    }

    let depth3 = $("." + i);

    if (document.getElementById($("." + i).val()).getAttribute('class').includes('sort')) {
        document.getElementById($("." + i).val()).classList.remove('sort');
    } else {
        $(".s_cate_name").removeClass("sort");
        document.getElementById($("." + i).val()).classList.add('sort');

        $.ajax({
            url: "/json/lecture_test.json", // /category
            method: "GET",
            data: category,
            dataType: "json",
            success: function (depth3) {
                var html = "";
                html += "<table class='sorted_lecture_list_table' style='width:100%; text-align: center;'>"
                html += "<tr><th>No</th><th>lecture_best_yn</th><th>lecture_title</th><th>academy_name</th><th>online_yn</th><th>academy_loc</th></tr>"
                $.each(depth3.lecture, function (i, item) {
                    console.log(category.depth3_course);
                    html += "<tr>"
                    html += "<input type='hidden' class='depth3" + i + "' value='" + category.depth3_course + "'>"
                    html += "<input type='hidden' class='lec" + i + "' value='" + item.lecture_id + "'>"
                    html += "<td>" + item.lecture_id + "</td>";
                    html += "<td>" + item.lecture_best_yn + "</td>";
                    html += "<td><a href= 'javascript:detailLecture(" + [category.depth1_field, category.depth2_skill, i] + ")'>" + item.lecture_title + "</a></td>";
                    html += "<td>" + item.academy_name + "</td>";
                    html += "<td>" + item.online_yn + "</td>";
                    html += "<td>" + item.academy_loc + "</td>";
                    html += "</tr>"
                });
                html += "</table>"
                $(".sorted_lecture_list").append(html);


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
    let category = {
        depth1_field: $(depth1).val(),
        depth2_skill: $(depth2).val(),
        depth3_course: $(".depth3" + i).val(),
        lecture_id: $(".lec" + i).val()
    }

    console.log(category);

    var url = "updateLectureCategory.html?category=" + category; /*controller단으로 넘김 */
    var name = "updateLectureCategory";
    var option = "width = 1000, height = 800, top = 100, left = 200, location = no"
    window.open(url, name, option);
}

/*
    대분류 + 버튼 눌러서 카테고리 add 하기
*/
function bg_plus_btn() {

    var url = "addCategory.html";
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);

}
/*
    중분류 + 버튼 눌러서 카테고리 add 하기 /category/add
*/
function m_plus_btn(depth1) {
    let category = {
        depth1_field: depth1.id
    }

    var url = "addCategory.html?category=" + category;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);

}

/*
    소분류 + 버튼 눌러서 카테고리 add 하기
*/
function s_plus_btn(depth1, depth2) {
    let category = {
        depth1_field: $(depth1).val(),
        depth2_skill: $(depth2).val()
    }

    var url = "addCategory.html?category=" + category;
    var name = "addCategory";
    var option = "width = 800, height = 300, top = 100, left = 200, location = no"
    window.open(url, name, option);
}

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */
// 추가 버튼
function add_sub(){
    //window.open("addSubject.mustache", "강좌 주제 추가","width=600px, height=600px");
    window.open("/addSubject", "안녕하세요^^", "width=550, height=800");
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
                const data = {
                    themeLectureId
                };
                console.log(data);

                fetch("/theme/delTheme/", {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    body: JSON.stringify(data),
                }).then(
                    swalWithBootstrapButtons.fire("삭제완료!", "성공적으로 삭제되었습니다", "success")
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
        "/theme/getTheme/" + e.target.getAttribute("data-id"),
        "안녕하세요^^",
        "width=400,height=370");
}

const setModifyBtns = () => {
    document.querySelectorAll(".btn_modify").forEach(e1 => {
        e1.addEventListener("click", setModifyBtn);
    })
}
setModifyBtns();
