import * as echarts from "echarts/core";
export const orgnizationOptionFn = (dashboardData:any)=>{
  // console.log(dashboardData)
  let colorList:any  = {
    'Contractor':[
      {offset: 0, color: '#FC807B'}, 
      {offset: 1, color: '#FC9F7E'},
  ],
    'Regular Employee':[
      {offset: 0, color: '#438AFF'}, 
      {offset: 1, color: '#49D7FE'},
  ],
    "Vendor":                      [
      {offset: 0, color: '#89D121'}, 
      {offset: 1, color: '#BDF56A'},
  ]
  }
  let sum = 0
  dashboardData.forEach((e:any) => {
    sum += e.activeUser
  })
  return {
    title: {
    text: 'Total', // join('\n')作用是换行居中
    subtext: sum,
    itemGap: 10,
    x: '46%',
    y: '35%',
    textAlign: 'center',
    // 可以设置显示的样式
        // 主标题样式
    textStyle: {
        fontSize: '12',
        color: '#999999'
    },
    // 副标题样式
    subtextStyle: {
        fontSize: '18',
        fontWeight: '800',
        color: '#333333'
    }
  },
series: [
{
name: 'Access From',
type: 'pie',
radius: ['50%', '70%'],
avoidLabelOverlap: false,
hoverAnimation: false,
label: {
  show: false,
  position: 'center'
},
data: 
  dashboardData.map((item:any)=>{
    return   { value: item.activeUser, name: item.employeeType,
    itemStyle: {
          normal: {//颜色渐变
              color: new echarts.graphic.LinearGradient(

                  1, 1, 1, 0,  //(上-下 渐变)
                  // 1, 1, 0, 0,  //(左上-右下 渐变)
                  // 1, 0, 0, 0,  //(左-右 渐变)
                  // 0, 1, 1, 0,  //(右上-左下 渐变)
                  // 0, 1, 1, 1,  //(左-右 渐变)
                  // 1, 0, 1, 1,  //(上-下 渐变)
                  // 0, 0, 1, 0,  //(左-右 渐变)
                  // 0, 0, 0, 1,  //(上-下 渐变)
                colorList[item.employeeType]
              )
          }
      } }
  })
},
  {
  name: '外边框',
  type: 'pie',
  height:'77%',
  clockWise: false, //顺时加载
  hoverAnimation: false, //鼠标移入变大
  center: ['50%', '65%'],
  radius: ['60%', '65%'],
  label: {
    show: false,
    position: 'center'
  },
  data: [
        {
          value: 0,
          itemStyle: {
            normal: {
              color: '#F6F7FB',
            },
          },
        },
      ],
}
]
};
};
export const functionOptionFn = function() {
  return {
    legend: [
      {
        icon: "circle",
        orient: "vertical",
        bottom: "20%",
        left: "15%",
        itemHeight: 10,
        itemWidth: 20,
        padding: [
          5, // 上
          20, // 右
          5, // 下
          10, // 左
        ],
        data: ["Campus Service", "Biz. application"],
      },
      {
        icon: "circle",
        orient: "vertical",
        data: ["Connection", "Work tools"],
        left: "15%",
        bottom: "20%",
        itemHeight: 10,
        itemWidth: 20,
        padding: [
          5, // 上
          20, // 右
          5, // 下
          150, // 左
        ],
      },
    ],
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        height: "50%",
        radius: ["50%", "70%"],
        center: ["50%", "50%"],
        label: {
          formatter: "{d}%",
        },
        labelLine: {
          normal: {
            // minTurnAngle: 160,
            lineStyle: {
              color: "#DFDFDF",
              type: [3, 4],
              dashOffset: 1,
              width: 2,
              fontSize: 18,
            },
            smooth: 0.1,
            length: 20,
            length2: 80,
          },
        },
        data: [
          {
            value: 59,
            name: "Campus Service",
            itemStyle: { normal: { color: "#F8D567" } },
          },
          {
            value: 21,
            name: "Connection",
            itemStyle: { normal: { color: "#FA9A2E" } },
          },
          {
            value: 12,
            name: "Biz. application",
            itemStyle: { normal: { color: "#00E489" } },
          },
          {
            value: 8,
            name: "Work tools",
            itemStyle: { normal: { color: "#438AFF" } },
          },
        ],
      },
    ],
  };  
}()