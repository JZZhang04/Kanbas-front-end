import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from  "../Database";

const initialState = {
    enrollments: enrollments,
  };
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
      enroll: (state, action) => {
        const { userId, courseId } = action.payload;
        state.enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
      },
      unenroll: (state, action) => {
        const { userId, courseId } = action.payload;
        state.enrollments = state.enrollments.filter(
          (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
        );
      },
    },
  });
  
  export const { enroll, unenroll } = enrollmentsSlice.actions;
  export default enrollmentsSlice.reducer;
