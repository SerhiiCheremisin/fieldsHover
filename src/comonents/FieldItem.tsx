import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
    root: {
     border: '1px solid black',
     width: '50px',
     height: '50px',
     cursor: 'pointer'
    }
})

interface fieldItemProps {
    row: number,
    column: number,
    unuqieKey : string,
    setChosenFields: Function,
    chosenFields: []
}

const FieldsItem = ({row, column, setChosenFields, chosenFields, unuqieKey }: fieldItemProps):JSX.Element => {
const [bgAcrive, setBgActive] = useState<boolean>(false)

const bgLogic:string = bgAcrive ? 'blue' : 'white'
console.log(chosenFields)
const mouseEnterHandler = () => {
    setBgActive(!bgAcrive)
    if(!bgAcrive){
        const tempObj:any = {fieldCol: column, fieldRow : row, uniqueId: unuqieKey}
        const tempArr:any = chosenFields.slice()
        tempArr.push(tempObj)
        setChosenFields(tempArr)
        return
    }
    if(bgAcrive){
        const tempClearArr:any = chosenFields.slice().filter((item:any) => item.uniqueId !== unuqieKey)
        setChosenFields(tempClearArr)
        return
    }
    return
}
const classes = useStyles();

    return(
    <div style={{backgroundColor: bgLogic}} onMouseEnter={mouseEnterHandler} className={classes.root}>
    </div>
)
}

export default FieldsItem;