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

            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste created Successfully")
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);

            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
            }
            toast.success("Note updated successfully!");
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

                toast.success("Paste deleted successfully!")
            }
        },
    },
})

export const {addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer