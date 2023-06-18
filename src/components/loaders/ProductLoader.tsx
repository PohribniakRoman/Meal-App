import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

export const ProductLoader:React.FC = () => {
  return <Backdrop className="loader__box--product" open={true}>
      <CircularProgress color="inherit" className="loader__progress"/>
  </Backdrop>
}