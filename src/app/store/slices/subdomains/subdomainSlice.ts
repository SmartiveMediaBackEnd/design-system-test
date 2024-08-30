import { createSlice } from '@reduxjs/toolkit';
import { subdomainReducer } from './subdomainExtraReducers';
// import { statusGlobal } from 'src/app/models';
export interface SubdomainState {
    subdomains: string[];
    isLoading: boolean;
    error: string | null;
}
const initialState: SubdomainState = {
	subdomains: [],
	isLoading: false,
	error: null,
};

const shippingSlice = createSlice({
	name: 'subdomains',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		subdomainReducer(builder);
	},
});

export default shippingSlice.reducer;
