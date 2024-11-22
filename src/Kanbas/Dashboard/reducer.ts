import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], // Local Redux state for enrollments
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Set enrollments (useful for initialization or syncing state with the database)
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    enroll: (state, { payload: { userId, courseId } }) => {
      // Check if the user is already enrolled in the course
      const isAlreadyEnrolled = state.enrollments.some(
        (enrollment: any) => enrollment.user === userId && enrollment.course === courseId
      );

      // If not enrolled, add a new enrollment record
      if (!isAlreadyEnrolled) {
        const newEnrollment = {
          _id: Date.now().toString(),
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
        // console.log("after enroll:", state.enrollments);
      } else {
        // Optionally, log or handle the case where the user is already enrolled
        console.warn(`User ${userId} is already enrolled in course ${courseId}`);
      }
    },


    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
      //console.log("after unenroll:", state.enrollments);
    },



  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
