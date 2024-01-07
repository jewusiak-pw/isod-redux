import React, {useState} from "react";
import loadData, {filter} from "./ApiService";

export const IsodContext = React.createContext({});


export default function IsodContextProvider({children}) {
    const [isodState, setIsodState] = useState({isLoading: false});
    
    const setNewDataCallback = ({resp, date}) => setIsodState((state) =>({...state, data: resp, viewData:resp, downloadDate: date, isLoading: false}));
    
    const loadDataRequest = () => {
        setIsodState((state)=> ({...state, isLoading: true}))
        loadData(setNewDataCallback);
    }; 
    
    const applyFilterCallback = (org, owner) => {
        if (isodState.downloadDate < Date.now() - 1000*60) {
            setIsodState((state)=> ({...state, isLoading: true}))
            loadData(({resp, date}) => {
                let vd = filter(resp, org, owner);
                setIsodState((state) => ({...state, viewData: vd, data: resp, downloadDate: date, isLoading: false}))       
            })
        }else {
            let vd = filter(isodState.data, org, owner);
            setIsodState((state) => ({...state, viewData: vd}))
        }
    }
    
    const tr = {state: isodState, loadData: loadDataRequest, applyFilter: applyFilterCallback};
    
    return <IsodContext.Provider value={tr}>{children}</IsodContext.Provider>
}

