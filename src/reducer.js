import {createSlice} from "@reduxjs/toolkit";
import {filter} from "./ApiService";

export const reducerSlice = createSlice({
    name: "isoddata",
    initialState: {},
    reducers: {
        fetch: function (state = {}, action) {
        },
        applyFilters: function (state = {}, action) {
            state.viewData = filter(state.data, action?.payload?.org, action?.payload?.owner);
        },
        setData: function (state = {}, action) {
            state.data = action?.payload?.resp;
            state.viewData = action?.payload?.resp;
            state.downloadDate = action?.payload?.date;
        },
        setLoading: function (state = {}, action) {
            state.isLoading = action?.payload ?? false;
        }
    }
});