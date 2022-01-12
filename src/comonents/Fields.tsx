import { makeStyles } from '@mui/styles';
import FieldsItem from '../comonents/FieldItem';
import {useState} from 'react'

const useStyles = makeStyles({
    root: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'column',
    },
    fieldRow: {
        display: 'flex',
    },
})

interface fieldsProps {
  count : number,
  setChosenFields: Function,
  chosenFields: []
}

const Fields = ({count, setChosenFields, chosenFields}:fieldsProps):JSX.Element => {
const classes = useStyles();

const renderRow = (columnID:number) => {
    return(
        [...Array(count)].map((el, id) => {
            return(
              <FieldsItem chosenFields={chosenFields} setChosenFields={setChosenFields} unuqieKey={`${columnID}${id}`} key={`${columnID}${id}`} row={id} column={columnID}/>
            )
        })
    )
} 
    return(
    <div className={classes.root}>
        {[...Array(count)].map((el, columnID:number) => {
          return(
        <div key={columnID} className={classes.fieldRow}>
        {renderRow(columnID)}
       </div>
               )
          })          
        }
    </div>
)
}

export default Fields;