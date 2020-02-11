export const echartsData1 = {
  title: { text: "Visitor" },
  tooltip: {},
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      type: "line",
      color:'#66ccff',
      name:'Person',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};


export const echartsData2 = {
  title: {
      text: "Skill Situation",
      left: 'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      // orient: 'vertical',
      // top: 'middle',
      bottom: 10,
      left: 'center',
      data: ['Javascript', 'CSS','React','Vue','Angular']
  },
  series : [
      {
          type: 'pie',
          radius : '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          color:["#b077f4","#5dd0c8","#55a9fd","#fb6195","#66ccff" ],
          data:[,
              {value:20, name: 'Javascript'},
              {value:20, name: 'CSS'},
              {value:20, name: 'React'},
              {value:20, name: 'Vue'},
              {value:20, name: 'Angular'},
          ],

      }
  ]
};