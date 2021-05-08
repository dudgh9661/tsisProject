const moveToInstitution = () => {
    self.close();
};

const modify = () => {
    const 기관id = document.querySelector("#alert-inst-name").getAttribute("data-id");
    const 기관명 = document.querySelector("#alert-inst-name").value;
    const 로고url = document.querySelector("#alert-inst-logo").value;
    const 위치 = document.querySelector("#alert-inst-position").value;
    const 링크url = document.querySelector("#alert-inst-link").value;
    const 상세설명 = document.querySelector("#alert-list-detail").value;
    const data = {
        academyId: 기관id,
        academyName: 기관명,
        academyLoc: 위치,
        academyUrl: 로고url,
        academyLogoUrl: 링크url,
        academyDetail: 상세설명
    }
    console.log("수정값", JSON.stringify(data));
  fetch("/academyModify/setAcademy",
      {
          method: "POST",
          body: JSON.stringify(data),
          mode: "same-origin",
          cache: 'no-cache',
          headers: {
              'Content-Type': 'application/json',
          },
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
}
const register = () => {
    const 기관명 = document.querySelector("#alert-inst-name").value;
    const 로고url = document.querySelector("#alert-inst-logo").value;
    const 위치 = document.querySelector("#alert-inst-position").value;
    const 링크url = document.querySelector("#alert-inst-link").value;
    const 상세설명 = document.querySelector("#alert-list-detail").value;
    const data = {
        academyName: 기관명,
        academyLoc: 위치,
        academyUrl: 로고url,
        academyLogoUrl: 링크url,
        academyDetail: 상세설명
    }
    console.log("추가", JSON.stringify(data));
    fetch("/academyModify/addAcademy",
        {
            method: "POST",
            body: JSON.stringify(data),
            mode: "same-origin",
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
}

function init() {}
init();
