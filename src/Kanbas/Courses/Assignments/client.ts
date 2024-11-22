import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;


export const getAssignmentById = async (assignmentId: string) => {
    const { data } = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};



