import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.post(ENROLLMENTS_API, { userId, courseId });
    return response.data; // The created enrollment object
};

export const unenrollUserInCourse = async (userId: string, courseId: string) => {
    await axios.delete(ENROLLMENTS_API, {
        data: { userId, courseId },
    });
};


export const fetchAllEnrollments = async () => {
    const response = await axios.get(ENROLLMENTS_API);
    return response.data; // Array of enrollments
};