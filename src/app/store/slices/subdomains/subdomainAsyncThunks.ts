// import { createAsyncThunk } from '@reduxjs/toolkit';
// import PublicRequest from 'src/app/utils/AxiosUtils/PublicRequests';

// export const getSubdomain = createAsyncThunk('subdomain/getSubdomain', (payload: string) =>
// 	PublicRequest.getData(`https://my.dookan.net/api/v1/merchant/get-domain/${payload}`),
// );


import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface GetSubdomainResponse {
    data: string[];
    message: string;
}

export const getSubdomain = createAsyncThunk<GetSubdomainResponse, string>(
    'subdomain/getSubdomain',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://my.dookan.net/api/v1/merchant/get-domain`, {
                params: { email }
            });
            console.log('response.data;',response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);



