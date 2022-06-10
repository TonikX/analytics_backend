import React from 'react';
import styles from '../RecordsPagesList/RecordsPagesList.styles';
import withStyles from "@material-ui/core/styles/withStyles";
import { WithStyles } from '@material-ui/core';

interface IStructural {value: string, label: string}

type ICallback = () => Array<IStructural>

interface IProps extends WithStyles<typeof styles>{
  structuralList: Array<IStructural>
  setStructuralList: (value: ICallback) => void
}

const RecordsPagesList = (props: IProps) => {
  const {
    structuralList,
    classes,
    setStructuralList
  } = props

  function removeStructuralItem(id: string) {
    setStructuralList(() => {
      return structuralList.filter((el) => el.value !== id)
    })
  }

  return (
    <ul className={classes.list}>
      {structuralList.map((structuralListItem, idx) => {
        return (
          <li
            className={classes.listItem}
            key={structuralListItem.value}>

            <p className={classes.listItemText}>{structuralListItem.label}</p>

            <p
              onClick={() => removeStructuralItem(structuralListItem.value)}
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