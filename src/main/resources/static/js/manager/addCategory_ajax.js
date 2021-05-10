function modSub() {
    const val = document.querySelector(".input-sub-info-box").value;
    const id = window.location.search.replace("?","").split("&").filter(e1 => e1.split("=")[0] == "themeLectureId")[0].split("=")[1];
    console.log(JSON.stringify({"themeLectureId" : id, "theme" : val}));
    fetch("/theme/modifyTheme", {
        method: "POST",
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            themeLectureId : id,
            theme : val
        }),
    }).then(() => {


    })
}
function addSub() {
    const val = document.querySelector(".input-sub-info-box").value;
    fetch("/theme/addTheme", {
        method: "POST",
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            theme : val
        }),
    }).then(() =>

       Swal.fire({
          title: '추가하시겠습니까?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
             window.close()
          }
        })
    )
}
if(document.querySelector(".btn-modify")){
    document.querySelector(".btn-modify").addEventListener("click", modSub);
}
if(document.querySelector(".btn-add")) {
    document.querySelector(".btn-add").addEventListener("click", addSub);
}