/** select영역 */
const catBigSelect = document.querySelector(".category-big");
const catMidSelect = document.querySelector(".category-mid");
const catSmallSelect = document.querySelector(".category-small");
const id = document.location.href.split("/")[document.location.href.split("/").length-1] == "change" ?
            null :
            document.location.href.split("/")[document.location.href.split("/").length-1];

/* 카테고리 샘플 */
const catBigSample = [];
const catMidSample = [];
const catSmallSample = [];

function selectChange(){
    var selected = document.getElementById('select').value;

    if(selected == '0'){
        $("#recommchk").prop("checked", false);
        $("#recommchk").attr("disabled", false);
    }
    else{
        $("#recommchk").prop("checked", true);
        $("#recommchk").attr("disabled", true);
    }
    console.log(selected);
}

// 연차
var subOptions = {

   first: ['1년차', '2년차', '3년차', '4년차', '5년차'],

   rest: ['1년차', '2년차', '3년차', '4년차'],

   none: []
}


//직급별 연차 표시 함수


function changePositionYear (event) {
   const mainPosition = event.target;
   console.log(mainPosition);
   const subPosition = event.target.parentNode.querySelector(".change-sub-year");

   //console.log(event);
   const subYear = subPosition;
   const option = event.target.options[event.target.selectedIndex].innerText;
   var subOption

   if (option === '부장') subOption = subOptions.first;
   else if (option === '없음') subOption = subOptions.none;
   else subOption = subOptions.rest;

   $(subYear).children().remove().end();
   for (const year of subOption) {
        const tmp = document.createElement("option");
        tmp.innerText = year;
        subYear.appendChild(tmp);
//      subYear.append('<option>' + year + '</option>');
   }
}
//mainPosition.onchange = changePositionYear
//mainPosition.addEventListener("change", changePositionYear);


var index=1; // index

function addline(){
    var html2 = '<div class="necChild">'+
                    '<select class="change-main-position" id="selPosition'+index +'"><option>사원</option>'+
                    '<option>대리</option>'+
                    '<option>과장</option>'+
                    '<option>차장</option>'+
                    '<option>부장</option></select>'+
                    ' <select class="change-sub-year" id="selYears'+(index++)+'">'+
                    '<option>1년차</option>' +
                    '<option>2년차</option>' +
                    '<option>3년차</option>' +
                    '<option>4년차</option>' +
                    '</select></div>';



    /*var html = <div class="necChild">'+
                   '<select class="change-main-position"+(index) id="test'+(index++) +'"><option>사원</option>'+
                   '<option>대리</option>'+
                   '<option>과장</option>'+
                   '<option>차장</option>'+
                   '<option>부장</option></select>'+
                   '<select class="change-sub-year">'+
                   '</select></div>';*/

    $("#nec").append(html2);
    document.querySelectorAll(".change-main-position").forEach(el => {
       el.addEventListener("change", changePositionYear);
    });
}


function deleteline(){

    //console.log($("#nec")); .children().last().remove();
    //$("#nec div:last-child").remove();
    $("#nec div:last-child").remove();
}

function init() {
        document.querySelectorAll(".change-main-position").forEach(el => {
            el.addEventListener("change", changePositionYear);
        });
}
init();

/* 취소 , 확인 버튼 기능 (구현해야함) */
function btn_cancel() {
    window.close()
}

function btn_save(){
    //const dept1Field = document.querySelector(".type2")[document.querySelector(".type2").selectedIndex].getAttribute("value")
    const depth1Field = $(".category-big option:selected").text();
    const depth2Skill = $(".category-mid option:selected").text();
    const depth3Course = $(".category-small option:selected").text();
    const lectureTitle = $(".inputLecture").val();
    const academyId = $(".selAcademy option:selected").text(); 
    const lectureUrl = $(".inputUrl").val();
    const themeLectureId = $(".selTheme option:selected").val();
    const empPositionArr = [];
    const empYearsArr = [];
    var i=0;
    const lastI = $(".necChild:last select").attr("id").substring(11);
    for(i; i<=lastI; i++){
        var selPosition ="#selPosition"+i;
        var selYears ="#selYears"+i;
        var empPosition  = $(selPosition+" option:selected").text();
        var empYears  = $(selYears+" option:selected").text();
        //console.log(empPosition);
        empPositionArr.push(empPosition);
        empYearsArr.push(empYears);
    }

    //console.log(empPositionArr);
    //console.log(empYearsArr);

    var onlineTmp = $('input:radio[name="onoffline"]:checked').attr('id');  
    const onlineYN =  $("label[for='"+onlineTmp+"']").text();
    var LevelTmp = $('input:radio[name="level"]:checked').attr('id');   
    const eduLevelId = $("label[for='"+LevelTmp+"']").text();
    var selectTmp = 0;
    if($("#recommchk").prop("checked")) {
        selectTmp = 1;
    };
    const lectureBestYn = selectTmp;

    const data = {
        "lecture" :{
            "depth1Field" : depth1Field,
            "depth2Skill" : depth2Skill,
            "depth3Course" : depth3Course,
            "lectureTitle" : lectureTitle,
            "academyId" : academyId,
            "lectureUrl" : lectureUrl,
            "themeLectureId" : themeLectureId,
            "empPosition" : empPositionArr,
            "empYears" : empYearsArr,
            "onlineYN" : onlineYN,
            "eduLevelId" : eduLevelId,
            "lectureBestYn" : lectureBestYn
        }
    }
    

    /** 강의 추가버튼 테스트시 풀것 */
    // $.ajax({
    //     url: "/lectureMng/add", 
    //     method: "POST",
    //     data: data,
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
        
    //       },
    //       error: function (x, s, e) {
    //           console.log(x, s, e);
    //       }
    //   }); 

    window.close()
}

/* 카테고리 select 설정 */
const setBigSelect = () => {
    const bigValue = catBigSelect.options[catBigSelect.selectedIndex].value;
    console.log(bigValue);
  
    if(bigValue == "IT"){
      $.ajax({
        url: "/json/Depth2.json", 
        method: "GET",
        data: "", // bigValue
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#lecture_Category2').empty();
            //catMidSample = [];
            
            $.each(data.Dept2, function(index,item){
              catMidSample.push(item.depth2_skill);
              appendOption(catMidSelect, catMidSample);
              console.log(catMidSample);
            });
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
      });
  
    }else if(bigValue == "비즈니스"){
      $.ajax({
        url: "/json/Depth2.json", 
        method: "GET",
        data: "", // bigValue
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#lecture_Category2').empty();
            //catMidSample = [];
            
            $.each(data.Dept2, function(index,item){
              catMidSample.push(item.depth2_skill);
              appendOption(catMidSelect, catMidSample);
              console.log(catMidSample);
            });
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
      });
  
    }
  
  };


const setSelectBtns = () => {
    catBigSelect.addEventListener("change", setBigSelect);
    //catMidSelect.addEventListener("change", setMidSelect);
};

function init() {
    setBigSelect();
    console.log('init');
    setSelectBtns();
}

init();

