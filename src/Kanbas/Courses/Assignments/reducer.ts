import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";


const initialState = {
    assignments: assignments,
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (assignment: any) => assignment._id !== assignmentId
            );
        },

        upsertAssignment: (state, { payload: assignment }) => {
            const existingIndex = state.assignments.findIndex(
                (item) => item._id === assignment._id
            );

            if (existingIndex !== -1) {
                // Replace the existing assignment with the new one
                state.assignments[existingIndex] = assignment;
            } else {
                // Add new assignment with a generated ID if it doesn't exist
                const newAssignment = {
                    ...assignment,
                    _id: assignment._id || new Date().getTime().toString(),
                };
                state.assignments.push(newAssignment);
            }
        },
    },
});


export const { deleteAssignment, upsertAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
