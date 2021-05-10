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

/* 강의목록 샘플 */
var lectureSampleList = [
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
  }
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

const appendOptionWId = (e1, ins, ids) => {
  e1.innerHTML = "";
  for(let i = 0; i < ins.length; i++) {
    const tmp = document.createElement("option");
    tmp.value = ids[i];
    tmp.innerText = ins[i];
    e1.appendChild(tmp);
  }
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
//    console.log(lectureDataList)
    lectureResult.innerHTML = "";
    let cnt = 1;
    lectureDataList.forEach((e1) => {
        if(cnt > 30) {
            return;
        }
        /* 리더추천 */
        const tmp = document.createElement("td");
        if(e1.lectureBestYn == 1) {
            tmp.innerHTML = "<img class='lecture-star-icon' src='/img/star.png''>";
        }

        /* No. */
        const tmp2 = document.createElement("td");
        tmp2.innerText = cnt++;

        /* 카테고리 */
        const tmp3 = document.createElement("td");
        tmp3.innerText = e1.depth1Field + ">" + e1.depth2Skill + ">" + e1.depth3Course;

        /* 강좌명 */
        const tmp4 = document.createElement("td");
        tmp4.innerText = e1.lectureTitle;
        tmp4.classList.add("lecture-result-item");
        tmp4.setAttribute("data-id", e1.lectureId);

        /* 교육기관 */
        const tmp5 = document.createElement("td");
        tmp5.innerText = e1.academyName;

        /* 온/오프라인 */
        const tmp6 = document.createElement("td");
        if(e1.onlineYn == 0) {
            tmp6.innerText = "오프라인";
        } else {
            tmp6.innerText = "온라인";
        }

        /* 위치 */
        const tmp7 = document.createElement("td");
        tmp7.innerText = e1.academyLoc;

        /* 삭제버튼 */
        const tmp8 = document.createElement("td");
        tmp8.setAttribute("data-id", e1.lectureId);
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-danger");
        btn.innerText = "x";
//        btn.setAttribute("onclick", "onXClick()");
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

/* 강좌 삭제기능 */
const setDelBtn = (e) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: true,
  });

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
            url: "/lectureMng/" + e.target.parentNode.getAttribute("data-id"),
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

const setDelBtns = () => {
    document.querySelectorAll(".btn-danger").forEach(e1 => {
        e1.addEventListener("click", setDelBtn);
    })
}

/* 강좌 수정기능 */
const setModifyBtn = (e) => {
    console.log(e);
    console.log(e.target);
  window.open("/lectureMng/modify?lectureId=" + e.target.getAttribute("data-id"), "강좌 수정","width=600px, height=600px");
}
const setModifyBtns = () => {
    document.querySelectorAll(".lecture-result-item").forEach(e1 => {
        e1.addEventListener("click", setModifyBtn);
    })
}

/* 강좌 추가 */
function onAddClick() {
    window.open("/lectureMng/add", "강좌 추가","width=600px, height=600px");
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

      const ins = [];
      const ids = [];
      $.ajax({
        url: "/theme/getThemeList",
        method: "GET",
        success: function (data) {
//            console.log(data);
            $('.recommendation-sub').empty();

            $.each(data, function(index,item){
              ins.push(item.theme);
              ids.push(item.themeLectureId);
            });
              appendOptionWId(recSelect, ins, ids);
          },
          error: function (x, s, e) {
//              console.log(x, s, e);
          }
      });

    } else if (mainValue == "교육기관") {
      lectureShow([insDiv]);
      lectureHide([recDiv, catDiv]);

      let ids = [];
      let names = [];
      $.ajax({
        url: "/academy/getListAjax?curpage=0",
        method: "GET",
        success: function (data) {
            $('.institute-sub').empty();
            
            $.each(data.organi, function(index,item){
                ids.push(item.academyId);
                names.push(item.academyName);
            });
              appendOptionWId(instSelect, names, ids);
          },
          error: function (x, s, e) {
//              console.log(x, s, e);
          }
      });

    } else if (mainValue == "카테고리") {

      lectureShow([catDiv]);
      lectureHide([recDiv, insDiv]);
      let temp1 = "";
      let temp2 = "";
      const catBigSample = [];

      $.ajax({
        url: "/category/getDepth1",
        method: "GET",
        success: function (data) {
            temp1 = data[0];
//            console.log(data);
            $('#lecture_Category1').empty();
            $.each(data, function(index,item){
              catBigSample.push(item);
            });
              appendOption(catBigSelect, catBigSample);
          },
          error: function (x, s, e) {
//              console.log(x, s, e);
          },
          complete: function() {
          /* 중분류 ajax 시작 */
                const catMidSample = [];
                $.ajax({
                  url: "/category/getDepth2?depth1Field=" + temp1,
                  method: "GET",
                  dataType: "json",
                  success: function (data) {
                      temp2 = data[0];
//                      console.log(data);
                      $('#lecture_Category2').empty();
                      //catMidSample = [];
                      $.each(data, function(index,item){
                        catMidSample.push(item);
                      });
                        appendOption(catMidSelect, catMidSample);
                    },
                    error: function (x, s, e) {
//                        console.log(x, s, e);
                    },
                    complete: function() {
                          /* 소분류 ajax 시작 */
                            const catSmallSample = [];
                          $.ajax({
                            url: "/category/getDepth3?depth1Field=" + temp1 + "&depth2Skill=" + temp2,
                            method: "GET",
                            success: function (data) {
//                                console.log(data);
                                $('#lecture_Category3').empty();

                                $.each(data, function(index,item){
                                  catSmallSample.push(item);
                                });
                                  appendOption(catSmallSelect, catSmallSample);
                              },
                              error: function (x, s, e) {
//                                  console.log(x, s, e);
                              }
                          });
                          /* 소분류 ajax 끝 */
                    }
                });
          /* 중분류 ajax 끝 */
          }
      }); //대분류 ajax끝
    }
  }
};

/* 카테고리 select 설정 */
const setBigSelect = () => {
  const bigValue = catBigSelect.options[catBigSelect.selectedIndex].value;
//  console.log(bigValue);
  let temp2 = "";

  /* 중분류 ajax 시작 */
        const catMidSample = [];
        $.ajax({
          url: "/category/getDepth2?depth1Field=" + bigValue,
          method: "GET",
          dataType: "json",
          success: function (data) {
              temp2 = data[0];
//                      console.log(data);
              $('#lecture_Category2').empty();
              //catMidSample = [];
              $.each(data, function(index,item){
                catMidSample.push(item);
              });
                appendOption(catMidSelect, catMidSample);
            },
            error: function (x, s, e) {
//                        console.log(x, s, e);
            },
            complete: function() {
                  /* 소분류 ajax 시작 */
                    const catSmallSample = [];
                  $.ajax({
                    url: "/category/getDepth3?depth1Field=" + bigValue + "&depth2Skill=" + temp2,
                    method: "GET",
                    success: function (data) {
//                                console.log(data);
                        $('#lecture_Category3').empty();

                        $.each(data, function(index,item){
                          catSmallSample.push(item);
                        });
                          appendOption(catSmallSelect, catSmallSample);
                      },
                      error: function (x, s, e) {
//                                  console.log(x, s, e);
                      }
                  });
                  /* 소분류 ajax 끝 */
            }
        });
};

const setMidSelect = () => {
  const bigValue = catBigSelect.options[catBigSelect.selectedIndex].value;
  const midValue = catMidSelect.options[catMidSelect.selectedIndex].value;

  /* 소분류 ajax 시작 */
    const catSmallSample = [];
  $.ajax({
    url: "/category/getDepth3?depth1Field=" + bigValue + "&depth2Skill=" + midValue,
    method: "GET",
    success: function (data) {
//        console.log(data);
        $('#lecture_Category3').empty();

        $.each(data, function(index,item){
          catSmallSample.push(item);
        });
          appendOption(catSmallSelect, catSmallSample);
      },
      error: function (x, s, e) {
//      console.log(x, s, e);
      }
  });
  /* 소분류 ajax 끝 */
};

const setSelectBtns = () => {
  lectureMain.addEventListener("change", setMain);
  catBigSelect.addEventListener("change", setBigSelect);
  catMidSelect.addEventListener("change", setMidSelect);
};

const setSearch = () => {
    let url = "/lectureMng/";
    let data = {};
    let searchInput = document.querySelector(".lecture-title-input").value;

    if(lectureMain.options[lectureMain.selectedIndex].value == "전체") {
        data = {}
    } else if(lectureMain.options[lectureMain.selectedIndex].value == "추천") {
        url += "recommend";
        let recSub = document.querySelector(".recommendation-sub");
        data = {"themeLectureId": recSub[recSub.selectedIndex].value};
    } else if(lectureMain.options[lectureMain.selectedIndex].value == "교육기관") {
        url += "academy";
        data = {"academyId": instSelect[instSelect.selectedIndex].value};
    } else if(lectureMain.options[lectureMain.selectedIndex].value == "카테고리") {
        let d1 = document.querySelector("#lecture_Category1");
        let d2 = document.querySelector("#lecture_Category2");
        let d3 = document.querySelector("#lecture_Category3");
        url += "category";
        data = {
            "depth1Field": d1[d1.selectedIndex].value,
            "depth2Skill": d2[d2.selectedIndex].value,
            "depth3Course": d3[d3.selectedIndex].value,
           };
    }
    if(searchInput !== "") {
        data["lectureTitle"] = searchInput;
    }

//    console.log(url, data);
  $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
        lectureSampleList = data.lectureResponseDtoList;
        appendLectureResult(lectureSampleList);
        setDelBtns();
        setModifyBtns();
    },error: function (x, s, e) {
//          console.log(x, s, e);
    }
  });
}
/* 검색버튼 설정 */
const setSearchBtn = () => {
  document.querySelector(".lecture-search-icon").addEventListener("click", setSearch);
};

function init() {
  setSelectBtns();
  setSearchBtn();
  setDelBtns();
}
init();



