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
const recSample = ["추천1_sam", "추천2_sam", "추천3_sam"];
/* 교육기관 샘플 */
const instSample = ["교육기관1_sam", "교육기관2_sam", "교육기관3_sam"];
/* 카테고리 샘플 */
const catBigSample = ["대분류1_sam", "대분류2_sam", "대분류3_sam"];
const catMidSample = ["중분류1_sam", "중분류2_sam", "중분류3_sam"];
const catSmallSample = ["소분류1_sam", "소분류2_sam", "소분류3_sam"];

/* 강의목록 샘플 */
const lectureSampleList = [
  {
    lectureId: 1,
    lectureBestYn: "Y",
    lectureTitle: "강의명1",
    depth1Field: "대분류1",
    depth2Skill: "중분류1",
    depth3Course: "소분류1",
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
    tmp3.innerText = e1.depth1Field + ">" + e1.depth2Skill + ">" + e1.depth3Course;

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
  window.location.href = "change";
}

/* 강좌 삭제기능 */
function onXClick() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
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
        swalWithBootstrapButtons.fire("Deleted!", "Your file has been deleted.", "success");
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
      appendOption(recSelect, recSample);
    } else if (mainValue == "교육기관") {
      lectureShow([insDiv]);
      lectureHide([recDiv, catDiv]);
      appendOption(instSelect, instSample);
    } else if (mainValue == "카테고리") {
      lectureShow([catDiv]);
      lectureHide([recDiv, insDiv]);
      appendOption(catBigSelect, catBigSample);
    }
  }
};

/* 카테고리 select 설정 */
const setBigSelect = () => {
  appendOption(catMidSelect, catMidSample);
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
};
const setSearchBtn = () => {
  document.querySelector(".lecture-search-icon").addEventListener("click", setSearch);
};

function init() {
  setSelectBtns();
  setSearchBtn();
}
init();
