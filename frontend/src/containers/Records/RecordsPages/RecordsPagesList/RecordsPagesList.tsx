import React from 'react';
import styles from '../RecordsPagesList/RecordsPagesList.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from '@material-ui/core';

interface IStructural {value: string, label: string}

type ICallback = () => Array<IStructural>

interface IProps extends WithStyles<typeof styles>{
  list: Array<IStructural>
  setList: (value: ICallback) => void
}

const RecordsPagesList = (props: IProps) => {
  const {
    list,
    classes,
    setList
  } = props

  function removeStructuralItem(id: string) {
    setList(() => {
      return list.filter((el) => el.value !== id)
    })
  }

  return (
    <ul className={classes.list}>
      {list.map((listElement, idx) => {
        return (
          <li
            className={classes.listItem}
            key={listElement.value}>

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