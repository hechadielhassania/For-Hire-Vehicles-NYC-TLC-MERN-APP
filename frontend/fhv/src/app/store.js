import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicles/vehicleSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
  },
});
