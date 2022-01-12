import { makeStyles } from '@mui/styles';
import { FormEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Fields from './comonents/Fields';
import OutcomeItem from './comonents/OutcomeItem';

const useStyles = makeStyles({
  root: {
   display: 'flex',
   width: '100%',
   height: '100vh',
   padding: '5% 10%',
   gap: '25px',
   justifyContent: 'center'
  },
  squareFields: {
   display: 'flex',
   flexDirection: 'column',
   width: '45%',
  },
  squareFieldsHeader: {
  display: 'flex',
  gap: '15px'
    },
  btn : {
    maxWidth: '200px'
    },
   h2: {
    fontSize: '2rem'
   } ,
  responseBlock: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
  }
})
function App():JSX.Element {
  const [squareMods, setSquareMods] = useState<object>({});
  const [chosenMod, setChosenMod] = useState<string>('');
  const [fields, setFields] = useState<number>(0);
  const [modNames, setModNames] = useState<Array<string>>([]);
  const [isFieldsAppeared, setIsFieldsAppeared] = useState<boolean>(false);
  // I understand that i could use redux or contextAPI, but for such small app i have chosen to use prop drilling
  const [chosenFields, setChosenFields] = useState<[]>([]);

  const getSquareData = async () => {
     const URL:string = 'https://demo1030918.mockable.io/';
     const squareRequest =  await fetch(URL);
     const squareRespond = await squareRequest.json()
     return squareRespond
  } 

  const startHandler = () => {
    if (fields === 0) {
      alert('Pick mode please')
    }
    setIsFieldsAppeared(true);
  }

useEffect(() => {
  try{
    getSquareData().then(data => {
      const tempArray = []
      for (let key in data){
          tempArray.push(key)
      }
      setModNames(tempArray)
      setSquareMods(data)
    })
  }
  catch(error){
   console.log(error)
  }
},[])

const chosenModHandler = (e:React.ChangeEvent<{ value: unknown }>) => {
  for (const [key, value] of Object.entries(squareMods)){
    if (key === e.target.value){
      setChosenMod(key)
      setFields(value.field)
    }
  }
}

const menuRender = ():any => {
  return(
    modNames.map((el:string,id:number) => {
      return(
        <MenuItem key={id} value={el}>{el}</MenuItem>
      )
    })
  )
} 

const outcomeRender = chosenFields.map((el:any,id) => {
  return(
    <OutcomeItem key={id} row ={el.fieldRow} cols={el.fieldCol} />
  )
})
 const classes = useStyles();
  return (
    <main className={classes.root}>
      <div className={classes.squareFields}>
       <div className={classes.squareFieldsHeader}>
       <Box sx={{ width: '70%' }}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pick mode</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenMod}
          label="Pick mode"
          onChange={(e:any) => chosenModHandler(e)}
        >
          {modNames.length !==0 && menuRender()}
        </Select>
      </FormControl>
    </Box>
    <Button onClick={startHandler} className={classes.btn} variant="contained">Start</Button>
       </div>
       {isFieldsAppeared ? <Fields chosenFields = {chosenFields} setChosenFields = {setChosenFields} count = {fields} /> : null}
      </div>
      <div className={classes.responseBlock}>
        {!isFieldsAppeared ? <h2 className={classes.h2}>PICK MODE</h2> : <h2 className={classes.h2}>HOVERED SQUARES:</h2>}
        {outcomeRender}
      </div>
    </main>
  );
}

export default App;
