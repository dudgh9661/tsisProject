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
    

    if (document.loginForm.idsave.checked === true) { // 아이디 저장을 체크 하였을때
        if (!frm.userid.value || !frm.pwd.value) { //아이디를 입력하지 않으면.
            alert("아이디와 비밀번호를 확인해주세요!");
            frm.userid.focus();
        }
        else{
            localStorage.setItem("id",document.loginForm.userid.value);
            localStorage.setItem("check",true);
            frm.submit();
        }


    } else { // 아이디 저장을 체크 하지 않았을때

        if (!frm.userid.value || !frm.pwd.value) { //아이디를 입력하지 않으면.
            alert("아이디와 비밀번호를 확인해주세요!");
            frm.userid.focus();
            
        }
        else{
            localStorage.setItem("check",false);
            localStorage.removeItem("id");
            frm.submit();
        }


    }

}

