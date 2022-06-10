import React from 'react';
import styles from '../RecordsPagesList/RecordsPagesList.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from '@material-ui/core';

interface IStructural {value: string, label: string}

type ICallback = () => Array<IStructural>

interface IProps extends WithStyles<typeof styles>{
  list: Array<IStructural>
  setList: (value: ICallback) => void
  resetValueControl?: any
}

const RecordsPagesList = (props: IProps) => {
  const {
    list,
    classes,
    setList,
    resetValueControl
  } = props

  function removeStructuralItem(id: string) {
    const filteredList = list.filter((el) => el.value !== id)
    setList(() => filteredList)
    if(filteredList.length === 0) {
      resetValueControl()
    }
  }

  return (
    <ul className={classes.list}>
      {list.length > 0 && list.map((listElement, idx) => {
        return (
          <li
            className={classes.listItem}
            key={idx}>

            <p className={classes.listItemText}>{listElement.label}</p>

            <p
              onClick={() => removeStructuralItem(listElement.value)}
               className={classes.listItemClose}>
              &times;
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export default withStyles(styles)(RecordsPagesList)