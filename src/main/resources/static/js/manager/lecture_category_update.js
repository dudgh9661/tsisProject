// load
$(function () {
    /* 대분류 로딩 */
    $.ajax({
        url: "/category/getDepth1",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data.lecture_category, function (i, item) {
                $("." + item.depth1_field).remove();
                var html = "";
                if ($("#get_bg_cate").val() == item.depth1_field) {
                    html += "<option class='" + item.depth1_field + "' value='" + item.depth1_field + "' selected>" + item.depth1_field + "</option>";
                } else {
                    html += "<option class='" + item.depth1_field + "' value='" + item.depth1_field + "'>" + item.depth1_field + "</option>";
                }
                $(".bg_cate").append(html);

                selectedbgCategoryName = $(".bg_cate option:selected").val();
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

    /* 중분류 로딩 */
    $.ajax({
        url: "/category/getDepth2",
        method: "GET",
        data: JSON.stringify{
            "depth1Field" : selectedbgCategoryName
        },
        dataType: "json",
        success: function (data) {
            $.each(data.lecture_category, function (i, item) {
                $("." + item.depth2_skill).remove();
                var html = "";
                if ($("#get_m_cate").val() == item.depth2_skill) {
                    html += "<option class='" + item.depth2_skill + "' value='" + item.depth2_skill + "' selected>" + item.depth2_skill + "</option>";
                } else {
                    html += "<option class='" + item.depth2_skill + "' value='" + item.depth2_skill + "'>" + item.depth2_skill + "</option>";
                }
                $(".m_cate").append(html);

                selectedmCategoryName = $(".m_cate option:selected").val();
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

    /* 소분류 로딩 */
    $.ajax({
        url: "/category/getDepth3",
        method: "GET",
        dataType: "json",
        data: JSON.stringify{
            "depth1Field" : selectedbgCategoryName,
            "depth2Skill" : selectedmCategoryName
        },
        success: function (data) {
            $.each(data.lecture_category, function (i, item) {
                var html = "";
                if ($("#get_s_cate").val() == item.depth3_course) {
                    html += "<option class='" + item.depth3_course + "' value='" + item.depth3_course + "' selected>" + item.depth3_course + "</option>";
                } else {
                    html += "<option class='" + item.depth3_course + "' value='" + item.depth3_course + "'>" + item.depth3_course + "</option>";
                }
                $(".s_cate").append(html);
                selectedsCategoryName = $(".s_cate option:selected").val();
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });
});


// 현재 선택된 대분류 이름
var selectedbgCategoryName
// 현재 선택된 중분류 이름
var selectedmCategoryName
// 현재 선택된 소분류 이름
var selectedsCategoryName

/*
    대분류 option selected 변경시 이벤트
*/
$(".bg_cate").change(function (event) {
    let category = {
        depth1Field: $(this).val()
    }

    $.ajax({
        url: "/category/getDepth2",
        method: "GET",
        data: JSON.stringify(category),
        dataType: "json",
        success: function (data) {
            var html = "";

            $.each(data.lecture_category, function (i, item) {
                $("." + item.depth2_skill).remove();
                if ($("#get_m_cate").val() == item.depth2_skill) {
                    html += "<option class='" + item.depth2_skill + "' value='" + item.depth2_skill + "' selected>" + item.depth2_skill + "</option>";
                } else {
                    html += "<option class='" + item.depth2_skill + "' value='" + item.depth2_skill + "'>" + item.depth2_skill + "</option>";
                }
            });

            selectedbgCategoryName = $(".bg_cate option:selected").val();

            $(".m_cate").append(html);
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

});

/*
    중분류 option selected 변경시 이벤트
*/
$(".m_cate").change(function () {
    let category = {
        depth1Field: selectedbgCategoryName,
        depth2Skill: $(this).val()
    }

    $.ajax({
        url: "/category/getDepth3",
        method: "GET",
        data: JSON.stringify(category),
        dataType: "json",
        success: function (data) {
            var html = "";
            $.each(data.lecture_category, function (i, item) {
                $(".s_cate").children().remove().end()
                if ($("#get_s_cate").val() == item.depth3_course) {
                    html += "<option class='" + item.depth3_course + "' value='" + item.depth3_course + "' selected>" + item.depth3_course + "</option>";
                } else {
                    html += "<option class='" + item.depth3_course + "' value='" + item.depth3_course + "'>" + item.depth3_course + "</option>";
                }
            });
            $(".s_cate").append(html);

            selectedmCategoryName = $(".m_cate option:selected").val();

        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });
});

/*
    소분류 option selected 변경시 이벤트
*/
$(".s_cate").change(function () {
    selectedsCategoryName = $(".s_cate option:selected").val();
});

/*
    강좌 카테고리 변경 버튼 이벤트
*/
function updateCate() {
    let category = {
        depth1Field: selectedbgCategoryName,
        depth2Skill: selectedmCategoryName,
        depth3Course: selectedsCategoryName,
        lectureId: $("#lec_id").val()
    }

    $.ajax({
          url: "/category/setDepth",
          method: "POST",
          data: JSON.stringify(category),
          dataType: "json",
          success: function (data) {
            alert(data + " => 성공");
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
    });
}