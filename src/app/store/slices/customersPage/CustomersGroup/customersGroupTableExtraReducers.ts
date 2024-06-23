import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getCustomersGroupTable } from './customersGroupTableAsyncThunks';
import { customersGroupSliceModel } from 'src/app/models/customersGroupSliceModel';

export const getCustomerGroupTableReducer = (
	builder: ActionReducerMapBuilder<customersGroupSliceModel>,
) => {
	builder
		// get customer group table
		.addCase(getCustomersGroupTable.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(getCustomersGroupTable.fulfilled, (state, action) => {
			state.isLoading = false;
			state.customersGroup = action.payload;
		})
		.addCase(getCustomersGroupTable.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
};
