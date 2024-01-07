import {useContext, useRef} from "react";
import {IsodContext} from "./ContextService";

export default function IsodView() {
    
    const {state: {viewData, isLoading}, loadData, applyFilter} = useContext(IsodContext);

    const orgRef = useRef(null);
    const ownerRef = useRef(null);
    
    if (viewData == null ){
        return <div><h1>No data.</h1><button onClick={loadData} disabled={isLoading}>Load Data?</button> </div>;
    }
    
    const applyFilterCallback = () =>applyFilter(orgRef.current.value, ownerRef.current.value);
    
    
    return <div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <input type="text" placeholder="Organizacja" ref={orgRef} disabled={isLoading}/>
            <div style={{width: "30px"}}></div>
            <input type="text" placeholder="Prowadzący" ref={ownerRef} disabled={isLoading}/>
            <div style={{width: "30px"}}></div>
            <button onClick={applyFilterCallback} disabled={isLoading}>Zastosuj filtry</button>    
        </div>
        <br/>
        <table className="isod-table">
            <thead>
            <tr>
                <td>ID</td>
                <td>Organizacja</td>
                <td>Prowadzący</td>
                <td>Temat</td>
            </tr>
            </thead>
            {viewData.map((el, idx) => <tr key={"iv-tr-" + idx}>
                <td>{el.id}</td>
                <td>{el.unit}</td>
                <td>{el.owner}</td>
                <td>{el.title}</td>
            </tr>)}
        </table>
    </div>
}