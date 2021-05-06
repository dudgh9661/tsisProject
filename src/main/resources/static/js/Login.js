var form=document.formid

window.onload = function() {
    var check=localStorage.getItem("check");
    console.log(typeof(check))
    if(check=='true'){
        var tmp =localStorage.getItem("id")
        // console.log(tmp)
        document.querySelector("#userid").value=tmp;
        document.querySelector("#idsave").checked=true;
    }
    

}
function btn_click() {
    var frm = document.loginForm;
    

    if (document.loginForm.idsave.checked == true) { // 아이디 저장을 체크 하였을때
        // console.log("aaaaaaaaaaaaaaaaaaa")
        // console.log(document.loginForm.userid.value)
        if (!frm.userid.value) { //아이디를 입력하지 않으면.
            alert("아이디를 입력 해주세요!");
            frm.userid.focus();
            
        }
        if (!frm.pwd.value) { //패스워드를 입력하지 않으면.
            alert("패스워드를 입력 해주세요!");
            frm.pwd.focus();
            
        }
        localStorage.setItem("id",document.loginForm.userid.value)
        localStorage.setItem("check",true)
        // setCookie("id", document.loginForm.userid.value, 7); //쿠키이름을 id로 아이디입력필드값을 7일동안 저장
    } else { // 아이디 저장을 체크 하지 않았을때
        // setCookie("id", document.loginForm.userid.value, 0); //날짜를 0으로 저장하여 쿠키삭제
        if (!frm.userid.value) { //아이디를 입력하지 않으면.
            alert("아이디를 입력 해주세요!");
            frm.userid.focus();
            
        }
        if (!frm.pwd.value) { //패스워드를 입력하지 않으면.
            alert("패스워드를 입력 해주세요!");
            frm.pwd.focus();
            
        }
        localStorage.setItem("check",false)
        localStorage.removeItem("id")
    }

    // document.loginForm.submit(); //유효성 검사가 통과되면 서버로 전송.
}

