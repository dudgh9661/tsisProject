
//직급, 연차 입력하면 현재 필수 강좌 리스트 출력
$('#necessary-selectButton').click(function(event) {
	event.stopPropagation()
	console.log('>>> hello world')
	const position = document.querySelector(".necessary-input-position").value;
	const year = document.querySelector(".necessary-input-year").value;
	var data = { "empPosition": position, "empYears": year };
	
	console.log(position);
	console.log(year);

	$.ajax({
		url: './json/test.json',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			$('#currentTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data.lectures, function(index, item) { ////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="current-checkbox" id = "current-course" ' + 'data-id = "' + item.requiredLectureId + '"></td>' +
					'<td>' + item.lectureTitle + '</td><td>' + item.academyName + '</td></tr>';

			});
			$('#currentTable').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
});

//페이지 로드되자마자 대분류 셀렉트 리스트에 옵션 설정
/*$(document).ready(function() {
	console.log("document ready");
	
	//함수 이거 맞는지 의문, 페이지 로드 시 대분류 출력
	$('#necessary-big').load(function() { //load 써도 되는건지..!!
		console.log("load method ");
		$.ajax({
			url: '/required/getDepth1',
			method:'GET',
			dataType: 'json',
			success: function(data) {
				$('#necessary-big').empty();
				$.each(data, function(item) {////////////////////////////////////////////////////
					var html = '<option value=' + item.depth1Field + '>';
					html += item.depth1Field + "</option>";
					$('#necessary-big').append(html);
				});
			},
			error: function(x,s,e) {
				console.log(x,s,e);
			}
		});
	});

});*/


//대분류 선택 했을 시 대분류 값 보내서 해당 중분류 리스트 받기
$('#necessary-big').click(function() {
	
	var temp = document.querySelector("#necessary-big");
	var index = temp.selectedIndex;
	var text = temp[index].innerText;
	
	console.log(index, text);
	$.ajax({
		//url: '/required/getDepth2',
		url: './json/test2.json',
		method: 'GET',
		data: {"depth1Field": text}, 
		dataType: 'json',
		success: function(data) {
			$('#necessary-middle').empty();
			$.each(data.middleCourse, function(index, entry) { //////////////////////////////////////////////
				var html = '<option value=' + entry.depth2Skill + '>';
				html += entry.depth2Skill + "</option>";
				$('#necessary-middle').append(html); 
			}); //end each

		},
	});
});

//중분류 선택 했을 시 중분류 값 보내서 해당 소분류 리스트 받기
$('#necessary-middle').click(function() {

	var big = document.querySelector("#necessary-big");
	var middle = document.querySelector("#necessary-middle");
	
	var bigValue = big[big.selectedIndex].innerText;
	var middleValue = middle[middle.selectedIndex].innerText;
	
	var data = {"depth1Field" : bigValue, "depth2Skill" : middleValue}; 

	$.ajax({
		//url: '/required/getDepth3',
		url: './json/test3.json',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
			$('#necessary-small').empty();
			$.each(data.smallCourse, function(index, entry) { //////////////////////////////////////
				var html = '<option value=' + entry.depth3Course + '>';
				html += entry.depth3Course + "</option>";
				$('#necessary-small').append(html);
			}); //end each

		},
	});
});

//소분류까지 다 선택하면 해당 조건에 맞는 강좌 리스트 출력
$('#necessary-small').click(function() {

	var big = document.querySelector("#necessary-big");
	var middle = document.querySelector("#necessary-middle");
	var small = document.querySelector("#necessary-small");
	
	var bigValue = big[big.selectedIndex].innerText;
	var middleValue = middle[middle.selectedIndex].innerText;
	var smallValue = small[small.selectedIndex].innerText;
	
	var data = { "depth1Field" : bigValue, "depth2Skill" : middleValue, "depth3Course" : smallValue };
	
	$.ajax({
		//url: '/required/getDpList',
		url: './json/test4.json',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
			$('#originalTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data.keyWordCourse, function(index, item) { //////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="origin-checkbox" id = "original-course" ' + 'data-id = "' + item.requiredLectureId + '"></td>'
					+ '<td>' + item.lectureTitle + '</td><td>' + item.academyName + '</td></tr>';

			});
			$('#originalTable').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
});

//강좌 키워드로 검색하면 해당 키워드 포함한 강좌 리스트 출력
$('#necessary-name-selectbtn').click(function() {

	var name = document.querySelector('.necessary-input-name').value;
	const data = { "lectureName" : name };
	
	$.ajax({
		//url: "/required/getTitleList",
		url:"./json/test.json",
		method: "GET",
		data: data,
		dataType: "json", 
		success: function(data) {
			$('#originalTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data.lectures, function(index, item) {////////////////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="origin-checkbox" id = "original-course" ' + 'data-id = "' + item.requiredLectureId + '"></td>'
					+ '<td>' + item.lectureTitle + '</td><td>' + item.academyName + '</td></tr>';
				
			});
			$('#originalTable').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
});


//오른쪽 버튼 누르면 필수 강좌 리스트에 추가
$('#insertButton').click(function() {

	var lectureList = [];
	var checkbox = $("input[name=origin-checkbox]:checked");

	const position = document.querySelector(".necessary-input-position").value;
	const year = document.querySelector(".necessary-input-year").value;

	checkbox.each(function(i) {
		console.log($(this));
		var lectureId = $(this);
		console.log(lectureId);
		console.log(lectureId[i]);
		var id = lectureId[i].getAttribute("data-id");
		console.log(id);
		lectureList.push(id);
	});

	$.ajax({
		url: '/required/addList',
		type: 'POST',
		data: {"lectureId": lectureList, "empPosition": position, "empYears": year}

	});
});

//왼쪽 버튼 누르면 필수 강좌 리스트에서 삭제
$('#deleteButton').click(function() {

	var lectureList = [];
	var checkbox = $("input[name=current-checkbox]:checked");

	const position = document.querySelector(".necessary-input-position").value;
	const year = document.querySelector(".necessary-input-year").value;

	checkbox.each(function(i) {
		var lectureId = $(this).getAttribute("data-id");
		lectureList[i] = lectureId;
	});
	
	var data = { "lectureId": lectureList, "empPosition" : position, "empYears": year};

	$.ajax({
		url: '/required/delList',
		type: 'POST',
		data: data,
	});
});




