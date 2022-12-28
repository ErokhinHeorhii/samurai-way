import store from './components/Redux/RedaxStore';
import ReactDOM from 'react-dom';
import {MainApp} from './App';
import './index.css';



// const rerenderEntireTree = (state: TypeForAllData) => {
  ReactDOM.render(
    // <BrowserRouter>
    //   <Provider  store={store}>
    //     {/* <App appState={state} dispatch={store.dispatch.bind(store)} /> */}
    //     <App />
    //   </Provider>
    // </BrowserRouter>
      <MainApp/>,
    document.getElementById('root')
  );
// }
// rerenderEntireTree(store.getState())
// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })
