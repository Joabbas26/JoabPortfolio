import { createSlice } from "@reduxjs/toolkit";

const NewRowSlice = createSlice({
    name: 'newRow',
    initialState : [],
    reducers: {
        addRow: (state, action) => {
            const newRow = {
                rowNum: action.payload.rowNum,
                fName: action.payload.fName, 
                lName: action.payload.lName,
                age: action.payload.age,
                fTime: action.payload.fTime,
                oTime: action.payload.oTime,
                recomm: action.payload.recomm,
                total: action.payload.total,
            };
            state.push(newRow);
        },
        deleteRow: (state, action) => {
                state.splice(action.payload.rowNum - 1, 1);
            },
        saveRow: (state, action) => {
            const updatedRow = {
                // rowNum: action.payload.rowNum,
                fName: action.payload.fName, 
                lName: action.payload.lName,
                age: action.payload.age,
                fTime: action.payload.fTime,
                oTime: action.payload.oTime,
                recomm: action.payload.recomm,
                total: action.payload.total,
            };
                state.splice(state.findIndex((arrow)=> arrow.id === action.payload), 1, updatedRow);
        },
    },
});

export default NewRowSlice.reducer;
export const { addRow, deleteRow, saveRow } = NewRowSlice.actions;
