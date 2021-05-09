function addCate() {
     let category = {
        depth1Field: $("#depth1_field").val(),
        depth2Skill: $("#depth2_skill").val(),
        adddepth: $(".input-info-box").val()
    }

    console.log(category);

     $.ajax({
            url: "/category/addDepth",
            method: "POST",
            data: JSON.stringify(category),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                // data == 1 성공
                if (data > 0) {
                    alert("성공적으로 추가되었습니다.");
                    window.close();
                } else {
                    alert("실패하였습니다.");
                    location.reload();
                }
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }

        });
}