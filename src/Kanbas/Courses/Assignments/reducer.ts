import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },


        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        

        upsertAssignment: (state: any, { payload: assignment }) => {
            const existingIndex = state.assignments.findIndex(
                (item: any) => item._id === assignment._id
            );

            if (existingIndex !== -1) {
                // Update the existing assignment
                state.assignments[existingIndex] = {
                    ...state.assignments[existingIndex],
                    ...assignment,
                };
            } else {
                // Add a new assignment
                const newAssignment = {
                    ...assignment,
                    _id: assignment._id || new Date().getTime().toString(),
                };
                state.assignments.push(newAssignment);
            }
        },

    },
});


export const {
    setAssignments,
    upsertAssignment,
    deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;