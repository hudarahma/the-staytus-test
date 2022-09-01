import { configureStore } from '@reduxjs/toolkit';
import formRedecer from './formSlice';

export default configureStore({
  reducer: {
    form: formRedecer,
  },
});
