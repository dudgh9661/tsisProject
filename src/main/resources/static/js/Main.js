window.onload = function() {


    $.ajax({
        type : 'GET',
        url : '/employee/getSession',
        contentType:'application/json; charset=utf-8',
        dataType : 'json',
        success : function(data) {
            console.log(data);
              var input=document.getElementById("py");
                var str="";
                var input_url="http://127.0.0.1:8001/api/flask/recommend?emp_id=";
                var user = data.empId;
                console.log(user);
                $.ajax({
                    tyep: "GET",
                    url: input_url+user,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                }).done((response) => {
            //        console.log(">>>> ajax 진입")
            //        console.log(response);
                    var len=response.data.length;
                    var onoff="";
                    for(var i=0;i<len;i++){
                    if(response.data[i].online_yn==1){
                    onoff="온라인";
                    }
                    else{
                    onoff="오프라인";
                    }
                        str+="<div class='contentInside'><div class='card-body'><div class='card-body_thumb' ><a href=" + response.data[i].lecture_url + "target='_blank'><div class='institution-logo'> <img class='logoImg' src=" + response.data[i].academy_logo_url + "> </div></a></div><div class='card-body_cont'><div class='card-body_cont_name'> <strong>" + response.data[i].lecture_title + "</strong> </div> <div class=card-body_cont_info> </div> <div class='card-body_cont_location'> <span class='loc-acdm'>" + response.data[i].academy_name + "</span><span class='loc-name'>" + onoff +"</span></div></div> </div></div>"
                    }
                    input.innerHTML=str;
                })
                .fail((error) => {
                    alert("error");
                });
        }
    });
