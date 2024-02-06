import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 flightDetails:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setFlightDetails(state, {payload}) {
      state.flightDetails = payload;
    },
  },
});

export const {setFlightDetails} = userSlice.actions;

export default userSlice.reducer;
