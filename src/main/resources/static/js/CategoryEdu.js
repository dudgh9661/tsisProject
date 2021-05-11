function getCategory(field) {
    $.ajax({
        type : 'GET',
        url : '/CategoryPage/getCategoryDepth2',
        data: {depth1Field: field},
        contentType:'application/json; charset=utf-8',
        dataType : 'json',
        success : function(data) {
            let html = "";
            $.each(data, function(mi, middle) {
                html += "<div class=divTableRow>";
                html += "<div class=divTableHead>"+mi+"</div>"
                $.each(middle, function(si, small){
                    html += "<div class=divTableCell>";
                    html += "<a href="+"/CategoryPage/goToCategoryByLecture?depth1Name="+field+"&depth2Name="+mi+"&depth3Name="+small['depth3Name']+"&categoryId="+small['categoryId']+">"
                    html += "<div class=category-table-name>"+small['depth3Name']+"</div>";
                    html += "<div class=category-table-num>("+small['depth3Num']+")</div>";
                    html += "</a>";
                    html += "</div>";
                });
                html += "</div>";
            });
            document.getElementById("category-table-body").innerHTML = html;
        }
    });
}//large 카테고리 목록보기


$(document).ready(function() {
    $('ul.categorylist li').click(function(){
        getCategory($(this).attr('name'));
    });
});

window.onload = function(){
    $("ul.categorylist>li:first>input").attr('checked', true);
    getCategory($("ul.categorylist>li:first").attr('name'));
}