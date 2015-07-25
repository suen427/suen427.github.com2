var btn = document.getElementById('edit');
var btn1 = document.getElementById('hide');
var btn2 = document.getElementById('statistic');
var table = document.getElementsByTagName('table')[0];
var tbody = document.getElementsByTagName('tbody')[0];
var isedit = false;
var date = new Date();
var nextMonth = getNextMonth(date);//Date 对象
var daysNumOfMonth = getDaysNumOfMonth(nextMonth);
var firstDayOfMonth = nextMonth.getDay();
var trs = [];	//表格的行
var template31 = 
[
[
[4,4,4,3,4,0,0,3,1,1,1,1,1,3,4,0,0,3,2,2,2,2,2,0,2,3,0,0,1,3,3],
[3,3,2,2,4,1,3,4,0,0,4,4,0,0,4,1,2,0,1,3,1,4,1,1,3,2,0,0,3,2,2],
[2,2,4,4,3,0,0,4,4,0,3,3,2,1,2,3,0,4,4,1,3,4,0,0,1,1,1,2,4,0,1],
[1,4,1,1,1,3,2,2,3,2,2,2,0,0,3,2,3,1,3,0,0,1,3,3,0,4,2,3,4,0,0],
[4,1,3,4,2,2,1,1,2,3,0,0,3,2,1,4,1,2,4,0,0,3,4,2,0,0,3,1,2,1,0]
],
[
[4,3,1,2,4,0,0,1,1,3,4,4,0,0,4,3,0,1,3,2,1,4,2,0,0,2,3,1,3,2,2],
[2,4,4,4,1,0,0,2,3,0,1,1,2,1,3,1,0,0,1,3,2,3,4,4,0,0,2,3,2,3,3],
[4,4,3,4,3,2,3,3,2,0,0,2,1,2,4,0,1,3,2,0,0,2,1,1,1,3,4,0,1,4,0],
[3,2,4,3,4,1,1,4,0,1,3,3,0,0,1,2,2,2,4,0,0,1,3,2,2,0,1,2,4,1,0],
[1,1,2,1,2,3,2,4,0,2,2,0,3,3,2,0,3,4,0,1,3,4,0,3,3,1,0,0,4,4,1]
],
[
[2,4,4,2,1,3,1,3,2,0,0,2,3,1,4,0,3,1,4,2,1,4,0,0,4,3,0,0,3,1,2],
[4,4,1,1,3,1,2,2,3,0,0,4,1,2,1,0,1,4,2,0,0,2,3,3,3,2,0,0,4,3,4],
[1,3,2,4,4,2,3,4,0,3,2,0,2,3,4,3,4,2,1,0,0,4,2,1,0,0,1,3,1,0,1],
[4,2,3,3,4,0,0,1,4,2,1,3,0,0,2,2,0,3,3,1,2,3,1,0,2,1,3,1,2,4,0],
[3,1,4,4,2,0,0,4,1,1,3,1,0,0,3,1,2,4,0,3,3,1,0,2,1,0,2,2,4,2,3]
],
[
[4,1,1,1,3,0,0,2,2,3,0,4,2,2,3,1,1,0,0,3,3,4,0,3,2,1,1,3,4,0,2],
[3,3,2,4,4,0,0,1,1,2,2,3,0,0,4,2,4,1,1,2,1,1,0,0,4,4,3,2,3,2,0],
[4,4,3,2,1,2,2,4,0,1,3,1,1,3,2,0,0,4,4,1,2,2,1,0,3,3,0,0,4,3,0],
[1,4,4,4,2,3,3,3,3,0,1,2,0,0,4,3,2,2,2,0,0,4,3,1,0,0,2,1,1,4,1],
[2,2,4,3,4,1,1,4,0,4,4,0,3,1,1,0,3,3,3,0,0,3,2,2,1,2,0,0,2,1,3]
],
[
[3,4,2,1,4,0,0,3,1,1,4,4,3,1,1,0,0,1,3,3,2,2,0,0,2,2,2,3,4,0,4],
[4,4,3,4,2,0,0,2,2,0,1,2,1,3,4,1,0,3,1,0,0,3,1,0,4,1,1,2,4,2,3],
[4,1,1,2,3,3,3,1,0,3,2,0,2,2,3,0,3,2,2,0,0,4,3,2,4,4,0,0,1,1,1],
[2,2,4,3,4,2,1,4,3,0,3,1,0,0,4,3,1,0,0,2,3,1,0,1,1,0,3,1,3,4,2],
[1,3,4,4,1,1,2,4,0,2,4,3,0,0,2,2,2,4,0,1,1,4,2,3,3,3,0,0,2,3,0]
],
[
[2,4,3,1,1,3,1,3,1,0,0,2,2,3,1,3,2,0,0,2,3,1,4,4,4,4,0,0,3,3,0],
[4,3,4,2,3,1,2,1,4,0,3,3,0,0,4,4,4,3,2,1,2,3,0,0,1,1,0,0,1,2,2],
[1,4,4,3,2,2,3,4,0,1,1,1,0,0,3,2,0,4,3,0,0,2,2,1,3,3,3,3,2,0,1],
[3,1,1,4,4,0,0,2,2,2,2,0,1,1,4,0,3,1,1,0,0,4,1,3,2,2,2,2,4,0,3],
[4,2,2,4,4,0,0,4,3,3,4,0,3,2,2,1,1,2,0,3,1,4,3,2,0,0,1,1,4,1,0]
],
[
[1,1,1,2,4,2,3,2,0,0,4,3,1,3,3,1,0,2,2,0,0,4,1,2,4,4,3,3,4,0,0],
[2,4,3,3,2,0,0,3,2,1,3,2,0,0,1,4,3,1,1,3,1,2,0,0,4,4,1,2,4,0,1],
[4,3,4,4,1,1,2,4,0,2,1,0,3,2,4,0,2,3,0,1,2,1,3,1,3,3,0,0,2,3,0],
[3,4,4,4,3,3,1,4,3,0,0,1,2,1,2,2,0,4,4,0,0,3,2,3,1,1,0,0,1,2,2],
[4,2,2,1,4,0,0,1,1,3,2,4,0,0,4,3,1,0,3,2,3,4,0,0,2,2,2,1,3,1,3]
],
[
[4,4,4,2,2,0,0,3,3,3,2,2,2,1,1,0,0,1,2,0,0,1,3,3,1,3,1,1,4,0,4],
[3,3,4,4,1,0,0,4,1,0,4,1,1,2,3,0,0,3,3,2,2,4,2,4,2,2,0,0,1,3,1],
[1,1,3,3,3,3,3,4,2,0,0,4,3,3,4,2,2,2,1,0,0,3,1,0,4,1,0,0,3,1,2],
[2,2,1,4,4,2,1,1,0,1,1,3,0,0,4,1,3,4,0,3,3,4,0,2,4,4,2,2,2,0,0],
[4,4,2,1,4,1,2,2,0,2,3,4,0,0,2,3,1,0,0,1,1,2,0,1,3,0,3,3,4,2,3]
],
[
[4,4,1,4,4,0,0,3,2,2,1,3,0,0,1,2,2,0,1,2,3,4,2,3,0,0,1,1,4,3,3],
[1,2,4,1,4,2,1,4,3,0,0,2,2,2,3,1,4,0,0,1,2,4,3,2,3,3,0,0,4,1,0],
[3,3,2,4,1,3,2,4,0,1,4,1,0,0,2,3,0,3,2,0,0,1,1,1,4,2,2,3,3,0,2],
[4,4,4,2,2,1,3,2,0,3,2,0,1,1,4,0,3,2,3,3,1,3,0,0,1,4,0,0,2,4,1],
[2,1,3,3,3,0,0,1,1,4,3,4,3,3,4,0,1,1,4,0,0,2,4,0,2,1,3,2,1,2,0]
],
[
[4,1,2,3,2,2,1,4,0,0,4,3,2,3,4,1,0,0,3,3,3,1,0,2,2,4,0,0,3,1,1],
[2,2,1,4,3,1,3,4,4,0,3,1,0,0,4,3,2,4,1,2,1,4,0,0,3,1,0,0,2,2,3],
[3,3,4,2,1,0,0,1,2,1,1,0,3,1,2,0,4,3,0,1,2,4,2,0,4,2,2,2,4,3,0],
[4,4,4,1,4,3,2,2,1,3,2,4,0,0,1,2,1,1,2,0,0,2,3,3,0,0,3,3,1,0,4],
[1,4,3,4,4,0,0,3,3,2,0,2,1,2,3,0,3,2,4,0,0,3,1,1,1,3,1,1,4,0,2]
],
[
[3,1,3,3,2,1,1,4,0,0,2,4,2,1,2,0,0,2,4,0,0,4,1,4,2,3,3,0,1,1,3],
[1,2,4,4,3,0,0,4,3,3,0,4,3,3,4,4,3,0,0,2,1,3,0,2,4,1,1,1,3,0,1],
[4,3,4,4,1,3,2,2,1,0,0,2,1,2,4,1,0,1,2,0,0,1,2,3,3,0,0,2,4,2,2],
[4,4,1,1,4,0,0,3,2,2,3,1,0,0,1,2,2,3,3,3,3,4,0,1,1,2,2,3,4,0,0],
[2,4,2,2,4,2,3,1,0,1,1,3,0,0,3,3,1,4,1,1,2,2,3,0,4,4,0,0,2,3,0]
],
[
[2,2,4,4,1,0,0,3,2,1,2,4,3,1,4,0,0,4,2,3,2,4,3,0,1,1,0,0,1,4,2],
[3,3,4,2,4,1,3,4,4,0,0,4,1,2,2,1,2,1,1,0,0,4,1,2,3,3,0,0,2,3,0],
[1,1,1,4,4,2,1,4,1,0,0,2,2,3,3,0,3,4,0,2,3,2,0,1,2,0,3,3,4,0,1],
[4,4,3,1,3,0,0,1,3,3,1,1,0,0,4,2,0,3,3,1,1,3,2,0,4,2,2,2,4,2,0],
[4,4,2,3,2,3,2,2,0,2,3,3,0,0,1,3,1,2,4,0,0,1,4,3,0,0,1,1,3,1,3]
],
[
[1,1,3,2,1,1,1,4,0,0,3,3,3,2,3,2,0,0,4,2,2,1,3,1,3,4,0,0,2,4,0],
[3,4,2,1,4,3,2,2,2,0,4,1,0,0,2,3,3,1,2,0,0,4,2,0,1,3,1,3,4,1,0],
[4,3,4,3,2,2,3,4,0,2,1,0,2,1,4,0,4,2,1,0,0,4,1,4,0,0,3,1,1,2,3],
[4,4,1,4,3,0,0,3,3,3,2,2,0,0,1,1,1,4,0,3,1,3,0,2,4,1,2,2,4,0,2],
[2,2,4,4,4,0,0,1,1,1,0,4,1,3,4,0,2,3,3,1,3,2,0,3,2,2,0,0,3,3,1]
],
[
[3,4,2,4,3,3,2,3,0,0,2,3,0,0,4,3,1,2,4,1,2,4,0,0,4,1,1,1,2,1,0],
[2,2,4,1,4,2,1,4,3,0,0,1,2,2,1,0,2,4,4,2,3,4,0,0,1,3,0,0,4,3,1],
[1,4,4,2,4,0,0,2,1,3,1,2,0,0,2,2,0,3,3,3,1,2,1,1,0,4,3,3,4,4,0],
[4,3,3,3,2,0,0,1,4,2,3,0,1,1,4,0,3,1,2,0,0,1,3,2,3,2,2,2,1,0,3],
[4,1,1,4,1,1,3,4,2,1,0,0,3,3,3,1,0,4,1,0,0,3,2,3,2,4,0,0,3,2,2]
],
[
[4,3,1,4,4,0,0,4,2,3,3,2,0,0,1,3,2,0,2,1,1,4,4,0,0,2,3,1,1,2,3],
[4,4,4,3,4,1,2,3,0,0,2,4,1,1,2,1,0,0,3,2,2,4,3,3,0,0,1,3,2,0,1],
[1,2,2,2,1,0,0,1,3,1,0,4,2,2,4,2,0,3,4,3,3,2,1,0,3,1,0,0,3,1,2],
[2,1,4,1,3,2,3,2,1,0,1,3,3,3,4,0,3,2,4,0,0,3,4,1,1,3,0,0,4,4,0],
[3,4,3,4,2,3,1,4,0,2,4,1,0,0,3,4,1,1,1,0,0,1,2,2,2,0,2,2,4,3,0]
]
];
var template30 = 
[
[
[4,4,1,1,4,2,3,4,0,0,3,2,0,0,1,1,2,3,1,2,2,2,0,0,1,4,3,1,4,4],
[3,2,4,2,3,0,0,4,3,0,4,1,2,1,2,2,0,0,4,1,1,4,1,1,0,3,2,3,4,3],
[4,4,2,4,2,3,2,2,0,3,1,4,1,2,4,0,3,1,3,0,0,4,2,3,3,4,0,0,1,1],
[2,3,3,3,1,0,0,3,1,1,2,0,3,3,4,0,1,2,2,0,0,3,4,4,2,1,1,2,3,4],
[1,1,4,4,0,1,1,1,2,2,4,3,0,0,3,3,4,4,0,3,3,1,3,2,4,2,0,0,2,2]
],
[
[4,1,4,2,0,2,3,4,4,4,2,3,0,0,2,3,3,3,4,3,1,2,0,4,1,4,0,0,2,1],
[2,3,2,1,2,1,2,1,0,0,4,4,3,3,4,2,0,4,1,0,0,1,2,3,4,0,3,3,1,4],
[1,4,3,4,0,3,1,3,1,1,1,1,0,0,3,4,2,2,2,2,3,3,0,2,2,2,0,0,4,4],
[3,4,1,3,3,0,0,4,3,2,3,4,2,1,4,0,4,1,3,0,0,4,1,1,0,1,2,1,4,2],
[4,2,4,4,1,0,0,2,2,3,0,2,1,2,1,1,1,0,0,1,2,4,3,0,3,3,1,2,3,3]
],
[
[4,3,3,4,2,1,2,4,0,0,1,1,3,1,4,3,3,1,1,0,0,4,2,2,2,3,0,0,4,2],
[2,1,2,2,0,3,3,2,0,3,4,3,0,0,2,1,4,4,4,0,0,4,1,4,1,1,3,1,2,3],
[4,4,4,3,4,2,1,4,2,0,2,2,1,2,3,0,1,3,0,1,1,2,0,3,3,4,0,0,4,1],
[1,2,4,4,3,0,0,3,3,2,3,4,0,0,1,2,0,2,2,2,3,1,0,1,4,4,1,3,1,4],
[3,4,1,1,1,0,0,1,1,1,4,0,2,3,4,0,2,4,3,3,2,3,3,0,0,2,2,2,3,4]
],
[
[4,4,2,3,1,3,1,4,0,0,1,3,0,0,4,1,2,3,2,2,3,1,2,3,4,2,0,0,4,4],
[4,2,4,4,4,0,0,1,2,0,2,2,1,1,3,3,0,2,3,0,0,4,4,1,1,3,2,3,1,3],
[2,3,3,1,4,2,2,2,0,1,3,1,0,0,1,4,3,1,4,0,0,2,3,4,0,1,3,2,3,4],
[1,4,4,2,2,0,0,3,1,3,0,0,2,2,4,4,4,0,1,1,2,4,1,0,3,4,1,1,4,2],
[3,1,1,4,3,1,3,4,3,2,0,4,3,3,2,2,1,0,0,3,1,3,0,2,2,4,0,0,2,1]
],
[
[4,4,3,4,3,3,1,1,0,0,4,2,0,0,1,4,4,3,2,0,0,2,3,1,1,2,2,2,1,4],
[1,2,4,4,4,0,0,3,3,1,0,0,3,1,4,1,3,2,0,2,2,3,2,3,4,0,1,1,4,2],
[2,4,1,3,0,1,2,4,2,3,2,1,0,0,3,2,1,4,3,0,0,4,4,0,3,1,3,3,2,1],
[3,1,4,1,1,0,0,2,1,4,3,3,2,2,2,0,2,4,1,3,3,1,0,2,4,4,0,0,3,4],
[4,3,2,2,2,2,3,4,0,2,1,0,1,3,4,3,4,1,0,1,1,4,1,0,2,3,0,0,4,3]
],
[
[4,4,4,3,2,2,1,1,0,0,1,3,0,0,1,2,1,2,2,0,0,4,2,3,4,3,2,2,1,3],
[1,4,2,2,3,3,2,2,0,0,4,2,3,1,3,1,0,0,1,3,1,4,1,2,3,4,0,0,4,4],
[2,2,3,1,4,0,0,4,3,2,4,4,2,3,4,0,3,1,3,2,3,2,0,1,1,1,0,0,4,1],
[3,3,4,4,1,0,0,3,1,1,3,0,1,2,2,0,4,4,4,0,0,3,3,4,4,2,1,1,3,2],
[4,1,1,0,0,1,3,4,2,3,2,1,0,0,4,3,2,3,4,1,2,1,0,4,2,0,3,3,2,4]
],
[
[2,4,1,1,4,0,0,1,3,3,1,3,0,0,4,2,3,0,3,3,1,2,4,3,0,4,1,2,1,2],
[4,4,3,2,3,0,0,2,2,2,0,0,3,1,2,4,1,1,4,0,0,4,1,1,2,1,3,1,4,3],
[1,1,2,4,0,2,1,4,1,0,3,4,2,3,4,1,0,3,1,2,2,4,2,0,3,3,0,0,4,4],
[3,3,4,3,1,1,2,4,0,4,2,2,0,0,3,3,4,4,4,1,3,3,0,2,4,2,0,0,2,1],
[4,2,4,0,2,3,3,3,0,1,4,1,1,2,1,0,2,2,2,0,0,1,3,0,1,4,2,3,3,4]
],
[
[4,3,4,4,2,0,0,4,3,1,3,1,2,1,1,0,0,4,1,2,1,2,2,2,3,4,0,0,4,4],
[3,4,1,3,0,3,1,3,2,4,2,0,1,2,2,3,0,4,4,1,2,3,3,0,1,4,0,0,3,1],
[1,2,2,1,0,1,2,2,1,0,1,4,0,0,4,1,2,3,0,3,3,4,0,3,4,3,3,3,2,2],
[4,4,3,2,3,2,3,4,0,2,4,3,0,0,3,2,1,1,3,0,0,1,4,0,2,2,1,1,1,4],
[2,1,4,4,1,0,0,1,4,3,0,2,3,3,4,0,3,2,2,0,0,4,1,1,4,1,2,2,4,3]
],
[
[2,1,4,2,2,3,1,3,0,0,1,4,0,0,3,2,2,4,3,3,1,1,3,4,1,4,0,0,2,4],
[4,2,1,0,4,2,3,2,0,0,2,1,1,3,2,4,0,2,4,0,0,3,1,3,3,1,1,3,4,4],
[1,3,4,1,3,1,2,4,2,2,0,2,3,2,1,1,3,0,2,2,3,4,0,0,4,3,0,0,4,1],
[4,4,2,3,4,0,0,1,3,3,0,4,2,1,4,0,1,3,1,0,0,4,2,1,2,2,2,1,3,3],
[3,4,3,4,1,0,0,4,1,1,3,3,0,0,4,3,4,1,0,1,2,2,4,2,4,0,3,2,1,2]
],
[
[3,3,2,1,1,0,0,3,3,0,3,2,2,3,1,4,0,0,4,1,3,3,0,2,1,1,4,2,4,2],
[2,1,4,4,4,2,2,1,0,0,4,1,0,0,4,4,2,3,1,0,0,4,2,3,2,2,1,3,1,3],
[4,2,1,2,0,3,3,4,0,2,1,0,1,2,2,3,1,0,0,2,1,4,1,4,0,3,3,4,3,4],
[4,4,3,4,3,0,0,4,1,3,2,4,0,0,4,2,4,1,3,3,2,1,0,1,3,0,2,1,2,1],
[1,4,4,3,2,1,1,2,2,1,0,3,3,1,3,1,3,2,2,0,0,2,3,0,4,4,0,0,4,4]
],
[
[4,4,4,4,3,0,0,3,1,2,0,4,1,1,3,2,2,0,0,2,1,1,1,3,0,3,2,1,3,4],
[2,2,4,2,0,3,2,2,0,4,2,1,3,3,4,0,0,3,1,3,2,4,4,1,3,4,0,0,4,1],
[4,4,2,4,2,0,0,1,2,1,1,2,0,0,1,1,3,4,0,1,3,2,0,4,2,4,1,3,2,3],
[3,1,3,3,0,2,3,4,3,4,4,0,2,2,2,4,1,1,3,0,0,3,2,2,1,1,0,0,1,4],
[1,3,1,1,1,1,1,4,0,3,3,3,0,0,4,3,4,2,2,0,0,4,3,4,0,2,3,2,4,2]
],
[
[2,4,3,4,4,1,3,4,0,0,2,4,1,2,4,3,0,0,2,1,1,4,1,1,0,0,2,3,2,1],
[4,2,2,3,1,3,1,3,0,0,4,4,3,1,2,2,0,2,4,0,0,1,3,4,3,4,0,1,4,2],
[1,4,4,1,2,0,0,1,3,1,1,2,0,0,1,4,3,4,3,2,2,3,0,0,2,3,3,2,4,3],
[4,3,4,2,3,0,0,2,2,2,4,1,2,3,4,0,1,3,1,0,0,2,4,3,1,1,1,0,3,4],
[3,1,1,4,0,2,2,4,1,3,3,3,0,0,3,1,2,1,0,3,3,4,2,2,4,2,0,0,1,4]
],
[
[2,4,4,4,1,0,0,2,1,0,4,4,1,2,2,0,0,1,1,3,2,4,2,0,4,3,1,3,1,3],
[1,4,4,3,3,2,2,4,0,0,3,3,0,0,1,3,1,4,2,2,3,1,0,0,1,1,3,2,4,2],
[4,3,3,2,4,0,0,1,2,3,1,1,2,1,4,0,3,2,4,1,1,4,0,2,3,2,0,0,2,4],
[3,2,2,4,2,3,3,4,0,2,4,2,3,3,4,1,0,4,4,0,0,3,1,1,2,4,0,0,4,1],
[4,1,1,1,4,1,1,3,3,1,2,4,0,0,3,2,2,3,3,0,0,2,3,3,0,0,2,1,3,4]
]
];

var template28 = 
[
[
[4,4,2,0,2,2,2,3,2,3,0,4,1,1,3,1,1,3,1,0,0,4,4,1,4,3,2,3],
[2,2,4,2,0,1,3,2,4,4,3,2,0,0,2,4,3,4,3,1,1,1,0,4,1,4,1,4],
[3,3,3,0,3,3,1,4,3,2,0,4,2,3,1,2,2,4,2,0,0,2,1,4,4,1,4,4],
[4,1,4,3,1,0,0,4,1,1,1,3,3,2,4,0,4,1,0,2,3,4,3,2,2,2,3,2],
[1,4,1,1,4,0,0,1,4,4,2,1,0,0,4,3,4,2,4,3,2,3,2,3,3,4,4,1]
],
[
[3,4,1,4,4,0,0,4,1,4,2,4,3,2,1,2,4,1,2,0,0,1,2,3,1,2,4,3],
[1,1,4,0,3,3,3,2,3,2,0,0,2,1,4,0,2,4,3,3,3,3,1,4,2,4,1,2],
[4,3,4,3,4,0,0,3,2,4,3,1,0,0,2,1,3,3,4,1,1,2,4,4,4,1,2,4],
[4,2,3,2,1,1,1,1,0,3,4,2,1,3,3,0,0,4,1,2,2,4,0,2,3,3,4,4],
[2,4,2,1,2,2,2,4,4,1,1,3,0,0,4,3,1,2,4,0,0,4,3,1,4,4,3,1]
],
[
[1,1,4,0,4,1,1,3,1,2,0,0,3,2,3,3,2,4,0,2,2,2,4,3,3,4,4,1],
[2,2,3,1,0,3,2,2,0,3,1,2,1,3,1,0,0,3,4,4,3,4,1,1,2,4,4,3],
[3,4,1,4,2,2,3,1,0,4,3,4,0,0,4,1,1,4,2,3,0,1,2,2,1,2,1,4],
[4,4,2,3,3,0,0,4,2,4,4,3,2,1,4,4,3,2,1,0,0,3,4,4,4,1,2,2],
[4,3,4,2,1,0,0,4,3,1,2,1,0,0,2,2,4,1,3,1,1,4,3,4,4,3,3,4]
]
];

var template29 = 
[
[
[3,1,2,4,2,0,0,1,1,1,1,4,1,3,4,0,3,2,4,2,3,4,2,2,4,3,4,0,0],
[2,0,0,2,1,1,2,4,3,0,3,4,0,0,3,3,1,4,3,1,4,2,3,4,4,1,2,2,1],
[4,2,0,0,4,3,1,3,0,2,4,3,3,1,2,0,0,4,1,3,1,4,1,3,2,2,3,1,2],
[1,0,3,1,4,0,0,4,2,3,2,1,0,0,1,2,4,1,2,4,2,1,4,1,3,4,4,3,3],
[4,3,1,3,3,2,3,2,0,4,4,2,2,2,4,1,2,3,4,0,0,3,4,4,1,4,1,0,0]
],
[
[4,1,2,4,3,0,0,3,1,0,3,2,3,2,4,2,1,1,4,1,2,2,4,3,2,1,4,0,0],
[2,3,0,1,4,0,0,4,2,1,4,4,1,1,3,4,4,2,4,2,1,4,3,1,3,2,2,0,0],
[4,2,0,3,1,3,1,4,4,0,1,3,2,3,2,4,0,4,1,0,0,3,1,2,4,4,4,3,3],
[1,0,1,2,4,1,2,1,3,3,4,4,0,0,4,3,2,3,2,0,0,4,2,4,1,3,3,1,2],
[3,4,3,0,2,2,3,2,0,2,2,1,0,0,1,1,3,0,3,3,3,1,4,4,4,4,1,2,1]
],
[
[2,4,0,0,2,1,2,2,1,1,4,4,0,0,4,1,0,4,4,3,3,3,2,3,1,4,4,1,2],
[4,2,0,1,4,0,0,4,2,3,3,3,2,3,2,0,0,1,4,4,1,2,4,1,2,3,3,3,1],
[4,3,3,0,4,2,1,3,0,4,1,2,0,0,3,3,2,4,1,1,0,4,1,2,4,1,2,2,3],
[3,4,2,3,1,0,0,4,3,2,4,1,1,1,1,0,1,3,2,2,2,4,3,4,3,2,4,0,0],
[1,1,1,2,3,3,3,1,0,4,2,4,3,2,4,2,3,2,3,0,0,1,4,4,4,4,1,0,0]
]
];



function createTableHeader(){
	var tr1 = document.createElement('tr');
	var tr2 = document.createElement('tr');
	var tr3 = document.createElement('tr');
	var tr4 = document.createElement('tr');
	//tr1
	var content = ['项目：香醍漫步','部门：客服中心','所属月份：','制表人：','部门负责人：'];
	for(var i=0; i<5; i++){
		var th = document.createElement('th');
		th.innerHTML = content[i];
		th.setAttribute('colspan', '5');
		if(i==2){th.innerHTML+=(nextMonth.getMonth()+1)+'月'}
		tr1.appendChild(th);
	}
	//tr2
	th = document.createElement('th');
	th.innerHTML = '序号';
	th.setAttribute('rowspan','3');
	tr2.appendChild(th);
	th = document.createElement('th');
	th.innerHTML = '日期';
	th.setAttribute('rowspan','2');
	tr2.appendChild(th);
	for(i=0; i<daysNumOfMonth; i++){
		th = document.createElement('th');
		th.innerHTML = i+1+'日';
		th.setAttribute('colspan', '2');
		tr2.appendChild(th);
	}
	th = document.createElement('th');
	th.innerHTML = '员工签字确认';
	th.setAttribute('rowspan','3');
	tr2.appendChild(th);
	//tr3
	var firstDayOfMonth = nextMonth.getDay();
	var week = ['日','一','二','三','四','五','六'];
	for(i=0; i<daysNumOfMonth; i++){
		th = document.createElement('th');
		th.innerHTML = '周'+week[(i+firstDayOfMonth)%7];
		th.setAttribute('colspan', '2');
		tr3.appendChild(th);
	}
	//tr4
	th = document.createElement('th');
	th.innerHTML = '姓名';
	tr4.appendChild(th);
	var arr = ['班次','岗位'];
	for(i=0; i<daysNumOfMonth*2; i++){
		th = document.createElement('th');
		th.innerHTML = arr[i%2];
		tr4.appendChild(th);
	}

	tbody.appendChild(tr1);
	tbody.appendChild(tr2);
	tbody.appendChild(tr3);
	tbody.appendChild(tr4);

	//固定的排班
	var names = ['谢素梅','邬凯','向前','司超','沈利红','宓雪玲','谢少华']
	for(i=0; i<7; i++){
		var tr = document.createElement('tr');
		th = document.createElement('th');
		th.innerHTML = i+1;
		tr.appendChild(th);
		th = document.createElement('th');
		th.innerHTML = names[i];
		tr.appendChild(th);
		var A = ['休','A','A','A','A','A','休'],
			B = ['休','B','B','B','B','B','B'];
		for(var j = 0; j<daysNumOfMonth; j++){
			if(i<4){
				th = document.createElement('th');
				th.innerHTML = A[(j+firstDayOfMonth)%7];
				tr.appendChild(th);
				th = document.createElement('th');
				th.innerHTML = '-';
				tr.appendChild(th);
			}else{
				th = document.createElement('th');
				th.innerHTML = B[(j+firstDayOfMonth)%7];
				tr.appendChild(th);
				th = document.createElement('th');
				th.innerHTML = '-';
				tr.appendChild(th);
			}
		}
		th = document.createElement('th');
		tr.appendChild(th);
		tbody.appendChild(tr);
	}
}

function createTableBody(){
	var schedule = createSchedule();
	schedule = disOrder(schedule);
	var names = ['戎超群','吴艳','吴丹丹','叶佳莹','张智'];
	for(var i = 0; i<5; i++){
		var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.innerHTML = i+8;
		tr.appendChild(th);
		th = document.createElement('th');
		th.innerHTML = names[i];
		tr.appendChild(th);
		var td;
		var drift = (firstDayOfMonth+6)%7; 
		for(var j = 0; j<daysNumOfMonth; j++){
			if( (j+drift)%7 == 0 && j<daysNumOfMonth-1 ){//星期二前面是存在星期一就预期互换位置
				var temp = schedule[i][(j+drift)%daysNumOfMonth];
				schedule[i][(j+drift)%daysNumOfMonth] = schedule[i][(j+drift+1)%daysNumOfMonth];
				schedule[i][(j+drift+1)%daysNumOfMonth] = temp;
			}
			if(schedule[i][(j+drift)%daysNumOfMonth] == 2){
				td = document.createElement('td');
				td.innerHTML = '早班';
				tr.appendChild(td);
				td = document.createElement('td');
				td.innerHTML = '岗'+schedule[i][(j+drift)%daysNumOfMonth];
				tr.appendChild(td);
			}else if(schedule[i][(j+drift)%daysNumOfMonth] == 0){
				td = document.createElement('td');
				td.innerHTML = '休';
				tr.appendChild(td);
				td = document.createElement('td');
				td.innerHTML = '-';
				tr.appendChild(td);
			}else{
				td = document.createElement('td');
				td.innerHTML = 'A';
				tr.appendChild(td);
				td = document.createElement('td');
				td.innerHTML = '岗'+schedule[i][(j+drift)%daysNumOfMonth];
				tr.appendChild(td);
			}
		}
		th = document.createElement('th');
		tr.appendChild(th);
		tbody.appendChild(tr);
	}
}

function createSchedule(){
	var result = [];
	template = [template31,template30,template29,template28];
	firstDayOfMonth;
	switch(daysNumOfMonth){
		case 31:
			template = template[0];
			break;
		case 30:
			template = template[1];
			break;
		case 29:
			template = template[2];
			break;
		case 28:
			template = template[3];
			break;
	}
	var len = template.length;
	result = template[Math.floor(Math.random()*len)];
	return result;
}

//打乱arr的顺序
function disOrder(arr){
	var len = arr.length;
	for ( var i = 0; i<len; i++){
		var a=Math.floor(Math.random()*len);
		var b=Math.floor(Math.random()*len);
		var temp = arr[a];
		arr[a]=arr[b];
		arr[b]=temp;
	}
	return arr;
}

//获得某个时刻所在月份的天数
function getDaysNumOfMonth(date){
	var year = date.getFullYear(),
		month = date.getMonth();
	if(year%4==0 && month==1){
		return 29;
	}else if(month==1){
		return 28;
	}
	switch (month) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			return 31;
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			return 30;
			break;
	}
}

//返回当前时刻的下个月
function getNextMonth(date){
	var year = date.getFullYear(),
		month = date.getMonth();
	return new Date(year,month+1,1);
}


createTableHeader();
createTableBody();

//交互,编辑1修改班表
btn.addEventListener('click',function(event) {
	if(!isedit){
		table.addEventListener('click',addDropdown,false);
		isedit = true;
	}else{
		table.removeEventListener('click',addDropdown,false);
		table.removeEventListener('click',edit2,false);
		isedit = false;

		var pre = document.getElementsByClassName('drops');
		if(pre.length>0){
			for(var i = 0; i<pre.length; i++){
				pre[i].parentNode.removeChild(pre[i]);
			}
		}
		var pre = document.getElementsByClassName('input');
		if(pre.length>0){
			for(var i = 0; i<pre.length; i++){
				pre[i].parentNode.removeChild(pre[i]);
			}
		}
		var selected = document.getElementById('selected');
		if(selected) selected.id='';
		event.stopPropagation();
	}
},false)

var addDropdown = function(e) {
	var target = e.target;
	var pre = document.getElementsByClassName('drops');
	if(pre.length>0){
		for(var i = 0; i<pre.length; i++){
			pre[i].parentNode.removeChild(pre[i]);
		}
	}
	var selected = document.getElementById('selected');
	if(selected) selected.id='';

	if(target.tagName.toLowerCase() == 'td'){
		var options = ['岗1', '岗2', '岗3', '岗4', '休'];
		var drops = document.createElement('div');
		drops.className = 'drops';
		for(i = 0; i < options.length; i++){
			var drop = document.createElement('div');
			drop.className = 'drop';
			drop.innerHTML = options[i];
			drops.appendChild(drop);
		}
		target.appendChild(drops);
		target.id = 'selected';
		target.addEventListener('click',dropSelect,false);
		e.stopPropagation();
	}
}
function dropSelect(event){
	var target = event.target;
	if(target.className == 'drop'){
		var p = target.parentNode,
			pp = p.parentNode,
			work =pp.childNodes[0].textContent;
		if( work.indexOf('A')>-1 || work.indexOf('早班')>-1 || work.indexOf('休')>-1  ){
			switch(target.innerHTML){
				case '岗1':
				case '岗3':
				case '岗4':
					pp.innerHTML ='A';
					pp.nextSibling.innerHTML=target.innerHTML;
					break;
				case '岗2':
					pp.innerHTML ='早班';
					pp.nextSibling.innerHTML=target.innerHTML;
					break;
				case '休':
					pp.innerHTML ='休';
					pp.nextSibling.innerHTML='-';
					break;
			}
		}else{
			switch(target.innerHTML){
				case '岗1':
				case '岗3':
				case '岗4':
					pp.previousSibling.innerHTML ='A';
					pp.innerHTML=target.innerHTML;
					break;
				case '岗2':
					pp.previousSibling.innerHTML ='早班';
					pp.innerHTML=target.innerHTML;
					break;
				case '休':
					pp.previousSibling.innerHTML ='休';
					pp.innerHTML='-';
					break;
			}
		}
		var e = new Event('click');
		btn2.dispatchEvent(e);
		event.stopPropagation();
		var selected = document.getElementById('selected');
		if(selected) selected.id='';
	}
}

//编辑2
document.getElementById('edit2').addEventListener('click',function(event){
	if(!isedit){
		table.addEventListener('click',edit2,false);
		isedit = true;
	}else{
		table.removeEventListener('click',addDropdown,false);
		table.removeEventListener('click',edit2,false);
		isedit = false;

		var pre = document.getElementsByClassName('input');
		if(pre.length>0){
			for(var i = 0; i<pre.length; i++){
				pre[i].parentNode.removeChild(pre[i]);
			}
		}
		var pre = document.getElementsByClassName('drops');
		if(pre.length>0){
			for(var i = 0; i<pre.length; i++){
				pre[i].parentNode.removeChild(pre[i]);
			}
		}
		var selected = document.getElementById('selected');
		if(selected) selected.id='';
	}
	event.stopPropagation();
},false)

function edit2(event){
	var target = event.target;
	if(target.className != 'input'){
		var pre = document.getElementsByClassName('input');
		if(pre.length>0){
			for(var i = 0; i<pre.length; i++){
				pre[i].parentNode.removeChild(pre[i]);
			}
		}
		var selected = document.getElementById('selected');
		if(selected) selected.id='';
		target.id = 'selected';
	}
	

	var input = document.createElement('input');
	input.type = 'text';
	input.className = 'input';
	target.appendChild(input);
	input.focus();
	input.addEventListener('keyup',modify,false);
	event.stopPropagation();
}

function modify(event){
	var target = event.target;
	if(event.keyCode == 13){
		var value = target.value;
		value = value.replace(/^(\s)+|(\s)+$/g,'');
		if(value !=''){
			target.parentNode.innerHTML = value;
		}
	}
	var selected = document.getElementById('selected');
	if(selected) selected.id='';
	event.stopPropagation();
}

//隐藏无关行
btn1.addEventListener('click',function(event){
	var target = event.target;
	var trs = document.getElementsByTagName('tr');
	if(target.innerHTML=='隐藏1-7行'){
		for (var i=0; i<7; i++){
			trs[i+4].className = 'hidden';
		}
		target.innerHTML='显示1-7行'
	}else if( target.innerHTML=='显示1-7行' ){
		for (var i=0; i<7; i++){
			trs[i+4].className = '';
		}
		target.innerHTML='隐藏1-7行'
	}
},false);

//统计
btn2.addEventListener('click',function(event){
	var trs = document.getElementsByTagName('tr'); 
	var ps = document.getElementsByTagName('p');
	var names = ['戎超群：','吴&nbsp;&nbsp;&nbsp;艳：','吴丹丹：','叶佳莹：','张&nbsp;&nbsp;&nbsp;智：'];
	for (var i = 0 ; i < 5; i++){
		var children = trs[i+11].childNodes;
		var len = children.length-3;
		var rest = 0,
			dblrest = 0,
			work1 = 0,
			work2 = 0,
			work3 = 0,
			work4 = 0;
		for(var j=0; j<len; j=j+2){
			switch(children[j+3].innerHTML){
				case '岗1' :
					work1++
					break;
				case '岗2' :
					work2++
					break;
				case '岗3' :
					work3++
					break;
				case '岗4' :
					work4++
					break;
				case '-' :
					rest++;
					if(children[j+1].innerHTML=='-'){
						dblrest++;
					}
					break;
			}
		}
		ps[i+1].innerHTML = names[i]+'&nbsp;&nbsp;&nbsp;'+work1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+work2+
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+work3+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
				work4+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+rest+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+dblrest
	}
},false)

//触发统计按钮
var e = new Event('click');
btn2.dispatchEvent(e);


//选中表格
document.getElementById('select').addEventListener('click',function(){
	window.getSelection().selectAllChildren(table);
},false);

//重新排班
document.getElementById('reset').addEventListener('click',function(){
	var trs = document.getElementsByTagName('tr');
	var len = trs.length;
	for(var i = len; i>0; i--){
		trs[i-1].parentNode.removeChild(trs[i-1]);
	}
	createTableHeader();
	createTableBody();
	//触发统计按钮
	var e = new Event('click');
	btn2.dispatchEvent(e);
},false);

document.addEventListener('click',function(e){
	var pre = document.getElementsByClassName('input');
	if(pre.length>0){
		for(var i = 0; i<pre.length; i++){
			pre[i].parentNode.removeChild(pre[i]);
		}
	}
	pre = document.getElementsByClassName('drops');
	if(pre.length>0){
		for(var i = 0; i<pre.length; i++){
			pre[i].parentNode.removeChild(pre[i]);
		}
	}
	var selected = document.getElementById('selected');
	if(selected) selected.id='';
})


//滚轮横向滚动
var scrollFunc=function(e){ 
	e=e || window.event; 
	if(e.wheelDelta){//IE/Opera/Chrome 
		if(e.wheelDelta==120){ 
			window.scroll(window.scrollX-e.wheelDelta/2,window.scrollY);
		}else{
			window.scroll(window.scrollX-e.wheelDelta/2,window.scrollY);
		} 
	}else if(e.detail){ 
		if(e.detail==-3) { 
			window.scroll(window.scrollX+e.detail*20,window.scrollY);
		}else { 
			window.scroll(window.scrollX+e.detail*20,window.scrollY);
		} 
	}
	e.preventDefault();
}; 
if(document.addEventListener){
	document.addEventListener("DOMMouseScroll" ,scrollFunc, false); 
}
window.onmousewheel=document.onmousewheel=scrollFunc;

//设置月份
document.getElementById('setmonth').addEventListener('click',function(event){
	var year = Number(document.getElementById('year').value);
	var month = document.getElementById('month').value;
	nextMonth = new Date( date.getFullYear()+year,month,1);
	daysNumOfMonth = getDaysNumOfMonth(nextMonth);
	firstDayOfMonth = nextMonth.getDay();
},false);

table.addEventListener('click',function(event){
	var target = event.target;
	var hovers =  table.getElementsByClassName('hover');
	if (hovers.length>0){
		for (var i=0; i<hovers.length; i++){
			hovers[i].className = '';
		}
	}
	target.parentNode.className = 'hover';
	event.stopPropagation();
},false)