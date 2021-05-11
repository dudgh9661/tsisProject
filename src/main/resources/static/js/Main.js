window.onload = function() {
console.log();

    $.ajax({
        type : 'GET',
        url : '/employee/getSession',
        contentType:'application/json; charset=utf-8',
        dataType : 'json',
        success : function(data) {
            console.log(data);
            if(data.surveyYn == 0){
                window.open("/mainPage/survey", "안녕하세요^^", "width=600,height=800");

            }
        }
    });


    var line = document.getElementById("online");
        var tmp="";
        console.log(line.innerText);
        if (line.innerText == 1){
            tmp ="온라인";
        } else if(line.innerText == 0){
            tmp ="오프라인";
        }
        line.innerText=tmp;

}