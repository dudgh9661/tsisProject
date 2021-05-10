var emp_id = '';

$.ajax({
    type : 'GET',
    url : '/employee/getSession',
    contentType:'application/json; charset=utf-8',
    dataType : 'json',
    success : function(data) {
        console.log(data.empId);
        emp_id = data.empId;
    }
})

let labels = [];
let data = [];


$.ajax({
    tyep: "GET",
    url: "http://127.0.0.1:8001/api/flask/top5",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
})
.done((response) => {
    for (var x in response.data){
        labels.push(x)
        data.push(response.data[x])
    }
    let colors1 = ['#0094d4', '#1d378b', '#6c6d6f', '#9c9ea0', '#00BFFF'];
    let myDoughnutChart = document
    .getElementById("myChart")
    .getContext('2d');

    let chart1 = new Chart(myDoughnutChart, {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors1
            }
        ]
    },
    options: {
        title: {
            // text: "Do you like doughnuts?", display: true
        },
        legend: {
            // position: 'chartArea' alias: 'start'
            boxwidth: 300,
            maxwidth: true
        }
    }
    });
})
.fail((error) => {
    console.log(err)
});

window.onload = function(){
    // 언어별
    fetch("http://127.0.0.1:8001/api/flask/renewLang", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emp_id: emp_id
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(emp_id)
        let res = data.data;
        let len = res.length;
        var str = "";
        let input=document.getElementById("slides");

        for(var i=0;i<len;i++){
            str += "<li><img class='png' src=" + res[i].academy_logo_url +"></li>"
        }
        console.log(str)
        input.innerHTML=str;
    })
    .catch(error => console.log("fetch 에러!"));

    // 트랜드별
    fetch("http://127.0.0.1:8001/api/flask/renewTrend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emp_id: emp_id
        }),
    })
    .then(response => response.json())
    .then(data2 => {
        console.log(data2)
        let res2 = data2.data;
        let len2 = res2.length;
        var str2 = "";
        let input2=document.getElementById("slides2");

        for(var i=0;i<len2;i++){
            console.log(res2[i].academy_logo_url);
            console.log(len2);
            str2 += "<li><img class='png' src=" + res2[i].academy_logo_url +"></li>"
        }
        console.log(str2)
        input2.innerHTML=str2;
    })

    // 유저별
    fetch("http://127.0.0.1:8001/api/flask/renewUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emp_id: emp_id
        }),
    })
    .then(response => response.json())
    .then(data3 => {
        console.log(data3)
        let res3 = data3.data;
        let len3 = res3.length;
        var str3 = "";
        let input3=document.getElementById("slides3");

        for(var i=0;i<len3;i++){
            console.log(res3[i].academy_logo_url);
            console.log(len3);
            str3 += "<li><img class='png' src=" + res3[i].academy_logo_url +"></li>"
        }
        console.log(str3)
        input3.innerHTML=str3;
    })    
}
