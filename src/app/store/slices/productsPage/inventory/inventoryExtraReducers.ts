import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getInventoryTable } from './inventoryAsyncThunks';
import { inventorySliceModel } from 'src/app/models/inventorySliceModel';

export const getInventoryReducer = (builder: ActionReducerMapBuilder<inventorySliceModel>) => {
	builder
		// get c table
		.addCase(getInventoryTable.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(getInventoryTable.fulfilled, (state, action) => {
			state.isLoading = false;
			state.inventory = action.payload;
		})
		.addCase(getInventoryTable.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
};
