import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

export const PageLoader:React.FC = () => {
  return <Backdrop className="loader__box--page" open={true}>
      <CircularProgress color="inherit" className="loader__progress"/>
  </Backdrop>
}