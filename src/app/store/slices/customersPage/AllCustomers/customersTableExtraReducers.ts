import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getAllCustomersTable } from './customersTableAsyncThunks';
import { allCustomerSliceModel } from 'src/app/models/allCustomerSliceModel';

export const getAllCustomerTableReducer = (
	builder: ActionReducerMapBuilder<allCustomerSliceModel>,
) => {
	builder
		// get all customer  table
		.addCase(getAllCustomersTable.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(getAllCustomersTable.fulfilled, (state, action) => {
			state.isLoading = false;
			state.allCustomer = action.payload;
		})
		.addCase(getAllCustomersTable.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
};
