import * as echarts from 'echarts/core';
import { LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent } from 'echarts/components';
import { useEffect, useRef, useState } from "react";
import './index.scss'
echarts.use([LegendComponent, PieChart, CanvasRenderer, LabelLayout,TitleComponent]);


const ECharts = ({option}: any) => {
  // 1. get DOM
  const chartRef = useRef(null);

  useEffect(() => {
    // 2. 实例化表格对象
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      undefined
    );
    // 4. 调用表格数据
    chart.setOption(option);
    console.log(option)
    window.onresize = function() {
      chart.resize();
    };
  }, [option]);

  return <div className="charts" ref={chartRef} style={{height:'3rem',width:'100%'}}/>;
};

export default ECharts;
