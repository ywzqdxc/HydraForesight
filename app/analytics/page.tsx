// "use server"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart, Calendar, Download, Filter, RefreshCw } from "lucide-react"
import Chart from "@/components/Chart";
import EchartsA from "@/components/ChartA";
import _rawData from '@/public/data/report-time-trends.json';
// import * as echarts from "echarts";
//降水量
const jsl = {
  title: {
    text: '日降水量 (mm)'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    // orient: 'vertical',
    right: 10,
    top: 'bottom',
    data: ['日降水量']
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '13%',
    top: '18%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    data: ['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '日降水量',
      data: [20, 0, 0, 10, 20, 35, 55],
      type: 'bar'
    }
  ]
};
//预警类型分布
const yjlx = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 4, name: '红色预警' },
        { value: 3, name: '橙色预警' },
        { value: 2, name: '黄色预警' }
      ]
    }
  ]
};
//降水强度分布
const jsqd = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '天数',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 5, name: '小雨、阵雨' },
        { value: 5, name: '中雨' },
        { value: 4, name: '大雨' },
        { value: 2, name: '暴雨' },
        { value: 1, name: '大暴雨、特大暴雨' }
      ]
    }
  ]
};
//预警区域热力图
  // prettier-ignore
  const hours = [
  '12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a','10a','11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'
  ];
  // prettier-ignore
  const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];
  // prettier-ignore
  const data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]]
      .map(function (item) {
          return [item[1], item[0], item[2] || '-'];
      });

  const yjqyrlt = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [
      {
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

//预警时间分布
const yjsjfb = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1, name: '00:00-06:00' },
        { value: 6, name: '06:00-12:00' },
        { value: 4, name: '12:00-18:00' },
        { value: 4, name: '18:00-24:00' }
      ]
    }
  ]
};
//设备状态统计
const sbzttj = {
  title: {
    text: '设备状态统计',
    // subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '设备数量',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 12, name: '在线' },
        { value: 4, name: '警告' },
        { value: 2, name: '离线' },
        { value: 2, name: '维护中' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
//设备数据采集量
const sbsjcyl = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['图像', '雨量', '气象', '水位', '流量']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['7/21', '7/22', '7/23', '7/24', '7/25', '7/26', '7/27']
      
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '图像', 
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '雨量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '气象',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '水位',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '流量',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
//设备故障分析
const sbgzfx = {
  // title: {
  //   text: 'Referer of a Website',
  //   subtext: 'Fake Data',
  //   left: 'center'
  // },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '频率',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 1048, name: '损坏' },
        { value: 735, name: '断电' },
        { value: 580, name: '需要维护' },
        // { value: 484, name: 'Union Ads' },
        { value: 300, name: '其他' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

//公众上报类型分布
const gzsblxfb = {
  color: ['#0032ba', '#cad700', '#56A3F1', '#FF917C'],
  // title: {
  //   text: 'Customized Radar Chart'
  // },
  legend: {
    right: 10,
    top: 'bottom',
  },
  radar: [
    {
      indicator: [
        { text: '交通', max: 150 },
        { text: '拥堵', max: 150 },
        { text: '积水', max: 150 },
        { text: '故障', max: 120 },
        { text: '危险', max: 108 },
        { text: '其他', max: 72 }
      ],
      center: ['50%', '50%'],
      radius: 110,
      axisName: {
        color: '#fff',
        backgroundColor: '#666',
        borderRadius: 3,
        padding: [3, 5]
      }
    }
  ],
  series: [
    {
      type: 'radar',
      radarIndex: 0,
      data: [
        {
          value: [120, 118, 130, 100, 99, 70],
          name: '公众上报',
          symbol: 'rect',
          symbolSize: 12,
          lineStyle: {
            type: 'dashed'
          },
          label: {
            show: true,
            // formatter: function (params: any) {
            //   return params.value as string;
            // }
          }
        },
        {
          value: [100, 93, 50, 90, 70, 60],
          name: '职工上报',
          // areaStyle: {
          //   color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
          //     {
          //       color: 'rgba(255, 145, 124, 0.1)',
          //       offset: 0
          //     },
          //     {
          //       color: 'rgba(255, 145, 124, 0.9)',
          //       offset: 1
          //     }
          //   ])
          // }
        }
      ]
    }
  ]
};


//上报区域分布
const sbqyfb = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '其他',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '乡镇',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '郊区',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '城市外公路',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '市区',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: 'series'
      },
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: '小区',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: '道路',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: '学校',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: '其他',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
};


//上报时间趋势
// const _rawData = '/data/life-expectancy-table.json'
const sbsjqs = {
  dataset: [
    {
      id: 'dataset_raw',
      source: _rawData
    },
    {
      id: 'dataset',
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'id', gte: 1 },
          ]
        }
      }
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    nameLocation: 'middle'
  },
  yAxis: {
    name: 'Report'
  },
  series: [
    {
      type: 'line',
      datasetId: 'dataset',
      showSymbol: false,
      encode: {
        x: 'Date',
        y: 'Report',
        itemName: 'Date',
        tooltip: ['Report']
      }
    }
  ]
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <BarChart className="h-8 w-8 text-blue-500" />
                数据分析
              </h1>
              <p className="text-muted-foreground">降水数据统计与分析</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="month">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">最近一周</SelectItem>
                  <SelectItem value="month">最近一个月</SelectItem>
                  <SelectItem value="quarter">最近一季度</SelectItem>
                  <SelectItem value="year">最近一年</SelectItem>
                  <SelectItem value="custom">自定义范围</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                导出数据
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">总降水量</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">256.8mm</div>
                <p className="text-xs text-muted-foreground mt-1">较上月增加 12.5%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">最大日降水量</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45.2mm</div>
                <p className="text-xs text-muted-foreground mt-1">发生于 2025-07-20</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">降水天数</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18天</div>
                <p className="text-xs text-muted-foreground mt-1">占比 60%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">预警次数</CardTitle>
                <CardDescription>最近30天</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12次</div>
                <p className="text-xs text-muted-foreground mt-1">较上月增加 50%</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rainfall" className="w-full">
            <TabsList>
              <TabsTrigger value="rainfall">降水分析</TabsTrigger>
              <TabsTrigger value="alerts">预警分析</TabsTrigger>
              <TabsTrigger value="devices">设备数据</TabsTrigger>
              <TabsTrigger value="reports">公众上报</TabsTrigger>
            </TabsList>

            <TabsContent value="rainfall" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-blue-500" />
                      降水量趋势
                    </CardTitle>
                    <CardDescription>最近7天每日降水量变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={jsl} height={300} />
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水量趋势图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-500" />
                      降水强度分布
                    </CardTitle>
                    <CardDescription>按降水强度分类统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={jsqd} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水强度分布图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      降水日历视图
                    </CardTitle>
                    <CardDescription>按日期查看降水情况</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[530px] w-[600px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    {/* <Chart options={jsrl} height={300} /> */}
                    六月份降水日历
                    <br />
                    <EchartsA height={530}/>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">降水日历视图</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">预警类型分布</CardTitle>
                    <CardDescription>按预警类型统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <Chart options={yjlx} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警类型分布图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">预警时间分布</CardTitle>
                    <CardDescription>按时间段统计预警发生频率</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={yjsjfb} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警时间分布图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">预警区域热力图</CardTitle>
                    <CardDescription>按地理位置展示预警密度</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={yjqyrlt} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">预警区域热力图</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">设备状态统计</CardTitle>
                    <CardDescription>按设备状态分类统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={sbzttj} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">设备状态统计图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">设备数据采集量</CardTitle>
                    <CardDescription>按时间统计数据采集量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={sbsjcyl} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">数据采集量图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">设备故障分析</CardTitle>
                    <CardDescription>按故障类型和频率分析</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={sbgzfx} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">设备故障分析图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">公众上报类型分布</CardTitle>
                    <CardDescription>按上报类型统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={gzsblxfb} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报类型分布图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">上报区域分布</CardTitle>
                    <CardDescription>按地理位置统计上报数量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={sbqyfb} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报区域分布图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">上报时间趋势</CardTitle>
                    <CardDescription>按时间统计上报数量变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <Chart options={sbsjqs} height={300}></Chart>
                      {/* <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">上报时间趋势图表</p>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
