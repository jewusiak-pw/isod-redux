import './App.css';
import React from "react";
import IsodView from "./IsodView";
import {InfinitySpin} from "react-loader-spinner";
import {useSelector} from "react-redux";


function App() {
    const isLoading = useSelector((state)=>state?.isLoading??false);

    return (
        <div style={{height: "50px"}}>
            <div style={{height: "50px"}}>
                {isLoading  ? <InfinitySpin width={100}/> : ""}
            </div>
            <IsodView/>
        </div>
    );
}

export default App;
