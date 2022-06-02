import React, { useEffect, useRef, useState } from 'react'
import {Chart, registerables} from 'chart.js'
import {Button} from "@material-ui/core"
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './QualityReportChart.styles'
import classNames from "classnames";


enum TypeChart {
  PIE = 'pie',
  BAR = 'bar'
}

interface IProps {
  labels: string[],
  data: number[],
  colors: string[]
  classes: {[key: string]: string}
  title: string
}

function QualityReportChart(props: IProps) {
  const {labels, data, colors, classes, title} = props
  const [btnText, setBtnText] = useState<TypeChart>(TypeChart.PIE)
  const [typeChart, setTypeChart] = useState<TypeChart>(TypeChart.BAR)
  const [chart, setChart] = useState()
  const refChart = useRef<any>()

  function firstRanderChart(): void {
    if(refChart.current) {
      renderChart()
    }
  }
  useEffect(firstRanderChart, [refChart.current])

  function changeTypeChart(): void {
    if(refChart.current && chart) {
      renderChart()
    }
  }
  useEffect(changeTypeChart, [typeChart])

  function renderChart() {
    if(chart) {
      //@ts-ignore
      chart?.destroy()
    }
    //@ts-ignore
    const chartLocal = new Chart(refChart.current.getContext('2d'), {
      type: typeChart,
      options: {
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: typeChart === TypeChart.PIE
          }
        }
      },
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      }
    })
    //@ts-ignore
    setChart(chartLocal)
  }

  function onClickHandler(): void {
    const getCondition = (typeChart: TypeChart): TypeChart => typeChart === TypeChart.PIE ? TypeChart.BAR : TypeChart.PIE

    setTypeChart((prev: TypeChart): TypeChart => {
      return getCondition(prev)
    })
    setBtnText((prev): TypeChart => {
      return getCondition(prev)
    })
  }


  return <div className={classNames(classes.wrapperChart)}>
    <canvas ref={refChart} height={300} />
    <Button
      onClick={onClickHandler} 
      className={classNames(classes.btnChart)}
      variant="contained"
      color="primary">{btnText}</Button>
  </div>
}
  
export default withStyles(styles)(QualityReportChart)
