"use client"
import { useEffect, useRef } from "react"
import * as echarts from "echarts"

interface ChartProps {
  options: echarts.EChartsOption
  height: number | string
}

function Chart({ options, height }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  // 定义渲染函数
  function renderChart() {
    if (!chartRef.current) return

    try {
      // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例
      const renderedInstance = echarts.getInstanceByDom(chartRef.current)
      if (renderedInstance) {
        chartInstanceRef.current = renderedInstance
      } else {
        chartInstanceRef.current = echarts.init(chartRef.current)
      }
      chartInstanceRef.current.setOption(options)
    } catch (error) {
      console.error("Chart error:", error)
      chartInstanceRef.current?.dispose()
    }
  }

  // 定义窗口大小发生改变执行的回调函数
  function resizeHandler() {
    chartInstanceRef.current?.resize()
  }

  // 页面初始化时，开始渲染图表
  useEffect(() => {
    renderChart()

    return () => {
      // 销毁图表实例，释放内存
      chartInstanceRef.current?.dispose()
    }
  }, [options])

  // 监听窗口大小改变
  useEffect(() => {
    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [])

  return (
    <div>
      <div style={{ height: height }} ref={chartRef} />
    </div>
  )
}

export default Chart
