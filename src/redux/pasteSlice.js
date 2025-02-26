import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let savedPastes;
try {
  savedPastes = JSON.parse(localStorage.getItem('pastes')) || [];
} catch (error) {
  console.error("Error parsing pastes from localStorage:", error);
  savedPastes = [];
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState : {
        pastes: savedPastes,
    },
    reducers: {
        addToPastes: (state, action) => {

            //add a check if paste already exists
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast("Paste created Successfully")
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste.id);

            if(index >= 0) {
                state.pastes[index] = paste;

                localStorage.setItem("pastes", JSON.stringify(state.pastes));
            }
            toast.success("Paste Updated")
        },
        resetAllPastes: (state, action) => {
            state.pastes = [];

            localStorage.removeItem("pastes");
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;

            console.log(pasteId);
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if(index >= 0) {
                state.pastes.splice(index, 1);

                localStorage.setItem("pastes", JSON.stringify(state.pastes));

                toast.success("Paste deleted")
            }
        },
    },
})

export const {addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer