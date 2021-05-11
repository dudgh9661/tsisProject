 
/*
  $.ajax({
    type: 'POST',
    url: '/postChangeSeatInfo',
    dataType: 'json',
    contentType:'application/json; charset=utf-8',
    data: JSON.stringify(send)
}).done(()=>{
    //예매 완료 시 "/"로 이동
    window.location.href="/";
}).fail(function (error) {
    alert(JSON.stringify(error));
});
*/
$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8001/api/flask/top10news',
    contentType:'application/json; charset=utf-8'
}).done((response)=>{ 
    console.log(response.data);
    let news = "";
    let div = document.createElement('div');
    for(i of response.data){  
        news += ' <li> \
                    <div class="news_font"> \
                        <a class="link_color" href=' + i.html +' target="_blank">' + i.title +'</a> \
                    </div> \
                  </li> ';

    }
    div.innerHTML = news;
    document.getElementById("news_box").appendChild(div);
}).fail(function (error) {
    alert(JSON.stringify(error));
});