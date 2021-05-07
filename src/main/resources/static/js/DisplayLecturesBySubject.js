let DLBS_display_list_dynamic = document.getElementById("DLBS_display_list_dynamic");
let DLBS_selSubject_selectBox = document.getElementById("DLBS_selSubject_selectBox");
let DLBS_display_searchCount = document.getElementById("DLBS_display_searchCount");
let DLBS_display_list_pagingButtons = document.getElementById("DLBS_display_list_pagingButtons");

let DLBS_ext_themeId = DLBS_selSubject_selectBox.options[DLBS_selSubject_selectBox.selectedIndex].value;
let DLBS_ext_columnName = "";
let DLBS_ext_pageNum = 1;
const DLBS_pages = 5;




//초기 화면 보여줄 때 나타낼 강좌목록 받아온 후 화면에 표시
let  DLBS_doAjax =  (themeId, columnName, pageNum) => {
    $.ajax({
        type: 'GET',
        url: '/getLectures?themeId=' + themeId +'&columnName=' + columnName + '&pageNum=' + pageNum,
        contentType:'application/json; charset=utf-8',
        dataType: 'json',
    }).done((ajaxData)=>{
        DLBS_setDisplay(ajaxData);
    }).fail(function (error) {
        alert(JSON.stringify(error));
    });
}


//받아온 ajax 데이터로 디스플레이 갱신하기.
//'총 n개' 에서 n개 세팅하기
//20개 데이터 출력하기.
//받아온 전체페이지수 기준으로 페이징버튼 갱신하기
let DLBS_setDisplay = (ajaxData) => {
    //DLBS_display_searchCount
    //DLBS_display_list_dynamic
    //DLBS_display_list_pagingButtons
    let totalCount = ajaxData['totalCount'];
    let listData = ajaxData['list'];
    let pagingNumber = ajaxData['pagingNumber'];
    //'총 n개' 에서 n개 세팅하기
    DLBS_display_searchCount.innerHTML = "총 " + totalCount + "개 검색";

    //20개 데이터 출력하기.
    let html = ""; 
    for(let i = 0; i<listData.length; i++){
        html += "<li class=DLBS_display_list_element>";
        html += "<span class=DLBS_display_list_icons>";
        html += "<span class=DLBS_display_list_best><img class=DLBS_img src=/img/star.svg/></span>";
        if(listData[i].wishBool == 1)
            html += "<span class=DLBS_display_list_interest id=DLBS_heartImg" + i + "><img onclick=DLBS_changeHeartState(1," + listData.themeId +"," + i+") class=DLBS_img src=/img/filledHeart.png/></span>";
        else
            html += "<span class=DLBS_display_list_interest id=DLBS_heartImg" + i + "><img onclick=DLBS_changeHeartState(0," + listData.themeId +"," + i+") class=DLBS_img src=/img/emptyHeart.png/></span>";   
        html += "</span>";
        html += "<span class=DLBS_display_list_notIcons>";
        html += "<span class=DLBS_display_list_no>" + (i+1) + "</span>";
        html += "<span class=DLBS_display_list_category>" + listData[i].category + "</span>";
        html += "<span class=DLBS_display_list_lectureName>" + listData[i].lectureTitle + "</span>";
        if(listData[i].onOffYn == true)
            html += "<span class=DLBS_display_list_onOff>온라인</span>";
        else
            html += "<span class=DLBS_display_list_onOff>오프라인</span>";
        html += "<span class=DLBS_display_list_detail><a href=" +listData[i].lectureUrl + "><img class=DLBS_img src=/img/gotosite.png  /></a></span>";
        html += "</span>";
        html += "</li>";
    }
    DLBS_display_list_dynamic.innerHTML = html;
    
    //받아온 전체페이지수 기준으로 페이징버튼 갱신하기
    html = "";
    //pagingNumber -> 전체페이지수
    //DLBS_ext_pageNum -> 보고싶은 페이지 번호
    //DLBS_pages -> 한번에 보여줄 페이지 수

    //5*음이아닌정수 +1 이거나
    //5의배수일때만 반응

    //5*음이아닌정수+1이 1이 아니면 왼쪽버튼추가
    //5*음이아닌정수+1이면 그 수부터 DLBS_ext_pageNum보다작거나 혹은 5*(음이아닌정수+1) 까지 버튼추가 그래서 처음,끝으로변수기억
    //pagingnumber가 끝보다 크다면 오른쪽버튼추가
    //5의배수일때면
    //이 5의배수의 수 -4 가 1이 아니면 왼쪽버튼추가
    //5의배수의 수 - 4부터 이 5의배수의수까지 버튼추가
    //pagenumber가 이 5의배수의수보다 크면 오른쪽버튼추가
    if(DLBS_ext_pageNum%DLBS_pages == 1){
        if(DLBS_ext_pageNum!=1) 
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," +  (DLBS_ext_pageNum-1) + ")><img class=DLBS_img src=/img/pagingArrowLeft.png/></button>";
        let count = DLBS_ext_pageNum;
        while(count <= pagingNumber && count <= DLBS_ext_pageNum+4){
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," + count + ")>" + count + "</button>";
            count++;
        }
        if(pagingNumber > count-1)
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," + count + ")><img class=DLBS_img src=/img/pagingArrowRight.png/></button>";
        //갱신
        DLBS_display_list_pagingButtons.innerHTML = html;
    }
    else if(DLBS_ext_pageNum%DLBS_pages == 0){
        if(DLBS_ext_pageNum-4 != 1)
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," +  (DLBS_ext_pageNum-5) + ")><img class=DLBS_img src=/img/pagingArrowLeft.png/></button>";
        for(let i = DLBS_ext_pageNum-4; i<= DLBS_ext_pageNum; i++)
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," + i + ")>" + i + "</button>";
        if(pagingNumber > DLBS_ext_pageNum)
            html += "<button class=DLBS_pagingButton onclick=DLBS_display(0," +  (DLBS_ext_pageNum+1) + ")><img class=DLBS_img src=/img/pagingArrowRight.png/></button>";
        //갱신
        DLBS_display_list_pagingButtons.innerHTML = html;
    }
}

//페이징버튼누르면 DLBS_ext_pageNum 갱신한 뒤 호출
//카테고리 정렬 누르면 DLBS_ext_columnName 갱신한 뒤 호출
let DLBS_display = (code, value) => {
    if(code==0){//페이징버튼
        DLBS_ext_pageNum = value;
    }
    else{//카테고리
        DLBS_ext_columnName = value;
    }
    DLBS_doAjax(DLBS_ext_themeId, DLBS_ext_columnName, DLBS_ext_pageNum);
}

//주제 바꾸면 DLBS_ext_themeId 갱신 후 호출
let DLBS_display_theme = () => {
    DLBS_ext_themeId = DLBS_selSubject_selectBox.options[DLBS_selSubject_selectBox.selectedIndex].value;
    DLBS_doAjax(DLBS_ext_themeId, DLBS_ext_columnName, DLBS_ext_pageNum);
}


//하트누르기,재누르기 PUT매핑
let DLBS_changeHeartState = (state, themeId, idx) => {
    let DLBS_heartImg = document.getElementById("DLBS_heartImg"+idx);
    
    //하트 이미지 바꾸기.
    let html = "";
    if(state == 0){
        html += "<img onclick=DLBS_changeHeartState(1," + themeId +"," + idx+") class=DLBS_img src=/img/filledHeart.png/>";
        state = true;
    }
    else{//서버에 반영
        html += "<img onclick=DLBS_changeHeartState(0," + themeId +"," + idx+") class=DLBS_img src=/img/emptyHeart.png/>";
        state = false;
    }
    DLBS_heartImg.innerHTML = html;
    $.ajax({
        type: 'PUT',
        url: '/changeHeartState?themeId=' + themeId + '&isHeartTrue=' + state,
        contentType:'application/json; charset=utf-8'
    }).done(()=>{
    }).fail(function (error) {
    });
}


DLBS_doAjax(DLBS_ext_themeId, DLBS_ext_columnName, DLBS_ext_pageNum);