
//직급, 연차 입력하면 현재 필수 강좌 리스트 출력
function getList(){
	//event.stopPropagation()
	console.log('>>> hello world')
	const position = document.querySelector(".necessary-input-position").value;
	const year = document.querySelector(".necessary-input-year").value;
	var data = { "empPosition": position, "empYears": year };


	$.ajax({
		url: '/required/getList',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
		    console.log(data)
			$('#currentTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data, function(index, item) { ////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="current-checkbox" id = "current-course" ' + 'data-id = "' + item.lectureId + '"></td>' +
					'<td>' + item.lectureTitle + '</td><td>' + item.academyName + '</td></tr>';

			});
			$('#currentTable').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
}

const appendOption = (e1, arr) => {
//  e1.innerHTML = "";
  arr.forEach((e2) => {
    const tmp = document.createElement("option");
    tmp.value = e2;
    tmp.innerText = e2;
    e1.appendChild(tmp);
  });
};

function getDepth1List() {
      const catBigSample = [];
      $.ajax({
        url: "/required/getDepth1",
        method: "GET",
        success: function (data) {
            temp1 = data[0];
            $.each(data, function(index,item){
              catBigSample.push(item);
//              console.log(item);
            });
              appendOption(document.querySelector(".necessary-select-box"), catBigSample);
          },
          error: function (x, s, e) {
//              console.log(x, s, e);
          },
          complete: function() {

          }
      }); //대분류 ajax끝
}

getDepth1List();
//페이지 로드되자마자 대분류 셀렉트 리스트에 옵션 설정
//$(document).ready(function() {
//	console.log("document ready");
//
//	//함수 이거 맞는지 의문, 페이지 로드 시 대분류 출력
//	$('#necessary-big').load(function() { //load 써도 되는건지..!!
//		console.log("load method ");
//		$.ajax({
//			url: '/required/getDepth1',
//			method:'GET',
//			dataType: 'json',
//			success: function(data) {
//				$('#necessary-big').empty();
//				$.each(data, function(index, item) {////////////////////////////////////////////////////
//					var html = '<option value=' + item + '>';
//					html += item + "</option>";
//					$('#necessary-big').append(html);
//				});
//			},
//			error: function(x,s,e) {
//				console.log(x,s,e);
//			}
//		});
//	});
//
//});


//대분류 선택 했을 시 대분류 값 보내서 해당 중분류 리스트 받기
$('#necessary-big').change(function() {
	
	var temp = document.querySelector("#necessary-big");
	var index = temp.selectedIndex;
	var text = temp[index].innerText;
	
	console.log(index, text);
	$.ajax({
		url: '/required/getDepth2',
		//url: './json/test2.json',
		method: 'GET',
		data: {"depth1Field": text}, 
		dataType: 'json',
		success: function(data) {
		    console.log(data);
			$('#necessary-middle').empty();
			$.each(data, function(index, entry) { //////////////////////////////////////////////
				var html = '<option value=' + entry + '>';
				html += entry + "</option>";
				$('#necessary-middle').append(html); 
			}); //end each

		},
	});
});

//중분류 선택 했을 시 중분류 값 보내서 해당 소분류 리스트 받기
$('#necessary-middle').change(function() {

	var big = document.querySelector("#necessary-big");
	var middle = document.querySelector("#necessary-middle");
	
	var bigValue = big[big.selectedIndex].innerText;
	var middleValue = middle[middle.selectedIndex].innerText;
	
	var data = {"depth1Field" : bigValue, "depth2Skill" : middleValue}; 

	$.ajax({
		url: '/required/getDepth3',
		//url: './json/test3.json',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
			$('#necessary-small').empty();
			$.each(data, function(index, entry) { //////////////////////////////////////
				var html = '<option value=' + entry+ '>';
				html += entry + "</option>";
				$('#necessary-small').append(html);
			}); //end each

		},
	});
});

//소분류까지 다 선택하면 해당 조건에 맞는 강좌 리스트 출력
function getDpList() {

	var big = document.querySelector("#necessary-big");
	var middle = document.querySelector("#necessary-middle");
	var small = document.querySelector("#necessary-small");
	
	var bigValue = big[big.selectedIndex].innerText;
	var middleValue = middle[middle.selectedIndex].innerText;
	var smallValue = small[small.selectedIndex].innerText;
	
	var data = { "depth1Field" : bigValue, "depth2Skill" : middleValue, "depth3Course" : smallValue };
	
	$.ajax({
		url: '/required/getDpList',
		//url: './json/test4.json',
		method: 'GET',
		data: data,
		dataType: 'json',
		success: function(data) {
		console.log(data);
			$('#originalTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data, function(index, item) { //////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="origin-checkbox" id = "original-course" ' + 'data-id = "' + item.lectureId + '"></td>'
					+ '<td>' + item.lectureTitle + '</td><td>' + item.academyName + '</td></tr>';

			});
			$('#originalTable').append(html);
		},
		error: function(x, s, e) {
			console.log(x, s, e);
		}
	});
};

//강좌 키워드로 검색하면 해당 키워드 포함한 강좌 리스트 출력
$('#necessary-name-selectbtn').click(function() {

	var name = document.querySelector('.necessary-input-name').value;
	//console.log("name : " + name);
	const data = { "lectureTitle" : name };
	
	$.ajax({
		url: "/required/getTitleList",
		//url:"./json/test.json",
		method: "GET",
		data: data,
		dataType: "json", 
		success: function(data) {
			$('#originalTable').empty();
			var html = '<tr class="necessary-tableheader-tr"><th></th><th class="necessary-header-name">강좌</th><th>기관</th></tr>';
			$.each(data, function(index, item) {////////////////////////////////////////////////
				html += '<tr><td><input type="checkbox" name="origin-checkbox" id = "original-course" ' + 'data-id = "' + item.lectureId + '"></td>'
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

	const position = document.querySelector(".necessary-input-position").value;
	const year = parseInt(document.querySelector(".necessary-input-year").value);

	var checkbox = document.getElementsByName("origin-checkbox");
	//console.log("length : " + length);

    var index = 0;
    for(index = 0;index < checkbox.length;index++) {
        if(checkbox[index].checked == true) {
            var id = checkbox[index].getAttribute("data-id");
            lectureList.push(id);
        }
    }
    console.log('lectureid: ', lectureList)
    console.log('empPosition: ', position)
    console.log('empYears: ', year)
    const data = {'lectureId': lectureList, 'empPosition' : position, 'empYears' : year};
	$.ajax({
		url: '/required/addList',
		method: 'POST',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success : function(data) {
		    console.log(data);

            getList();


		}

	});
});

//왼쪽 버튼 누르면 필수 강좌 리스트에서 삭제
$('#deleteButton').click(function() {

	var lectureList = [];

	const position = document.querySelector(".necessary-input-position").value;
	const year = document.querySelector(".necessary-input-year").value;

	var checkbox = document.getElementsByName("current-checkbox");
    	//console.log("length : " + length);

    var index = 0;
    for(index = 0;index < checkbox.length;index++) {
        if(checkbox[index].checked == true) {
            var id = checkbox[index].getAttribute("data-id");
            console.log("data-id : " + id);
            lectureList.push(parseInt(id));
        }
    }
	
	//var data = { "requiredLectureId": lectureList};

	//console.log(data)
	$.ajax({
		url: '/required/delList',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(lectureList),
        dataType: 'json',
        success : function(data) {
            //console.log(data);

            //getDpList();
            getList();
        }
	});
});




