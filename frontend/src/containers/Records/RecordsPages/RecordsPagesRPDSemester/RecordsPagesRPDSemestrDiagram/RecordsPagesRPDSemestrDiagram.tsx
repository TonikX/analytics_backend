import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './RecordsPagesRPDSemestrDiagram.styles';

Chart.register(...registerables)

interface IProps {
  classes?: {[key: string]: string}
  labels: string[],
  title:string,
  data:number[]
}
enum TypeChart {
  PIE = 'pie',
  BAR = 'bar'
}
const RecordsPagesRPDSemestrDiagram = (props:IProps) => {
  const {classes, labels, title, data} = props
  const [btnText, setBtnText] = useState<TypeChart>(TypeChart.BAR)
  const [typeChart, setTypeChart] = useState<TypeChart>(TypeChart.PIE)
  const refChart = useRef<any>()
  const [chart, setChart] = useState()

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
          legend: {
            display: typeChart === TypeChart.PIE
          },
          title: {
            display: true,
            text: title
          }
        }
      },
      data: {
        labels,
        datasets: [{
          label: 'Диаграмма',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(129,20,203, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(129,20,203,1 )',
          ],
          borderWidth: 1
        }]
      },
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
  return (
    <div className={classNames(classes?.wrapperChart, classes?.recordChart)}>
      <canvas ref={refChart} height={250} />
      <Button
        onClick={onClickHandler}
        className={classNames(classes?.btnChart)}
        variant="contained"
        color="primary">{btnText}</Button>
    </div>
  )
}

export default  withStyles(styles)(RecordsPagesRPDSemestrDiagram)