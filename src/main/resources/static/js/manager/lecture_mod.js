var bigCatStatus = false;
var midCatStatus = false;
var smallCatStatus = false;
var themeStatus = false;
var academyStatus = false;

/*------------------------------------------------------base code*/
const appendOptionWId = (e1, ins, ids) => {
//  e1.innerHTML = "";
  for(let i = 0; i < ins.length; i++) {
    const tmp = document.createElement("option");
    tmp.value = ids[i];
    tmp.innerText = ins[i];
    e1.appendChild(tmp);
  }
};
const appendOption = (e1, arr) => {
//  e1.innerHTML = "";
  arr.forEach((e2) => {
    const tmp = document.createElement("option");
    tmp.value = e2;
    tmp.innerText = e2;
    e1.appendChild(tmp);
  });
};
/* base code ------------------------------------------------------*/

function pushCheck() {
    // if(temp1[temp1.selectedIndex].id  != "recommchk") {
    //     const itxt = document.querySelector(".ITxt");
    // }

    // itxt.checked = true;
}

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
//    console.log(selected);
}
//pushCheck();

// 연차
var subOptions = {

   first: ['1년차', '2년차', '3년차', '4년차', '5년차'],

   rest: ['1년차', '2년차', '3년차', '4년차'],

   none: []
}


//직급별 연차 표시 함수


function changePositionYear (event) {
   const mainPosition = event.target;
//   console.log(mainPosition);
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

    $("#nec").append(html2);
    document.querySelectorAll(".change-main-position").forEach(el => {
       el.addEventListener("change", changePositionYear);
    });
}


function deleteline(){
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
    const depth1Field = $(".bigCat option:selected").text();
    const depth2Skill = $(".midCat option:selected").text();
    const depth3Course = $(".smallCat option:selected").text();
    const lectureTitle = $(".inputLecture").val();
    const academyId = $(".selAcademy option:selected")[0].value;
    const lectureUrl = $(".lectureUrl").val();
    const themeLectureId = $(".selTheme option:selected").val();
    const empPositionArr = [];
    const empYearsArr = [];
    var i=0;
    const necChildren = [...$(".necChild")];
    const emp = [];
    necChildren.forEach(e1 => {
        const tmpPos = e1.querySelector(".change-main-position").value;
        const tmpYear = e1.querySelector(".change-sub-year").value.replace("년차", "");
        if(emp.filter(el => el["empPos"]== tmpPos && el["empYear"] == tmpYear).length <= 0) {
            emp.push({
                 "empPosition": tmpPos,
                 "empYears": tmpYear
            })
        }
    })

    var onlineTmp = $('input:radio[name="onoffline"]:checked').attr("value");
    var LevelTmp = $('input:radio[name="level"]:checked').attr('id');
    const eduLevel = $('input:radio[name="level"]:checked').attr("value");
    let eduLevelId = "";
    if(eduLevel == "basiclecture") {
        eduLevelId = "ET003";
    } else if(eduLevel == "electivelecture") {
        eduLevelId = "ET002";
    } else { // "prolecture"
        eduLevelId = "ET001";
    }
    var lectureBestYn = 0;
    if($("#recommchk").prop("checked")) {
        lectureBestYn = 1;
    };

    const data = {
        "depth1Field" : depth1Field,
        "depth2Skill" : depth2Skill,
        "depth3Course" : depth3Course,
        "lectureTitle" : lectureTitle,
        "academyId" : academyId, // "EI001"
        "lectureUrl" : lectureUrl,
        "themeLectureId" : themeLectureId, //1
        "empDtoList" : emp,
        "onlineYn" : onlineTmp, //0,1
        "eduLevelId" : eduLevelId, //"ET003"
        "lectureBestYn" : lectureBestYn // 1
    }

    console.log(JSON.stringify(data));
     $.ajax({
         url: "/lectureMng/add",
         method: "POST",
         data: JSON.stringify(data),
         dataType: "json",
         contentType: "application/json",
         success: function (data) {
             console.log(data);
             self.close();
           },
           error: function (x, s, e) {
               console.log(x, s, e);
           }
    });

}

const btn_modify = () => {
    const lectureId = document.location.search.replace("?", "").split("&").filter(el => el.split("=")[0] == "lectureId")[0].split("=")[1];
    const depth1Field = $(".bigCat option:selected").text();
    const depth2Skill = $(".midCat option:selected").text();
    const depth3Course = $(".smallCat option:selected").text();
    const lectureTitle = $(".inputLecture").val();
    const academyId = $(".selAcademy option:selected")[0].value;
    const lectureUrl = $(".lectureUrl").val();
    const themeLectureId = $(".selTheme option:selected").val();
    const empPositionArr = [];
    const empYearsArr = [];
    var i=0;
    const necChildren = [...$(".necChild")];
    const emp = [];
    necChildren.forEach(e1 => {
        const tmpPos = e1.querySelector(".change-main-position").value;
        const tmpYear = e1.querySelector(".change-sub-year").value.replace("년차", "");
        if(emp.filter(el => el["empPos"]== tmpPos && el["empYear"] == tmpYear).length <= 0) {
            emp.push({
                 "empPosition": tmpPos,
                 "empYears": tmpYear
            })
        }
    })

    var onlineTmp = $('input:radio[name="onoffline"]:checked').attr("value");
    var LevelTmp = $('input:radio[name="level"]:checked').attr('id');
    const eduLevel = $('input:radio[name="level"]:checked').attr("value");
    let eduLevelId = "";
    if(eduLevel == "basiclecture") {
        eduLevelId = "ET003";
    } else if(eduLevel == "electivelecture") {
        eduLevelId = "ET002";
    } else { // "prolecture"
        eduLevelId = "ET001";
    }
    var lectureBestYn = 0;
    if($("#recommchk").prop("checked")) {
        lectureBestYn = 1;
    };

    const data = {
        "depth1Field" : depth1Field,
        "depth2Skill" : depth2Skill,
        "depth3Course" : depth3Course,
        "lectureTitle" : lectureTitle,
        "academyId" : academyId, // "EI001"
        "lectureUrl" : lectureUrl,
        "themeLectureId" : themeLectureId, //1
        "empDtoList" : emp,
        "onlineYn" : onlineTmp, //0,1
        "eduLevelId" : eduLevelId, //"ET003"
        "lectureBestYn" : lectureBestYn // 1
    }

    console.log(JSON.stringify(data));
     $.ajax({
         url: "/lectureMng/modify/confirm/" + lectureId,
         method: "PUT",
         data: JSON.stringify(data),
         dataType: "json",
         contentType: "application/json",
         success: function (data) {
             console.log(data);
             self.close();
           },
           error: function (x, s, e) {
//               console.log(x, s, e);
           }
    });

}

/*-----------------------------------------------------카테고리 select태그 설정*/
const setBigCatClick = (e) => {
    if(!bigCatStatus) {
        console.log("big-click");
        console.log(bigCatStatus, midCatStatus, smallCatStatus);
        bigCatStatus = true;
          const catBigSample = [];
          $.ajax({
            url: "/category/getDepth1",
            method: "GET",
            success: function (data) {
                temp1 = data[0];
                $.each(data, function(index,item){
                  catBigSample.push(item);
                });
                  appendOption(e.target, catBigSample);
              },
              error: function (x, s, e) {
    //              console.log(x, s, e);
              },
              complete: function() {

              }
          }); //대분류 ajax끝
    }
}
const setMidCatClick = (e) => {
    if(!midCatStatus) {
        console.log("mid-click");
        console.log(bigCatStatus, midCatStatus, smallCatStatus);
        midCatStatus = true;
          let temp1 = document.querySelector(".bigCat")[document.querySelector(".bigCat").selectedIndex].innerText;
          /* 중분류 ajax 시작 */
                const catMidSample = [];
                $.ajax({
                  url: "/category/getDepth2?depth1Field=" + temp1,
                  method: "GET",
                  dataType: "json",
                  success: function (data) {
                      temp2 = data[0];
                      $.each(data, function(index,item){
                        catMidSample.push(item);
                      });
                        appendOption(e.target, catMidSample);
                    },
                    error: function (x, s, e) {
//                        console.log(x, s, e);
                    },
                    complete: function() {
                    }
                });
        }
        /* 중분류 ajax 끝 */
}
const setSmallCatClick = (e) => {
    /* 소분류 ajax 시작 */
    if(!smallCatStatus) {
        console.log("small-click");
        console.log(bigCatStatus, midCatStatus, smallCatStatus);
        smallCatStatus = true;
          let temp1 = document.querySelector(".bigCat")[document.querySelector(".bigCat").selectedIndex].innerText;
          let temp2 = document.querySelector(".midCat")[document.querySelector(".midCat").selectedIndex].innerText;
          const catSmallSample = [];
          $.ajax({
                url: "/category/getDepth3?depth1Field=" + temp1 + "&depth2Skill=" + temp2,
                method: "GET",
                success: function (data) {
    //                                console.log(data);
                    $.each(data, function(index,item){
                      catSmallSample.push(item);
                    });
                      appendOption(e.target, catSmallSample);
                  },
                  error: function (x, s, e) {
    //                                  console.log(x, s, e);
                  }
          });
      }
      /* 소분류 ajax 끝 */
}
const setCatClick = () => {
    document.querySelector(".bigCat").addEventListener("click", setBigCatClick);
    document.querySelector(".midCat").addEventListener("click", setMidCatClick);
    document.querySelector(".smallCat").addEventListener("click", setSmallCatClick);
}
const setBigCatChange = () => {
    setBigCatClick();
    document.querySelector(".midCat").innerHTML = "";
    midCatStatus = false;
    document.querySelector(".smallCat").innerHTML = "";
    smallCatStatus = false;
    console.log("big-change")
    console.log(bigCatStatus, midCatStatus, smallCatStatus);
}
const setMidCatChange = () => {
    setMidCatClick();
    document.querySelector(".smallCat").innerHTML = "";
    smallCatStatus = false;
    console.log("mid-change")
    console.log(bigCatStatus, midCatStatus, smallCatStatus);
}
const setSmallCatChange = () => {
    setMidCatClick();
    console.log("small-change")
    console.log(bigCatStatus, midCatStatus, smallCatStatus);
}
const setCatChange = () => {
    document.querySelector(".bigCat").addEventListener("change", setBigCatChange);
    document.querySelector(".midCat").addEventListener("change", setMidCatChange);
    document.querySelector(".smallCat").addEventListener("change", setSmallCatChange);
}
/*카테고리 select태그 설정-----------------------------------------------------*/

/*-----------------------------------------------------추천주제 select태그 설정*/
const setTheme = () => {
    if(!themeStatus) {
        themeStatus = true;

        const ins = [];
        const ids = [];
        $.ajax({
            url: "/theme/getThemeList",
            method: "GET",
            success: function (data) {
//            console.log(data);

            $.each(data, function(index,item){
              ins.push(item.theme);
              ids.push(item.themeLectureId);
            });
              appendOptionWId(document.querySelector(".selTheme"), ins, ids);
            },
            error: function (x, s, e) {
//              console.log(x, s, e);
            }
        });
    }
}
const setThemeClick = () => {
    document.querySelector(".selTheme").addEventListener("click", setTheme);
}
/*추천주제 select태그 설정-----------------------------------------------------*/

/*교육기관 select태그 설정-----------------------------------------------------*/
const setAcademy = () => {
    if(!academyStatus) {
        academyStatus = true;

        const ins = [];
        const ids = [];
        $.ajax({
            url: "/academy/getListAjax?curpage=0",
            method: "GET",
            success: function (data) {
//            console.log(data);
            $.each(data.organi, function(index,item){
              ins.push(item.academyName);
              ids.push(item.academyId);
            });
            document.querySelector(".selAcademy").innerHTML = "";
            appendOptionWId(document.querySelector(".selAcademy"), ins, ids);
            },
            error: function (x, s, e) {
//              console.log(x, s, e);
            }
        });
    }
}
const setAcademyClick = () => {
    document.querySelector(".selAcademy").addEventListener("click", setAcademy);
}
/*-----------------------------------------------------교육기관 select태그 설정*/

setCatClick();
setCatChange();
setThemeClick();
setAcademyClick();