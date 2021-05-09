/* ---------------------------------------------------변수 선언 */
const showList = document.querySelector(".institution-show-list");
const showMenu = document.querySelector(".institution-show-menu");
const choiceA = document.querySelector(".institution-choice-a");
const choiceB = document.querySelector(".institution-choice-b");
const addBtn = document.querySelector(".institution-btn-add");
var curPage = 1;
const modAddUrl = "/academyModify/getAcademy";
/* 변수 선언 ---------------------------------------------------*/

/* sample data */
const resultDataList = {
  totalCount: 1,
  organi: [
    {
      academyId: "1",
      academyName: "기관명",
      academyDetail: "기관설명",
      academyLogoUrl: "기관로고url",
      academyUrl: "기관url",
      count: 10,
      academyLoc: "주소",
    },
  ],
};
/*------------------------------------------------------base code */
const setDelBtn = (e) => {
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
        fetch('/academy/delList?academyIdList=' + e.target.parentNode.getAttribute("data-id"), {
          method: 'POST',
          mode: 'same-origin',
        }).then(() => {
          swalWithBootstrapButtons.fire("삭제완료!", "성공적으로 삭제되었습니다", "success");
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("취소되었습니다");
      }
    });
};
const moveToUrl = (url, keys, values) => {
  const form = document.createElement("form");
  const parm = new Array();
  const input = new Array();

  form.action = url;
  form.method = "post";

  for (let i = 0; i < keys.length; i++) {
    parm.push([keys[i], values[i]]);
  }

  for (var i = 0; i < parm.length; i++) {
    input[i] = document.createElement("input");
    input[i].setAttribute("type", "hidden");
    input[i].setAttribute("name", parm[i][0]);
    input[i].setAttribute("value", parm[i][1]);
    form.appendChild(input[i]);
  }
  document.body.appendChild(form);
  form.submit();
};
/* base code ------------------------------------------------------*/

/*------------------------------------------------------ CRUD버튼 설정 */
const setCRUDBtns = () => {
  setAddBtn();
  setDelBtns();
  setModifyBtns();
};
/* 삭제버튼 설정 */
const setDelBtns = () => {
  document.querySelectorAll(".del").forEach((el) => {
    el.addEventListener("click", setDelBtn);
  });
};
/* 추가버튼 설정 */
const setAddBtn = () => {
  document.querySelector(".institution-btn-add").addEventListener("click", () => (
      window.open(
          modAddUrl + "?academyId=0",
          "안녕하세요^^",
          "width=400,height=370")
  ));
};
/* 수정버튼 설정 */
const setModifyBtns = () => {
  document.querySelectorAll(".modify").forEach((e1) => {
    e1.addEventListener("click", (e2) => (
        window.open(
            modAddUrl + "?academyId=" +e2.target.parentNode.getAttribute("data-id"),
            "안녕하세요^^",
            "width=400,height=370")
    ));
  });
};
/* CRUD버튼 설정 ------------------------------------------------------*/

/*------------------------------------------------------ choice a/b로 전환해서 보기 */
const setShow = () => {
  setShowList();
  setShowMenu();
};
/* choice b로 전환 */
const setShowList = () => {
  showList.addEventListener("click", () => {
    choiceA.classList.add("institution-disable");
    choiceA.classList.remove("institution-active");

    choiceB.classList.add("institution-active");
    choiceB.classList.remove("institution-disable");
  });
};

/* choice a로 전환 */
const setShowMenu = () => {
  showMenu.addEventListener("click", () => {
    choiceA.classList.add("institution-active");
    choiceA.classList.remove("institution-disable");

    choiceB.classList.add("institution-disable");
    choiceB.classList.remove("institution-active");
  });
};
/* choice a/b로 전환해서 보기 ------------------------------------------------------*/

const setChoiceA = (dataList) => {
  choiceA.innerHTML = "";
  dataList.forEach((e1) => {
    /* institution-item 생성 */
    const item = document.createElement("div");
    item.classList.add("institution-item");

    /* card-body 생성 */
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    /* card-body_thumb 생성 */
    const thumb = document.createElement("div");
    thumb.classList.add("card-body_thumb");

    /* a태그 생성 */
    const aTag = document.createElement("a");
    aTag.setAttribute("href", e1.academyUrl);
    aTag.setAttribute("target", "_blank");

    /* institution-logo 생성 */
    const instLogo = document.createElement("div");
    instLogo.classList.add("institution-logo");

    /* logoImg 생성 */
    const logoImg = document.createElement("img");
    logoImg.classList.add("logoImg");
    logoImg.src = e1.academyLogoUrl;

    instLogo.appendChild(logoImg);
    aTag.appendChild(instLogo);
    thumb.appendChild(aTag);
    cardBody.appendChild(thumb);

    /* card-body_cont 생성 */
    const cardCont = document.createElement("div");
    cardCont.classList.add("card-body_cont");

    /* card-body_cont_name 생성 */
    const contName = document.createElement("div");
    contName.classList.add("card-body_cont_name");
    contName.innerHTML = "<strong>" + e1.academyName + "</strong>";

    /* card-body_cont_info 생성 */
    const contInfo = document.createElement("div");
    contInfo.classList.add("card-body_cont_info");
    contInfo.innerText = e1.academyDetail;

    /* card-body_cont_location 생성 */
    const contLocation = document.createElement("div");
    contLocation.classList.add("card-body_cont_location");
    contLocation.innerText = e1.academyLoc;

    cardCont.appendChild(contName);
    cardCont.appendChild(contInfo);
    cardCont.appendChild(contLocation);

    /* card-body_btn 생성 */
    const cardBtn = document.createElement("div");
    cardBtn.classList.add("card-body_btn");
    cardBtn.setAttribute("data-id", e1.academyId);

    /* 수정버튼 생성 */
    const btnModify = document.createElement("div");
    btnModify.classList.add("modify");
    btnModify.classList.add("btn");
    btnModify.classList.add("btn-secondary");
    btnModify.innerText = "수정";

    /* 삭제버튼 생성 */
    const btnDel = document.createElement("div");
    btnDel.classList.add("del");
    btnDel.classList.add("btn");
    btnDel.classList.add("btn-danger");
    btnDel.innerText = "삭제";

    cardBtn.appendChild(btnModify);
    cardBtn.appendChild(btnDel);
    cardBody.appendChild(cardCont);
    cardBody.appendChild(cardBtn);
    item.appendChild(cardBody);
    choiceA.appendChild(item);
  });
};
const setChoiceB = (dataList) => {
  choiceB.innerHTML = "";
  choiceB.innerHTML =
    "<div class='institution-item'><div class='institution-logo'>기관명</div><div class='institution-description'>기관 소개</div><div class='institution-position'>장소</div><div class='institution-class'>강의수</div><div class='institution-edit'>수정</div><div class='institution-del'>삭제</div></div>";
  dataList.forEach((e1) => {
    /* item 생성 */
    const item = document.createElement("div");
    item.classList.add("institution-item");

    /* item logo 생성 */
    const itemLogo = document.createElement("div");
    itemLogo.classList.add("institution-logo");

    /* item logo 생성 */
    const itemImg = document.createElement("img");
    itemImg.classList.add("logoImg");
    itemImg.setAttribute("src", e1.academyLogoUrl);

    itemLogo.appendChild(itemImg);

    /* item description 생성 */
    const itemDescription = document.createElement("div");
    itemDescription.classList.add("institution-description");

    /* div 생성 */
    const desc = document.createElement("div");
    desc.innerText = e1.academyDetail;

    itemDescription.appendChild(desc);

    /* item position 생성 */
    const itemPosition = document.createElement("div");
    itemPosition.classList.add("institution-position");
    itemPosition.innerText = e1.academyLoc;

    /* item class (강의수) 생성 */
    const itemClass = document.createElement("div");
    itemClass.classList.add("institution-class");
    itemClass.innerText = e1.count;

    /* 수정 생성 */
    const editDiv = document.createElement("div");
    editDiv.classList.add("institution-edit");
    editDiv.setAttribute("data-id", e1.academyId);

    /* 수정 버튼 생성 */
    const editBtn = document.createElement("button");
    editBtn.classList.add("modify");
    editBtn.classList.add("btn");
    editBtn.classList.add("btn-secondary");
    editBtn.innerText = "수정";

    editDiv.appendChild(editBtn);

    /* 삭제 생성 */
    const delDiv = document.createElement("div");
    delDiv.classList.add("institution-del");
    delDiv.setAttribute("data-id", e1.academyId);

    /* 삭제 버튼 생성 */
    const delBtn = document.createElement("button");
    delBtn.classList.add("del");
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.innerText = "삭제";

    delDiv.appendChild(delBtn);
    item.appendChild(itemLogo);
    item.appendChild(itemDescription);
    item.appendChild(itemPosition);
    item.appendChild(itemClass);
    item.appendChild(editDiv);
    item.appendChild(delDiv);
    choiceB.appendChild(item);
  });
};
const getDataList = (cur) => {
  fetch('/academy/getList?curPage=' + cur
  ).then((resp) => {
    return resp.json()
  }).then((json) => {
    resultDataList = JSON.stringify(json);
    console.log(resultDataList);
  })
}
const setDataList = () => {
  // getDataList(curPage);
  // setChoiceA(resultDataList.organi);
  // setChoiceB(resultDataList.organi);
  setCRUDBtns();
};
function init() {
  setShow();
  setDataList();
}

init();
