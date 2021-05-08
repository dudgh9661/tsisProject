function addSub() {
    const val = document.querySelector(".input-sub-info-box").value;
    const id = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    fetch("/theme/modifyTheme", {
        method: "POST",
        body: JSON.stringify({
            themeLectureId : id,
            theme : val
        }),
    }).then(
    )
}

function modSub() {
    const val = document.querySelector(".input-sub-info-box").value;
    fetch("/theme/addTheme", {
        method: "POST",
        body: JSON.stringify({
            theme : val
        }),
    }).then(
    )
}
