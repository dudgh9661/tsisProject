
function loadGuide(){

	$.ajax({
		url: '/guide/getGuide',
		method: 'GET',
		success: function(data) {
		    console.log(data);
			$('#guide-textarea').empty();
            var html;
            html = '<textarea id="noticeText" rows="10" guide-id = "' + data.guideId  + '">' + data.contents + '</textarea>';
			html += '<button class = "notice-saveButton" onclick = "saveGuide()">저장</button>';
			$('#guide-textarea').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
}

loadGuide();

function saveGuide() {

    const guideId = document.querySelector("#noticeText").getAttribute("guide-id");
    const text = document.querySelectors("#noticeText").value;

    var data = {"guideID" : guideId, "contents" : text};

    $.ajax({
    		url: '/guide/setGuide',
    		method: 'POST',
    		contentType : 'application/json',
    		data : JSON.stringify(data),
    		success: function(data) {
                console.log(data);
    		},
    		error: function(x, s, e) {
    			console.log(x, s, e);
    		}
    	});

}
