import React from "react";
import ReactDOM from "react-dom";
import {MainApp} from "./App";


it('render ok', ()=>{
    const div= document.createElement('div')
    ReactDOM.render( <MainApp />, div)
    ReactDOM.unmountComponentAtNode(div)
})
