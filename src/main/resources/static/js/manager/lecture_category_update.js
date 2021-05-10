// 현재 선택된 대분류 이름
var selectedbgCategoryName
// 현재 선택된 중분류 이름
var selectedmCategoryName
// 현재 선택된 소분류 이름
var selectedsCategoryName

// load
$(function () {
    let categorym = {
        depth1Field: $(".bg_cate_option").val()
    }

    let category = {
        depth1Field: $(".bg_cate_option").val(),
        depth2Skill : $(".m_cate_option").val()
    }

    /*대분류 로딩 */
    $.ajax({
        url: "/category/getDepth1",
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".bg_cate option").remove();
            $.each(data, function (i, item) {
                $(".cate_update_bg_" + item).remove();
                var html = "";
                if ($("#get_bg_cate").val() == item) {
                    html += "<option class='cate_update_bg cate_update_bg_" + item + "' value='" + item + "' selected>" + item + "</option>";
                } else {
                    html += "<option class='cate_update_bg cate_update_bg_" + item + "' value='" + item + "'>" + item + "</option>";
                }
                $(".bg_cate").append(html);

            });
                selectedbgCategoryName = $(".cate_update_bg:selected").val();
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

    /*중분류 로딩 */
    $.ajax({
        url: "/category/getDepth2",
        method: "GET",
        data: categorym,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".m_cate option").remove();
            $.each(data, function (i, item) {
                $(".cate_update_m_" + item).remove();
                var html = "";
                if ($("#get_m_cate").val() == item) {
                    html += "<option class='cate_update_m cate_update_m_" + item + "' value='" + item + "' selected>" + item + "</option>";
                } else {
                    html += "<option class='cate_update_m cate_update_m_" + item + "' value='" + item + "'>" + item + "</option>";
                }
                $(".m_cate").append(html);

                selectedmCategoryName = $(".cate_update_m:selected").val();
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });



    /*소분류 로딩 */
    $.ajax({
        url: "/category/getDepth3",
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        data: category,
        success: function (data) {
            $.each(data, function (i, item) {
                var html = "";
                if ($("#get_s_cate").val() == item) {
                    html += "<option class='cate_update_s cate_update_s_" + item + "' value='" + item + "' selected>" + item + "</option>";
                } else {
                    html += "<option class='cate_update_s cate_update_s_" + item + "' value='" + item + "'>" + item + "</option>";
                }
                $(".s_cate").append(html);
                selectedsCategoryName = $(".cate_update_s:selected").val();
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

});

/*
대분류 option selected변경시 이벤트
*/
$(".bg_cate").change(function (event) {
    let category = {
        depth1Field: $(this).val()
    }

    $.ajax({
        url: "/category/getDepth2",
        method: "GET",
        data: category,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".m_cate option").remove();
            $(".s_cate option").remove();

            var html = "";
            $.each(data, function (i, item) {
                $(".cate_update_m_" + item).remove();
                if ($("#get_m_cate").val() == item) {
                    html += "<option class='cate_update_m cate_update_m_" + item + "' value='" + item + "' selected>" + item + "</option>";
                }else {
                    html += "<option class='cate_update_m cate_update_m_" + item + "' value='" + item + "'>" + item + "</option>";
                }
            });

            selectedbgCategoryName = $(".cate_update_bg:selected").val();

            $(".m_cate").append(html);
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

});



/*
중분류 option selected변경시 이벤트
*/
$(".m_cate").click(function () {

    let category = {
        depth1Field: $(".cate_update_bg:selected").val(),
        depth2Skill: $(this).val()
    }

    $.ajax({
        url: "/category/getDepth3",
        method: "GET",
        data: category,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
           $(".s_cate option").remove();
            var html = "";
            $.each(data, function (i, item) {
                //$(".s_cate").children().remove().end()
                $(".s_cate option").remove();
                if ($("#get_s_cate").val() == item) {
                    html += "<option class='cate_update_s cate_update_s_" + item + "' value='" + item + "' selected>" + item + "</option>";
                } else {
                    html += "<option class='cate_update_s cate_update_s_" + item + "' value='" + item + "'>" + item + "</option>";
                }
            });
            $(".s_cate").append(html);

            selectedmCategoryName = $(".cate_update_m:selected").val();
            selectedsCategoryName = $(".cate_update_s:selected").val();
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });
});


/*
소분류 option selected변경시 이벤트
*/
$(".s_cate").click(function () {
    selectedsCategoryName = $(".cate_update_s:selected").val();
});


function updateCate() {
    let category = {
        depth1Field: selectedbgCategoryName,
        depth2Skill: selectedmCategoryName,
        depth3Course: selectedsCategoryName,
        lectureId: $("#lec_id").val()
    }

    console.log(category);


    let jsonStr = JSON.stringify(category);

    $.ajax({
          url: "/category/setDepth",
          method: "POST",
          data: jsonStr,
          dataType: "json",
          contentType: "application/json",
          success: function (data) {
            if (data > 0) {
                  alert("성공적으로 카테고리가 변경 되었습니다.");
                  window.close();
            } else {
                  alert("실패하였습니다.");
                  window.reload();
            }
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
    });
}
