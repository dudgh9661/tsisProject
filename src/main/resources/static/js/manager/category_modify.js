$(function () {
    const depth1 = document.querySelector("#depth1_field").getAttribute("value");
    const depth2 = document.querySelector("#depth2_skill").getAttribute("value");
    const depth3 = document.querySelector("#depth3_course").getAttribute("value");

    let text = "";
    if (depth3) {
        text = depth3;
    } else if (depth2) {
        text = depth2;
    } else {
        text = depth1;
    }

    document.querySelector(".update_category_info_box").setAttribute("value", text);
});

function updeateCate() {
    const depth1 = document.querySelector("#depth1_field").value;
    const depth2 = document.querySelector("#depth2_skill").value;
    const depth3 = document.querySelector("#depth3_course").value;
    const new_depth = document.querySelector(".update_category_info_box").value;


    let category = {
        depth1Field: depth1,
        depth2Skill: depth2,
        depth3Course: depth3,
        newDepth: new_depth
    }

    console.log(category);

    $.ajax({
        url: "/category/resetDepth",
        method: "POST",
        data: JSON.stringify(category),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if(data>0){
                alert("성공적으로 변경되었습니다.");
                window.close();
            }else {
                alert("변경 실패");
            }
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

}