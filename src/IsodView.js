import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadDataAsync} from "./ApiService";
import {reducerSlice} from "./reducer";

export default function IsodView() {

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state?.isLoading ?? false);
    const viewData = useSelector((state) => state?.viewData);

    const orgRef = useRef(null);
    const ownerRef = useRef(null);
    

    const onLoadDataClick = () => {
        dispatch(async (dispatch, getState) => {
            dispatch(reducerSlice.actions.setLoading(true));
            const {resp, date} = await loadDataAsync();
            dispatch(reducerSlice.actions.setData({resp, date}))
            dispatch(reducerSlice.actions.setLoading(false));
        });
    }

    if (viewData == null) {
        return <div><h1>No data.</h1>
            <button onClick={onLoadDataClick} disabled={isLoading}>Load Data?</button>
        </div>;

    }

    const onApplyFilterClick = () => {
        dispatch(
            async (dispatch, getState) => {
                dispatch(reducerSlice.actions.setLoading(true));
                if (getState().downloadDate < Date.now() - 1000*3) {
                    let {resp, date} = await loadDataAsync();
                    dispatch(reducerSlice.actions.setData({resp, date}))
                }
                dispatch(reducerSlice.actions.applyFilters({org: orgRef.current.value, owner: ownerRef.current.value}))
                dispatch(reducerSlice.actions.setLoading(false));
            }
        )
    };


    return <div>
        <div style={{display: "flex", flexDirection: "row"}}>
            <input type="text" placeholder="Organizacja" ref={orgRef} disabled={isLoading}/>
            <div style={{width: "30px"}}></div>
            <input type="text" placeholder="Prowadzący" ref={ownerRef} disabled={isLoading}/>
            <div style={{width: "30px"}}></div>
            <button onClick={onApplyFilterClick} disabled={isLoading}>Zastosuj filtry</button>
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