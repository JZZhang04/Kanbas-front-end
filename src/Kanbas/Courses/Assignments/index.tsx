import { BsGripVertical } from 'react-icons/bs';
import GreenCheckmark from '../Modules/GreenCheckmark';
import { CiSearch } from "react-icons/ci";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RxTriangleDown } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from 'react-icons/io5';
import { Link, useParams } from "react-router-dom";
import ProtectedContent from "../ProtectedContent";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAssignments,
  upsertAssignment,
  deleteAssignment,
} from "./reducer";
import { useNavigate } from "react-router-dom";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const {assignments} = useSelector((state:any) => state.assignmentsReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
      if (cid) {
        fetchAssignments();
      }
    }, [cid]); 
    
  const fetchAssignments = async () => {
    const assignments = await coursesClient.getAllAssignments(cid as string);
    dispatch(setAssignments(assignments));
  };
 
  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  const handleDeleteAssignment = async (assignmentId: any) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this assignment?");
    if (confirmDelete) {
      try {
        await assignmentsClient.deleteAssignment(assignmentId);
        fetchAssignments();  // Re-fetch assignments after deletion to update the state
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  console.log("in index:",assignments);
    


  return (
    <div id="wd-assignments">
      
      <div className="input-group mb-3">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <input
              id="wd-search-assignment"
              className="form-control border-start-0 rounded"
              placeholder="Search..."
              style={{ textAlign: "left", width: "300px" }}
            />
            <span
              className="input-group-text bg-white border-end-0 rounded"
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CiSearch
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "30%",
                  zIndex: 10,
                }}
              />
            </span>
          </div>

          <ProtectedContent allowedRole="FACULTY">
          <div className="d-flex ms-auto">
            <button id="wd-add-assignment-group" className="btn btn-secondary d-flex align-items-center ms-2">
              <FaPlus className="me-1" /> Group
            </button>
            <button id="wd-add-assignment" className="btn btn-primary-red d-flex align-items-center ms-2"
              onClick={handleAddAssignment}>
              <FaPlus className="me-1" /> Assignment
            </button>
          </div>
          </ProtectedContent>

        </div>
      </div>


      <ul className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">

        <li className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center" style={{ border: "0.5px solid black" }}>
          <BsGripVertical className="me-2 fs-3 align-items-center"
            style={{ marginLeft: "5px" }} />
          <RxTriangleDown className="me-2 fs-3 align-items-center" />
          <strong>ASSIGNMENTS</strong>
          <div className="d-flex ms-auto align-items-center">
            <button className="btn btn-outline-dark" style={{ marginRight: "15px", borderRadius: "50px" }}>
              40% of Total</button>
            <FaPlus className="fs-4 align-items-center" style={{ marginRight: "15px" }} />
            <IoEllipsisVertical className="fs-4 align-items-center" />
          </div>
        </li>


        <ul id="wd-assignment-list" className="p-0 m-0 list-group rounded-0">

        {assignments.filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) =>(
          <li key = {assignment._id}
          className="wd-assignment-list-item list-group-item p-3 ps-2 d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 align-self-center" />
              <PiNotePencilDuotone className="me-2 fs-3 align-self-center" style={{ color: "green" }} />

              <div className="d-flex flex-column me-2">
                <Link className="wd-assignment-link d-flex align-items-center"
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  style={{ color: "inherit", textDecoration: "none", paddingLeft: "20px" }}>
                  <strong>{assignment.title}</strong>
                </Link>
                <div style={{ color: "inherit", textDecoration: "none", paddingLeft: "20px" }}>
                  <span style={{ color: "rgb(225, 5, 5)" }}>Multiple Modules</span> | Not available until May 6 at 12:00 am |
                  <br /> Due May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center" style={{ paddingTop: "2.5%" }}>
            <ProtectedContent allowedRole="FACULTY">
            <FaTrash className="text-danger me-2 mb-1"  
            onClick={() => handleDeleteAssignment(assignment._id)}/>
            </ProtectedContent>
              <span className="d-flex align-items-center me-2">
                <GreenCheckmark />
              </span>
              <IoEllipsisVertical className="fs-4 align-self-center" />
            </div>
          </li>
          ))}

        </ul>
      </ul>

    </div>
  );
}

