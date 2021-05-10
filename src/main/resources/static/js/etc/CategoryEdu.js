function largeCategory() {
    $.ajax({
        type : 'GET',
        url : '//',
        dataType : 'json',
        success : function(data) {

            $.each(data, function(index, value) {
//category_id, depth1_field
            });
        }
    });
}//large 카테고리 목록보기

function largeCategory() {
    $.ajax({
        type : 'GET',
        url : '//',
        dataType : 'json',
        success : function(data) {

            $.each(data, function(index, value) {
//category_id, depth2_skill
            });

        }
    });
}//large 카테고리 목록보기

function smallCategory() {
    $.ajax({
        type : 'GET',
        url : '//',
        dataType : 'json',
        success : function(data) {

            $.each(data, function(index, value) {
//category_id, depth3_course
            });
        }
    });
}//large 카테고리 목록보기

//category 선택했을 때 넘겨주기
function categorySelect(){

}