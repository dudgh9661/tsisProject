function getCategory(field) {
    $.ajax({
        type : 'GET',
        url : '/CategoryPage/getCategoryDepth2',
        data: {depth1Field: field},
        contentType:'application/json; charset=utf-8',
        dataType : 'json',
        success : function(data) {
            console.log(data)
            let html = "";
            $.each(ddd, function(mi, middle) {
                console.log(mi);
                console.log(middle);
                html += "<div class=divTableRow>";
                html += "<div class=divTableHead>"+mi+"</div>"
                $.each(middle, function(si, small){
                    html += "<div class=divTableCell>";
                    html += "<a href="+"07_SelectEdu.html"+">"
                    html += "<div class=category-table-name>"+small['depth3Name']+"</div>";
                    html += "<div class=category-table-num>"+small['depth3Num']+"</div>";
                    html += "</a>";
                    html += "</div>";
                });
                html += "</div>";
            });
            document.getElementById("category-table-body").innerHTML = html;
        }
    });
}//large 카테고리 목록보기

window.onload = function(){

}