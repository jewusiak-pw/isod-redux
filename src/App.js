import './App.css';
import React, {useContext} from "react";
import IsodView from "./IsodView";
import {IsodContext} from "./ContextService";
import {InfinitySpin} from "react-loader-spinner";


function App() {
    const cxt = useContext(IsodContext);

    return (
        <div style={{height: "50px"}}>
            <div style={{height: "50px"}}>
                {cxt?.state?.isLoading ?? false ? <InfinitySpin width={100}/> : ""}
            </div>
            <IsodView/>
        </div>
    );
}

export default App;
