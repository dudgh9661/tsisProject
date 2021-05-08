/* ---------------------------------------------------변수 선언 */
/* select영역 */
const lectureMain = document.querySelector(".lecture-main-select");
const recSelect = document.querySelector(".recommendation-sub");
const instSelect = document.querySelector(".institute-sub");
const catBigSelect = document.querySelector(".category-big");
const catMidSelect = document.querySelector(".category-mid");
const catSmallSelect = document.querySelector(".category-small");

/* div영역 */
const subDiv = document.querySelector(".lecture-select-sub");
const recDiv = document.querySelector(".lecture-select-sub__recommendation");
const insDiv = document.querySelector(".lecture-select-sub__institute");
const catDiv = document.querySelector(".lecture-select-sub__category");

/* 결과영역(테이블) */
const lectureResult = document.querySelector(".lecture-result-list");
/* 변수 선언 ---------------------------------------------------*/

/* ---------------------------------------------------샘플데이터 */
/* 교육기관 샘플 */
const recSample = [];
/* 교육기관 샘플 */
const instSample = [];
/* 카테고리 샘플 */
const catBigSample = [];
const catMidSample = [];
const catSmallSample = [];

/* 강의목록 샘플 */
const lectureSampleList = [
  {
    lectureId: 1,
    lectureBestYn: "Y",
    lectureTitle: "강의명1",
    depth1_field: "대분류1",
    depth2_skill: "중분류1",
    depth3_course: "소분류1",
    academyName: "기관명1",
    onlineYN: "Y",
    academyLoc: "역삼역",
    theme: ["주제1", "주제2"],
  },
];
/* 샘플데이터 ---------------------------------------------------*/

/* --------------------------------------------------- base function */
const lectureShow = (e1) => {
  e1.forEach((e2) => {
    e2.classList.add("lecture-active");
    e2.classList.remove("lecture-hidden");
  });
};

const lectureHide = (e1) => {
  e1.forEach((e2) => {
    e2.classList.add("lecture-hidden");
    e2.classList.remove("lecture-active");
  });
};

const appendOption = (e1, arr) => {
  e1.innerHTML = "";
  arr.forEach((e2) => {
    const tmp = document.createElement("option");
    tmp.value = e2;
    tmp.innerText = e2;
    e1.appendChild(tmp);
  });
};
const appendLectureResult = (lectureDataList) => {
  lectureDataList.forEach((e1) => {
    lectureResult.innerHTML = "";
    /* 리더추천 */
    const tmp = document.createElement("td");
    tmp.innerText = e1.lectureBestYn;

    /* No. */
    const tmp2 = document.createElement("td");
    tmp2.innerText = e1.lectureId;

    /* 카테고리 */
    const tmp3 = document.createElement("td");
    tmp3.innerText = e1.depth1_field + ">" + e1.depth2_skill + ">" + e1.depth3_course;

    /* 강좌명 */
    const tmp4 = document.createElement("td");
    tmp4.innerText = e1.lectureTitle;

    /* 교육기관 */
    const tmp5 = document.createElement("td");
    tmp5.innerText = e1.academyName;

    /* 온/오프라인 */
    const tmp6 = document.createElement("td");
    tmp6.innerText = e1.onlineYN;

    /* 위치 */
    const tmp7 = document.createElement("td");
    tmp7.innerText = e1.academyLoc;

    /* 삭제버튼 */
    const tmp8 = document.createElement("td");
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.innerText = "x";
    tmp8.appendChild(btn);

    const tr = document.createElement("tr");
    tr.appendChild(tmp);
    tr.appendChild(tmp2);
    tr.appendChild(tmp3);
    tr.appendChild(tmp4);
    tr.appendChild(tmp5);
    tr.appendChild(tmp6);
    tr.appendChild(tmp7);
    tr.appendChild(tmp8);
    lectureResult.appendChild(tr);
  });
};
/*  base function ---------------------------------------------------*/

/* 강좌 수정기능 */
function onRowClick() {
//   window.location.href = "change";
  window.open("change", "강좌 수정","width=600px, height=600px");
//   window.open("file:///C:/Users/User/JeongMin/2%EC%B0%A8%EA%B5%90%EC%9C%A1/survey/survey.html", "안녕하세요^^", "width=600,height=800");
}
/* 강좌 추가 */
function onAddClick() {
    window.open("addlecture", "강좌 추가","width=600px, height=600px");
  }

/* 강좌 삭제기능 */
function onXClick(e) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });

    console.log(e);
  swalWithBootstrapButtons
    .fire({
      title: "삭제하시겠습니까?",
      text: "되돌릴 수 없는 작업입니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
            url: "lectureMng/" + e.target.parentNode.getAttribute("data-id"),
            method: "DELETE",
            success: function() {
                swalWithBootstrapButtons.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("취소되었습니다");
      }
    });
}

/* main select 설정 */
const setMain = () => {
  const mainValue = lectureMain.options[lectureMain.selectedIndex].value;
  if (mainValue == "전체") {
    lectureHide([subDiv]);
  } else {
    lectureShow([subDiv]);
    if (mainValue == "추천") {
      lectureShow([recDiv]);
      lectureHide([insDiv, catDiv]);
      // appendOption(recSelect, recSample);

      $.ajax({
        url: "/theme/getThemeList",
        method: "GET",
        // data: "", // bigValue
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('.recommendation-sub').empty();
            
            $.each(data, function(index,item){
              recSample.push(item.theme);
              appendOption(recSelect, recSample);
              console.log(recSample);
            });
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
      });

    } else if (mainValue == "교육기관") {
      lectureShow([insDiv]);
      lectureHide([recDiv, catDiv]);
      // appendOption(instSelect, instSample);

      $.ajax({
        url: "/academy/getList",
        method: "GET",
        // data: "", // bigValue
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('.institute-sub').empty();
            
            $.each(data.organi, function(index,item){
              instSample.push(item.academyName);
              appendOption(instSelect, instSample);
              console.log(instSample);
            });
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
      });

    } else if (mainValue == "카테고리") {
      lectureShow([catDiv]);
      lectureHide([recDiv, insDiv]);

      $.ajax({
        url: "/category/getDepth1",
        method: "GET",
        data: "",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            $('#lecture_Category1').empty();
            //catBigSample = [];
            $.each(data.Dept1, function(index,item){
              catBigSample.push(item.depth1_field);
              
              appendOption(catBigSelect, catBigSample);
              console.log(catBigSample);

              // $('#lecture_Category2').empty();
              $.ajax({
                url: "/category/getDepth2",
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

                    $.ajax({
                      url: "/category/getDepth3",
                      method: "GET",
                      data: "",
                      dataType: "json",
                      success: function (data) {
                          console.log(data);
                          $('#lecture_Category3').empty();
                          //catMidSample = [];
                          
                          $.each(data.Dept3, function(index,item){
                            catSmallSample.push(item.depth3_course);
                            appendOption(catSmallSelect, catSmallSample);
                            console.log(catSmallSelect);
                          });
                        },
                        error: function (x, s, e) {
                            console.log(x, s, e);
                        }
                    }); //소분류 ajax끝
                  },
                  error: function (x, s, e) {
                      console.log(x, s, e);
                  }
              }); //중분류 ajax끝

              //$('#lecture_Category1').append('<option>'+item.depth1_field+'</option>');
            });
          },
          error: function (x, s, e) {
              console.log(x, s, e);
          }
      }); //대분류 ajax끝


    }
  }
};

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

const setMidSelect = () => {
  appendOption(catSmallSelect, catSmallSample);



  
};



const setSelectBtns = () => {
  lectureMain.addEventListener("change", setMain);
  catBigSelect.addEventListener("change", setBigSelect);
  catMidSelect.addEventListener("change", setMidSelect);
};

/* 검색버튼 설정 */
const setSearch = () => {
  appendLectureResult(lectureSampleList);
  
  $.ajax({
    url: "/json/lecture.json", 
    method: "GET",
    data: "",
    dataType: "json",
    success: function (data) {
        console.log(data);
        
        $('#lectureInfo').empty();
        $.each(data.lectures, function(index,item){
            $('#lectureInfo').append('<tr><td scope="col">'+item.lectureBestYn+'</td>'+
                    '<td scope="col">'+(index+1)+'</td><td scope="col">'+item.depth1_field+'>'+item.depth2_skill+'>'+item.depth3_course+'</td>'+
                    '<td scope="col" onClick="onRowClick()" class="lname">'+item.lectureTitle+'</td><td scope="col">'+item.academyName+'</td><td scope="col">'+item.onlineYn+'</td>'+
                    '<td scope="col">'+item.academyLoc+'</td><td scope="col"><button onclick="onXClick()" class="btn btn-danger">x</button></td></tr>');
        });
      },
      error: function (x, s, e) {
          console.log(x, s, e);
      }
  });
};
const setSearchBtn = () => {
  document.querySelector(".lecture-search-icon").addEventListener("click", setSearch);
};

function init() {
  setSelectBtns();
  setSearchBtn();
}
init();



