import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const filterAdapter = createEntityAdapter()

const initialState = filterAdapter.getInitialState({
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
})


export const fetchFilters = createAsyncThunk(
    'filers/fetchFilters', 
    async () => {
        const {request} = useHttp()
        return await request("http://localhost:3001/filters")
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => {state.activeFilter = action.payload},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                filterAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice

export default reducer;

export const {selectAll} = filterAdapter.getSelectors(state => state.filters);

export const {
    filtersFetching,
    filtersCreated,
    filterChanged,
    filtersFetchingError
} = actions