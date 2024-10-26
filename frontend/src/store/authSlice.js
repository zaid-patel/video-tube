import { createSlice } from "@reduxjs/toolkit"


const initialState={
    status:false,
    userData:null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            console.log(action.payload)
            state.status=true;
            state.userData=action.payload.user
            console.log(state.userData)
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }
    }

})


export const {login,logout} =authSlice.actions


export default authSlice.reducer;