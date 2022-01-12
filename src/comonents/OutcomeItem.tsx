import Alert from '@mui/material/Alert';

interface outcomeItemProps {
   row : number,
   cols: number
}

const OutcomeItem = ({row, cols}:outcomeItemProps) => {

  return(
      <>
      <Alert severity="info">{`Row:${row} , col:${cols}`}</Alert>
      </>
  )
}

export default OutcomeItem;