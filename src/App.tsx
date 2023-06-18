import { configureStore } from "@reduxjs/toolkit"
import { Router } from "./services/Router"
import { combinedReducer } from "./services/reducers/combinedReducer"
import { Provider } from 'react-redux';

const store = configureStore({reducer:combinedReducer});

function App() {  
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  )
}

export default App
