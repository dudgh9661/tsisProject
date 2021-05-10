var emp_id = '';

$.ajax({
    type : 'GET',
    url : '/employee/getSession',
    contentType:'application/json; charset=utf-8',
    dataType : 'json',
    success : function(data) {
        console.log(data.empId);
        emp_id = data.empId;
    }
})

function sub() {
    var emp_id = emp_id;
    var duty = "";
    var lang = "";
    var level = "";
    var trend = "";

    const List = document.getElementsByName("duty");
    for (var i = 0; i < List.length; i++) {
        if (List[i].checked == true) {
            duty = List[i].value;
        }
    }
    //console.log("duty >> " + duty);

    const query = 'input[name="lang"]:checked';
    let selectedEls = document.querySelectorAll(query);
    selectedEls.forEach((el) => {
        lang += el.value + ", ";
    });
    lang = lang.slice(0, -2);

    const levelList = document.getElementsByName("level");
    for (var i = 0; i < levelList.length; i++) {
        if (levelList[i].checked == true) {
        level = levelList[i].value;
        }
    }

    const query2 = 'input[name="trend"]:checked';
    let selectedEls2 = document.querySelectorAll(query2);
    selectedEls2.forEach((el) => {
        trend += el.value + ", ";
    });
    trend = trend.slice(0, -2);
    
    $.ajax({
        crossOrigin : true,
        url: "http://127.0.0.1:8001/api/flask/insert",
        type: "POST",
        data: JSON.stringify({"emp_id":  emp_id, "duty": duty, "lang": lang, "level": level, "trend": trend}), //인자로 보낼 데이터,
        dataType: "JSON",
        contentType:'application/json; charset=utf-8',
        
        success: function (result) {
        if (result) {
            console.log("success");
            console.log(typeof(data));
        } else {
            console.log("fail");
        }
        },
        error: function () {
            console.log("error");
        },
    });
    }

    function check(obj) {
        var chkbox = document.getElementsByName("lang");
        
        var chkCnt = 0;

        for (var i = 0; i < chkbox.length; i++) {
            if (chkbox[i].checked) {
                //console.log(chkbox[i]);
                chkCnt++;
            }
        }

        if (chkCnt > 3) {
            alert("3개까지만 선택 가능합니다!");

            obj.checked = false;

            return false;
        }
}

