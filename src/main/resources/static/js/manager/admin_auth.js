$(document).ready(function() {
    //alert("getAdmin");

    $.ajax({
        url: "/admin/getAdmin",
        method: "GET",
        data: "",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#adminInfo').empty();
            $.each(data, function(index,item){
                $('#adminInfo').append('<tr><td><input type="checkbox" name="user-checkbox"></td>'+
                    '<td>'+item.empName+'</td><td>'+item.empTeam+'</td><td>'+item.empPosition+'</td>'+
                    '<td>'+item.empYears+'년차</td><td>'+item.empId+'</td></tr>');
            });
        },
        error: function (x, s, e) {
            console.log(x, s, e);
        }
    });
    
});


$(function () {
    $('#userTable tr').on({
        mouseenter: function () {
            $(this).css('background-color', 'lightgray')
        },
        mouseleave: function () {
            $(this).css('background-color', '')
        }
    });

    $('#managerTable tr').hover(function(){
        $(this).css({
            background:'lightgray'
        });
    },function(){
            $(this).css({
                background:''
            })
        }
    ); 
    // $('#userTable tr').click(function () {
    //     alert($(this).text())
    // });
    // > 버튼 클릭
    $('#btnAdd').click(function(){
        var checkbox = $("input[name=user-checkbox]:checked");
    
        const userTable = document.getElementById('userTable');
        const managerTable = document.getElementById('managerTable');

        const ids = [];
        var postIds = [...document.querySelector("#empInfo").querySelectorAll("input")]
                        .filter(e1 => e1.checked)
                        .map(e2 => e2.parentNode.parentNode.lastElementChild.innerText);
        checkbox.each(function(i){
        
            var tr = $(this).parent().parent();
            $(this).attr("name", "manager-checkbox");
            $(this).prop("checked", false);
            
            //var emp_id = $(tr).find('td:last-child')[0].innerHTML;
            //ids.push(emp_id);
            $("#adminInfo").append(tr);
        })
        
        //var data = {'empId' : ids};
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + JSON.stringify(data));
        $.ajax({
            url: '/admin/setAdmin', 
            method: 'POST',
            data: JSON.stringify(postIds),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }
        });
        //console.log(ids);
    })

    $('#btnCancel').click(function(){
        var checkbox = $("input[name=manager-checkbox]:checked");
    
        const userTable = document.getElementById('userTable');
        const managerTable = document.getElementById('managerTable');

        const ids = [];
        var postIds = [...document.querySelector("#adminInfo").querySelectorAll("input")]
                        .filter(e1 => e1.checked)
                        .map(e2 => e2.parentNode.parentNode.lastElementChild.innerText);

        checkbox.each(function(i){
            
            var tr = $(this).parent().parent();
            $(this).attr("name", "user-checkbox");
            $(this).prop("checked", false);
            
            //var emp_id = $(tr).find('td:last-child')[0].innerHTML;
            //ids.push(emp_id);
            tr.remove();
            //$("#empInfo").append(tr);
        })

       
        console.log(ids);

        $.ajax({
                url: "/admin/delAdmin", 
                method: "POST",
                data: JSON.stringify(postIds),
                contentType: 'application/json',
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    
                },
                error: function (x, s, e) {
                    console.log(x, s, e);
                }
            });
    })

    $('#btnSearch').click(function(){

        var searchValue = $(".inputInfo").val();
        
        $.ajax({
            url: "/admin/getUser", 
            method: "GET",
            data: {"searchvalue": searchValue},
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#empInfo').empty();
                $.each(data, function(index,item){
                    $('#empInfo').append('<tr><td><input type="checkbox" name="user-checkbox"></td>'+
                            '<td>'+item.empName+'</td><td>'+item.empTeam+'</td><td>'+item.empPosition+'</td>'+
                            '<td>'+item.empYears+'년차</td><td>'+item.empId+'</td></tr>');
                });
            },
            error: function (x, s, e) {
                console.log(x, s, e);
            }
        });



    });             

})
