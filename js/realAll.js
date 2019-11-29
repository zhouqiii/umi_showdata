//
// //累计新增图表与表格切换按钮
// $("#real-histogram").click(function () {
// 	$(".real-table").addClass("real-yin")
// 	$("#div-one").removeClass("real-yin")
// })
//
// $("#real-sheet").click(function () {
// 	$("#div-one").addClass("real-yin")
// 	$(".real-table").removeClass("real-yin")
// })
// $("#real-histogramJ").click(function () {
//     $(".real-table-J").addClass("real-yinJ")
//     $("#div-J").removeClass("real-yinJ")
// })
// $("#real-sheetJ").click(function () {
//     $("#div-J").addClass("real-yinJ")
//     $(".real-table-J").removeClass("real-yinJ")
// })
// //活跃玩家
// $("#real-histogramA").click(function () {
// 	$(".real-table-A").addClass("real-yinA")
// 	$("#div-A").removeClass("real-yinA")
// })
// $("#real-sheetA").click(function () {
// 	$("#div-A").addClass("real-yinA")
// 	$(".real-table-A").removeClass("real-yinA")
// })
//
//
// //活跃
// $("#real-histogram2").click(function () {
// 	$(".real-table-one").addClass("real-yin2")
// 	$("#div-two").removeClass("real-yin2")
// })
// $("#real-sheet2").click(function () {
// 	$("#div-two").addClass("real-yin2")
// 	$(".real-table-one").removeClass("real-yin2")
// })
// //付费人数
// $("#real-histogram3").click(function () {
// 	$(".real-table-two").addClass("real-yin3")
// 	$("#div-three").removeClass("real-yin3")
// })
// $("#real-sheet3").click(function () {
// 	$("#div-three").addClass("real-yin3")
// 	$(".real-table-two").removeClass("real-yin3")
// })
// //付费金额
// $("#real-histogram4").click(function () {
// 	$(".real-table-four").addClass("real-yin4")
// 	$("#div-four").removeClass("real-yin4")
// })
// $("#real-sheet4").click(function () {
// 	$("#div-four").addClass("real-yin4")
// 	$(".real-table-four").removeClass("real-yin4")
// })
//3个p标签点击事件
$("#real-p1").click(function () {
	$("#real-p1").css("background-color", "#272727").siblings().css("background-color", "#363636");
	$("#real-inner>.main").addClass("reveal").siblings().removeClass("reveal")
    $(".firstin_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".activity_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".register_num").parent().css("background-color", "rgba(43,60,79,0.5)")
});
$("#real-p6").click(function () {
	$("#real-pA").css("background-color", "#272727").siblings().css("background-color", "#363636");
	$("#real-inner>.mainA").addClass("reveal").siblings().removeClass("reveal")
    $(".register_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".firstin_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".activity_num").parent().css("background-color", "rgba(43,60,79,0.5)")
});
$("#real-pJ").click(function () {
    $("#real-pJ").css("background-color", "#272727").siblings().css("background-color", "#363636");
    $("#real-inner>.mainJ").addClass("reveal").siblings().removeClass("reveal")
    $(".activity_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".register_num").parent().css("background-color","rgba(43,60,79,0)")
    $(".firstin_num").parent().css("background-color", "rgba(43,60,79,0.5)")
});


change()
function load() {
	$(".right").mLoading("show");
}
function change() {
	$.ajax({
		type: "get",
		url: "../queryAreas.action",
		async: false,
		success: function (obj) {
			for (var i = 0; i < obj.rows.length; i++) {
				$("#district").append("<option value='" + obj.rows[i].areaid + "'>" + obj.rows[i].areaname + "</option>");
			}
			$("#district").each(function () {
				$(this).find("option").attr("selected", "selected")
			})
			$('#district').multiselect("destroy").multiselect({
				buttonWidth: '70%',
				nonSelectedText: '请选择',
				maxHeight: 200,
				numberDisplayed: 1,
				includeSelectAllOption: true,
				selectAllText: '全选/全不选', //全选按钮显示的文本
				nSelectedText: '项被选中',
				allSelectedText: '已选中所有区服',
			});
			homedata()
		}
	});
}
function onblu() {
	$("#real-datatable").bootstrapTable('destroy');
    $("#real-datatableJ").bootstrapTable('destroy');
	$("#real-datatableA").bootstrapTable('destroy');
    $("#real-datatableAll").bootstrapTable('destroy');
	$("#real-tbody").empty();
	$("#real-tbodyJ").empty();
	$("#real-tbodyA").empty();
    $("#real-tbodyAll").empty();
	$("#leiji").empty();
    $("#activation").empty();
	$("#guanwang").empty();
	// $("#huo").empty();
	$("#ren").empty();
	$("#jin").empty();
	$("#peopleNum").empty();
	$("#averageNum").empty();
	homedata();
	load()
};
function homedata() {
    $(".right").mLoading("show");
	var text5 = $("#district").val(); //区服
	var time
	var text1
	var textTime
	var aa=vm.ruleForm
    var date = new Date();
    var now=new Date(date)
    var oneweekdate = new Date(date-7*24*3600*1000);
    var y = oneweekdate.getFullYear();
    var m = oneweekdate.getMonth()+1;
    var d = oneweekdate.getDate();
    var formatwdate = y+'-'+m+'-'+d;
    var yn = now.getFullYear();
    var mn = now.getMonth()+1;
    var dn = now.getDate();
    var formatwdateNow = yn+'-'+mn+'-'+dn;
	if(aa==undefined||aa==''||aa==null){
        text1=formatwdate
        textTime=formatwdateNow//晚
	}else{
        time= vm.ruleForm.dateValue
        text1=time[0]
        textTime=time[1]
	}
	if (text5 != null) {
		text5 = text5.join(",");
	}

	$.ajax({
		type: "post",
		url: "../queryHomeDateNew.action",
		async: true,
		data: {
			serverId: text5,
			startTime: text1,
			endTime:textTime
		},
		success: function (ob) {
            var c = Number(ob.payNumber)
            onreal(ob);
            OfficaNum(ob);
            Activation(ob);
            AddUser(ob);
            $(".right").mLoading("hide");
		}
	});
    $("#real-datatableAll").bootstrapTable('destroy');
    var t = $("#real-datatableAll").bootstrapTable({
        url: '../queryHomeDateTable.action',
        method: 'post',
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //post请求的话就加上这个句话
        queryParamsType: "",
        striped: true, //设置为 true 会有隔行变色效果
        undefinedText: "空", //当数据为 undefined 时显示的字符
        pagination: true, //分页
        paginationLoop: false,
        // paginationLoop:true,//设置为 true 启用分页条无限循环的功能。
        showToggle: false, //是否显示 切换试图（table/card）按钮
        // showColumns: "true", //是否显示 内容列下拉框
        pageNumber: 1, //如果设置了分页，首页页码
        // showPaginationSwitch:true,//是否显示 数据条数选择框
        pageSize: 20, //如果设置了分页，页面数据条数
        pageList: [5, 10, 20, 40,'All'], //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
        paginationPreText: '‹', //指定分页条中上一页按钮的图标或文字,这里是<
        paginationNextText: '›', //指定分页条中下一页按钮的图标或文字,这里是>
        // singleSelect: false,//设置True 将禁止多选
        search: false, //显示搜索框
        data_local: "zh-US", //表格汉化
        sidePagination: "client", //服务端处理分页
        queryParams: function(params) { //自定义参数，这里的参数是传给后台的，我这是是分页用的
            return { //这里的params是table提供的
                // pageIndex: params.pageNumber, //从数据库第几条记录开始
                // pageSize: params.pageSize, //找多少条
                serverId: text5,
				startTime: text1,
				endTime:textTime
            };
        },
        idField: "logId", //指定主键列
        columns: [
            {
                title: '时间',
                field: 'logTime',
                align: 'center',
            },
            {
                title: '注册玩家',
                field: 'registerNum',
                align: 'center',
                formatter: function(value, rows, index) {
                    return "<span class='register_num'>" + rows.registerNum + "</span>"
                }
            },
            {
                title: '首次激活玩家',
                field: 'firstLoginNum',
                align: 'center',
                formatter: function(value, rows, index) {
                    return "<span class='firstin_num'>" + rows.firstLoginNum + "</span>"
                }
            },
            {
                title: '活跃玩家',
                field: 'activeNum',
                align: 'center',
                formatter: function(value, rows, index) {
                    return "<span class='activity_num'>" + rows.activeNum + "</span>"
                }
            },
            {
                title: '付费玩家',
                field: 'payNum',
                align: 'center',
                formatter: function(value, rows, index) {
                    return "<span class='pay_num'>" + rows.payNum + "</span>"
                }
            },
            {
                title: '付费金额',
                field: 'payAmount',
                align: 'center',
                formatter: function(value, rows, index) {
                    return "<span class='amount_num'>" + rows.payAmount + "</span>"
                }
            }

        ]
    });
    t.on('load-success.bs.table', function(data) { //table加载成功后的监听函数
        $(".register_num").parent().css("background-color", "rgba(43,60,79,0.5)")
    });
}

window.setInterval(function () {
	var text5 = $("#district").val(); //区服
	var text1 = vm.ruleForm.dateValue[0]
	var textTime = vm.ruleForm.dateValue[1]
	if (text5 != null) {
		text5 = text5.join(",");
	}
	$.ajax({
		type: "post",
		url: "../queryHomeDateNew.action",
		async: false,
		data: {
			serverId: text5,
			startTime: text1,
			endTime: textTime
		},
		success: function (ob) {
			var c = Number(ob.payNumber)

			if (ob.totalAddUser == "NaN" || ob.totalAddUser == null) {//新增玩家
				ob.totalAddUser = 0;
			}
			if (ob.totalActive == "NaN" || ob.totalActive == null) {//活跃玩家
				ob.totalActive = 0;
			}
			if (ob.officaNum == "NaN" || ob.officaNum == null) {
				ob.officaNum = 0;
			}
			if (c == "NaN" || c == null) {
				c = 0;
			}
			if (ob.avgActive == "NaN" || ob.avgActive == null) {//付费玩家
				ob.avgActive = 0;
			}
			if (ob.payAmount == "NaN" || ob.payAmount == null) {//收入
				ob.payAmount = 0;
			}
            if (ob.firstLoginNum == "NaN" || ob.firstLoginNum == null) {//首激
                ob.firstLoginNum = 0;
            }
			c = c * 100;
			c = c.toFixed(2);
			ob.payAmount = ob.payAmount * 100;
			ob.payAmount = ob.payAmount.toFixed(2);
			$("#leiji").text(ob.totalAddUser);//注册玩家
			$("#averageNum").text(ob.totalActive);//活跃玩家
			$('#activation').text(ob.firstLoginNum)//首次激活
			// $("#ren").text(c + "%");

		}
	});
}, 100000)
function onreal(ob) {
	var c = Number(ob.payNumber)

	if (ob.totalAddUser == "NaN" || ob.totalAddUser == null) {//新增玩家
		ob.totalAddUser = 0;
	}
	if (ob.totalActive == "NaN" || ob.totalActive == null) {//活跃玩家
		ob.totalActive = 0;
	}
	if (ob.officaNum == "NaN" || ob.officaNum == null) {
		ob.officaNum = 0;
	}
	if (c == "NaN" || c == null) {
		c = 0;
	}
	if (ob.avgActive == "NaN" || ob.avgActive == null) {//付费玩家
		ob.avgActive = 0;
	}
	if (ob.payAmount == "NaN" || ob.payAmount == null) {//收入
		ob.payAmount = 0;
	}
    if (ob.firstLoginNum == "NaN" || ob.firstLoginNum == null) {//首激
        ob.firstLoginNum = 0;
    }
	c = c * 100;
	c = c.toFixed(2);
	ob.payAmount = ob.payAmount * 100;
	ob.payAmount = ob.payAmount.toFixed(2);
	$("#leiji").text(ob.totalAddUser);//注册玩家
	$("#averageNum").text(ob.totalActive);//活跃玩家
    $('#activation').text(ob.firstLoginNum)//首次激活
	// $("#ren").text(c + "%");

	//新增账号表格

	for (var i = 0; i < ob.data[0].length; i++) {
		$("#real-tbody").append(
			"<tr><td>" + ob.data[0][i].logTime.substring(0, ob.data[0][i].logTime.indexOf(' ')) +
			"</td><td>" + ob.data[0][i].device_count +
        "</td></tr>"
		)
	};
	$("#real-datatable").bootstrapTable({
		method: 'post',
		cache: false,
		height: 560,
		striped: true,
		pagination: false,
		pageSize: 20,
		pageNumber: 1,
		pageList: [10, 20, 50, 100, 200, 500],
		sidePagination: 'server',
		search: false,
		showColumns: false,
		showRefresh: false,
		showExport: false,
		exportTypes: ['csv', 'txt', 'xml'],
		search: false,
		clickToSelect: false,
	})
	//活跃玩家
	for (var i = 0; i < ob.data[1].length; i++) {
		$("#real-tbodyA").append(
			"<tr><td>"
			+ ob.data[1][i].logTime.substring(0, ob.data[1][i].logTime.indexOf(' '))+"</td><td>"
			+ ob.data[1][i].sum_players +
			"</td></tr>"
		)
	};
	$("#real-datatableA").bootstrapTable({
		method: 'post',
		cache: false,
		height: 560,
		striped: true,
		pagination: false,
		pageSize: 20,
		pageNumber: 1,
		pageList: [10, 20, 50, 100, 200, 500],
		sidePagination: 'server',
		search: false,
		showColumns: false,
		showRefresh: false,
		showExport: false,
		exportTypes: ['csv', 'txt', 'xml'],
		search: false,
		clickToSelect: false,
	})
    for (var i = 0; i < ob.data[2].length; i++) {
        $("#real-tbodyJ").append(
            "<tr><td>" + ob.data[2][i].logTime.substring(0, ob.data[2][i].logTime.indexOf(' ')) +
            "</td><td>" + ob.data[2][i].device_count +
            "</td></tr>"
        )
    };
    $("#real-datatableJ").bootstrapTable({
        method: 'post',
        cache: false,
        height: 560,
        striped: true,
        pagination: false,
        pageSize: 20,
        pageNumber: 1,
        pageList: [10, 20, 50, 100, 200, 500],
        sidePagination: 'server',
        search: false,
        showColumns: false,
        showRefresh: false,
        showExport: false,
        exportTypes: ['csv', 'txt', 'xml'],
        search: false,
        clickToSelect: false,
    })

}

//新增
function AddUser(data) {
	var chart=null
	var arr = [];
	var arr4 = [];
	for (var i = 0; i < data.data[0].length; i++) {
		var date=data.data[0][i].logTime
		var index=date.indexOf(' ')
		var someDate = date.substring(0,index);
		var rq = data.data[0][i].device_count
		arr.push(rq)
		arr4.push(someDate)

	}
   chart = Highcharts.chart('div-one', {
		chart: {
			type: 'spline',
			height:'370px',
			backgroundColor: {
				stops: [
					[0, 'rgb(54, 54, 54)']
				]
			},
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false // 禁用版权信息
		},
        exporting: {
            enabled:false,//默认为可用，当设置为false时，图表的打印及导出功能失效
            filename:'注册数据',//导出的文件名
        },
		xAxis: {
			 plotLines:[{
			        color:'white',            //线的颜色
			        dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
			        value:this,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
			        width:1                 //标示线的宽度，2px
			    }],
			gridLineWidth: .5,
            gridLineColor:'#363636',
			gridLineDashStyle:"Dash",
            tickmarkPlacement:'on',
			type: 'datetime',
			categories: arr4,
			labels: {
				enable: true,

				style: {
					color: '#fff'
				}
			}
		},
		tooltip: {
            crosshairs:{
                width: 1,
                color: '#ffffff',
                dashStyle: 'Dash'
            },
			//  backgroundColor: '#1B1B1B',   // 背景颜色
			//     borderColor: '#1B1B1B',         // 边框颜色
			//     borderRadius: 2,             // 边框圆角
            //     opacity:'.6',
            //     // useHTML: true,
			//     style: {                      // 文字内容相关样式
			//         color: "#ffb665",
			// 		opacity:'.7',
			//         fontSize: "14px",
			//     },
			// formatter: function () {
			// 	return this.x+'<br />'+'注册玩家:' +this.point.y
			// }
		},
		yAxis: {
            title: {
                text: ''
            },
            gridLineColor:'#707070',
			labels: {
				format: '{value}',
				style: {
					color: 'rgb(218,213,213)',

				}
			}
		},
		legend: {
			itemStyle: {
				color: '#fff',
			},
			itemHoverStyle: {
				color: '#fff'
			}
		},
		plotOptions: {
			series: {
				lineWidth: 2,
				color:"#ffb665"
			}
		},
		series: [{
			id: 'exSeries',
			name: '注册玩家',
			data: arr,
		}],
	});
}
//首次激活
function Activation(data) {
    var chart = null;
    var arr = [];
    var arr4 = [];
    for (var i = 0; i < data.data[2].length; i++) {
        var date=data.data[2][i].logTime
        var index=date.indexOf(' ')
        var someDate = date.substring(0,index);
        var rq = data.data[2][i].device_count
        arr.push(rq)
        arr4.push(someDate)
        //	console.log(arr)
    }
    chart = Highcharts.chart('div-J', {
        chart: {
            height:'370px',
            type: 'spline',
            backgroundColor: {
                stops: [
                    [0, 'rgb(54, 54, 54)']
                ]
            },
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false // 禁用版权信息
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            plotLines:[{
                color:'white',            //线的颜色，定义为红色
                dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                value:this,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                width:1                 //标示线的宽度，2px
            }],
            gridLineWidth: .5,
            gridLineColor:'#363636',
            gridLineDashStyle:"Dash",
            tickmarkPlacement:'on',
            type: 'datetime',
            categories: arr4,
            labels: {
                enable: true,
                style: {
                    color: '#fff'
                }
            }
        },
        tooltip: {
            crosshairs:{
                width: 1,
                color: '#ffffff',
                dashStyle: 'Dash'
            },
            // backgroundColor: '#1B1B1B',   // 背景颜色
            // borderColor: '#1B1B1B',         // 边框颜色
			// opacity:'.6',
            // borderRadius: 2,             // 边框圆角
            // style: {                      // 文字内容相关样式
            //     color: "#ffb665",
            //     fontSize: "14px",
            //     opacity:'.7',
            //     whiteSpace:'pre',
            // },
            // formatter: function () {
            //     return this.x+'<br />'+'首次激活:' +
            //         this.point.y
            // }
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineColor:'#707070',
            labels: {
                format: '{value}',
                style: {
                    color: 'rgb(218,213,213)',

                }
            }
        },
        legend: {
            itemStyle: {
                color: '#fff',
            },
            itemHoverStyle: {
                color: '#fff'
            }
        },
        plotOptions: {
            series: {
                lineWidth: 2,
                color:"#ffb665"
            }
        },
        series: [{
            id: 'exSeries',
            name: '首次激活',
            data: arr,
        }],
    });

}

//活跃玩家
function OfficaNum(data) {
	var chartA = null;
	var arrA = [];
	var arrArr = [];
	var newPeople=[];
	var oldPeople=[];
	for (var i = 0; i < data.data[1].length; i++) {
		var date=data.data[1][i].logTime
		var index=date.indexOf(' ')
		var someDateA = date.substring(0,index)
		var rqA = data.data[1][i].sum_players
		var newpeople=data.data[1][i].new_players
		var oldpeople=data.data[1][i].old_players
		newPeople.push(newpeople)
		oldPeople.push(oldpeople)
		arrA.push(rqA)
		arrArr.push(someDateA)
	}
	chartA = Highcharts.chart('div-A', {
		chart: {
			type: 'area',
            height:'370px',
			backgroundColor: {
				stops: [
					[0, 'rgb(54, 54, 54)']
				]
			},
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false // 禁用版权信息
		},
		exporting: {
			enabled: false
		},
		xAxis: {
			type: 'datetime',
			categories: arrArr,
			labels: {
				enable: true,
				style: {
					color: '#fff'
				}
			},
			gridLineWidth: .5,
            gridLineColor:'#363636',
            tickmarkPlacement:'on',
			gridLineDashStyle:"Dash",

		},
		tooltip: {
            shared: true,
            crosshairs:{
                width: 1,
                color: '#ffffff',
                dashStyle: 'Dash'
			},
            // backgroundColor: '#1B1B1B',   // 背景颜色
            // borderColor: '#1B1B1B',         // 边框颜色
            // opacity:'.6',
			//     borderRadius: 2,             // 边框圆角
			//     style: {                      // 文字内容相关样式
			//         color: "#ffffff",
            //         opacity:'.7',
			//         fontSize: "14px",
            //         whiteSpace:'pre',
			//     },
		},
		yAxis: {
            title: {
                text: ''
            },
            gridLineColor:'#707070',
			labels: {
				format: '{value}',
				style: {
					color: 'rgb(218,213,213)'
				}
			}
		},
		legend: {
			itemStyle: {
				color: '#ffffff',
			},
			itemHoverStyle: {
				color: '#ffffff'
			}
		},
		plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 3,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
		},
		series: [{
			name:'新玩家',
			data:newPeople,
			color:'#4AA3E5',
            lineColor: '#4AA3E5',
            lineWidth: 3,
		},{
            name:'老玩家',
            data:oldPeople,
            color:'#72DFBA',
            lineColor: '#72DFBA',
            lineWidth: 3,
    }
		],
	});
}
//付费人数

////付费金额
//function PayMoney(data) {
//	var chart3 = null;
//	var arr3 = [];
//	var arr7 = []
//	for (var i = 0; i < data.data[4].length; i++) {
//		var someDate = data.data[4][i].serverId
//		var rq = data.data[4][i].device_count
//		arr3.push(rq)
//		arr7.push(someDate)
//		//	console.log(arr)
//	}
//	chart3 = Highcharts.chart('div-four', {
//		chart: {
//			type: 'column',
//			backgroundColor: {
//				stops: [
//					[0, 'rgb(54, 54, 54)']
//				]
//			},
//		},
//		title: {
//			text: ''
//		},
//		credits: {
//			enabled: false // 禁用版权信息
//		},
//		exporting: {
//			enabled: false
//		},
//		xAxis: {
//			type: 'datetime',
//			categories: arr7,
//			labels: {
//				enable: true,
//				rotation: 320,
//				style: {
//					color: '#fff'
//				}
//			}
//		},
//		tooltip: {
//			formatter: function () {
//				return '<b>' + this.series.name + '</b><br/>' +
//					this.point.y;
//			}
//		},
//		yAxis: {
//			title: {
//				text: '三日留存'
//			},
//			labels: {
//				format: '{value}',
//				style: {
//					color: '#fff'
//				}
//			}
//		},
//		legend: {
//			itemStyle: {
//				color: '#c0c0c0',
//			},
//			itemHoverStyle: {
//				color: '#fff'
//			}
//		},
//		plotOptions: {
//
//		},
//		series: [{
//			name: '三日留存',
//			data: arr3,
//		}],
//	});
// //}
// $(function () {
// 	$("#real-p3").click(function () {
// 		$('#teambtn').show()
// 		$('#teambtn2').hide()
// 	})
// //	$("#real-pA").click(function () {
// //		$('#teambtn').hide()
// //		$('#teambtn2').hide()
// //	})
// 	$("#real-p4").click(function () {
// 		$('#teambtn').hide()
// 		$('#teambtn2').show()
// 	})


// 	$("#real-p1").click(function () {
// 		$('#teambtn').hide()
// 		$('#teambtn2').hide()
// 	})
// 	$("#real-p6").click(function () {
// 		$('#teambtn').hide()
// 		$('#teambtn2').hide()
// 	})
// 	$("#real-p2").click(function () {
// 		$('#teambtn').hide()
// 		$('#teambtn2').hide()
// 	})
//
// 	$('.fenxipass').click(function(){
// 		$(".fenxi").hide()
// 	})
// 	$('#teambtn').click(function(){
// 		if($("#real-p3").hasClass('lll')==true){
// 			$(".fenxi1").show()
// 			$(".fenxi2").hide()
// 		}
// 	})
// 	$("#teambtn2").click(function(){
// 		if($("#real-p4").hasClass('llll')==true){
// 			$(".fenxi2").show()
// 			$(".fenxi1").hide()
// 		}
//
// 	})
//
// })

function shuju(){
	var newlogTime = $("#in1").val()
	$("#exampleop").bootstrapTable('destroy');
	var t =$('#exampleop').bootstrapTable({
		url: '../getGameAccountRetain.action',
		method: 'post',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded", //post请求的话就加上这个句话
		queryParamsType: "",
		striped: true, //设置为 true 会有隔行变色效果
		undefinedText: "0", //当数据为 undefined 时显示的字符
		pagination: false, //分页
		paginationLoop: false, //设置为 true 启用分页条无限循环的功能。

		pageNumber: 1, //如果设置了分页，首页页码
		// showPaginationSwitch:true,//是否显示 数据条数选择框
		pageSize: 20, //如果设置了分页，页面数据条数
		pageList: [5, 10, 20, 40], //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
		paginationPreText: '‹', //指定分页条中上一页按钮的图标或文字,这里是<
		paginationNextText: '›', //指定分页条中下一页按钮的图标或文字,这里是>
		// singleSelect: false,//设置True 将禁止多选
		search: false, //显示搜索框
		data_local: "zh-US", //表格汉化
		sidePagination: "server", //服务端处理分页
		queryParams: function(params) { //自定义参数，这里的参数是传给后台的，我这是是分页用的
				return { //这里的params是table提供的
					pageIndex: params.pageNumber, //从数据库第几条记录开始
					pageSize: params.pageSize, //找多少条
					startTime:newlogTime
				};
			},
		columns:[{
			title: '时间起止',
			field: 'startTime',
			align: 'center',
			formatter:function(value, row, value){
				return row.startTime
			}
		},
		{
			title: '登录的有效账号对局数',
			field: 'gameNumStrinig',
			align: 'center'
		},
		{
			title: '账号数量',
			field: 'accountNum',
			align: 'center'
		},
		{
			title: '留存率',
			field: 'dayRetainRate',
			align: 'center',

		}]

	  })
	  t.on('load-success.bs.table', function(data) { //table加载成功后的监听函数
			 $("body").mLoading("hide");
			 $(".pull-right").css("display", "block");

		 });
	  $("#exampleop2").bootstrapTable('destroy');
	  var t = $('#exampleop2').bootstrapTable({
		url: '../getGameAccountRetain.action',
		method: 'post',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded", //post请求的话就加上这个句话
		queryParamsType: "",
		striped: true, //设置为 true 会有隔行变色效果
		undefinedText: "0", //当数据为 undefined 时显示的字符
		pagination: false, //分页
		paginationLoop: false, //设置为 true 启用分页条无限循环的功能。

		pageNumber: 1, //如果设置了分页，首页页码
		// showPaginationSwitch:true,//是否显示 数据条数选择框
		pageSize: 20, //如果设置了分页，页面数据条数
		pageList: [5, 10, 20, 40], //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。
		paginationPreText: '‹', //指定分页条中上一页按钮的图标或文字,这里是<
		paginationNextText: '›', //指定分页条中下一页按钮的图标或文字,这里是>
		// singleSelect: false,//设置True 将禁止多选
		search: false, //显示搜索框
		data_local: "zh-US", //表格汉化
		sidePagination: "server", //服务端处理分页
		queryParams: function(params) { //自定义参数，这里的参数是传给后台的，我这是是分页用的
			return { //这里的params是table提供的
				pageIndex: params.pageNumber, //从数据库第几条记录开始
				pageSize: params.pageSize, //找多少条
				startTime:newlogTime
			};
		},
		columns:[{
			title: '时间起止',
			field: 'startTime',
			align: 'center',
			formatter:function(value, row, value){
				return row.startTime
			}
		},
		{
			title: '登录的有效账号对局数',
			field: 'gameNumStrinig',
			align: 'center'
		},
		{
			title: '账号数量',
			field: 'accountNum',
			align: 'center'
		},
		{
			title: '留存率',
			field: 'threeDayRetainRate',
			align: 'center'
		}],

	  })
	t.on('load-success.bs.table', function(data) { //table加载成功后的监听函数
			 $("body").mLoading("hide");
			 $(".pull-right").css("display", "block");
		 });

}
