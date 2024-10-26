import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
// import postsSlice from './postsSlics';

const store = configureStore({
    reducer: {
        auth : authSlice,
      //TODO: add more slices here for videos done

       
    }
});


export default store;