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
    document.querySelector(".updateCagtegory-info-box").setAttribute("value", text);
});

function updeateCate() {
    const depth1 = document.querySelector("#depth1_field").getAttribute("value");
    const depth2 = document.querySelector("#depth2_skill").getAttribute("value");
    const depth3 = document.querySelector("#depth3_course").getAttribute("value");
    const new_depth = document.querySelector("#updateCagtegory-info-box").getAttribute("value");

    let category = {
        depth1Field: depth1,
        depth2Skill: depth2,
        depth3Course: depth3,
        newDepth: new_depth
    }

    $.ajax({
        url: "/category/resetDepth",
        method: "POST",
        data: JSON.stringify(category),
        dataType: "json",
        success: function (data) {
            alert(data + "=> 성공");
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });

}