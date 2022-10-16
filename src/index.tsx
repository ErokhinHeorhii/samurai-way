import store from './components/Redux/RedaxStore';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';


// const rerenderEntireTree = (state: TypeForAllData) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider  store={store}>
        {/* <App appState={state} dispatch={store.dispatch.bind(store)} /> */}
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
// }
// rerenderEntireTree(store.getState())
// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })
