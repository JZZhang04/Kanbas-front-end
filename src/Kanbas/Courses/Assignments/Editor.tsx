import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedContent from "../ProtectedContent";
import {
  setAssignments,
  upsertAssignment,
} from "./reducer";
import * as assignmentsClient from "./client";
import * as coursesClient from "../../Courses/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer)
  const assignment = assignments.find((a: any) => a._id === aid) || {
    _id: "",
    title: "",
    description: "",
    points: 100,
    group: "ASSIGNMENTS",
    submissionType: "Online",
    assignTo: "Everyone",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  };

  // Local state to manage the form inputs
  const [title, setTitle] = useState(assignment ? assignment.title : "");
  const [description, setDescription] = useState(assignment.description);
  const [points, setPoints] = useState(assignment.points);
  const [group, setGroup] = useState(assignment.group);
  const [submissionType, setSubmissionType] = useState(assignment.submissionType);
  const [assignTo, setAssignTo] = useState(assignment.assignTo);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [availableFrom, setAvailableFrom] = useState(assignment.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(assignment.availableUntil);

  /*
  const handleSave = () => {
    const modifiedAssignment = {
      _id: assignment?._id || `${Date.now()}`, 
      title,
      description,
      points,
      group,
      submissionType,
      assignTo,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid, 
    };
    dispatch(upsertAssignment(modifiedAssignment));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  */


  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid) {
        const assignment = await assignmentsClient.getAssignmentById(aid);
        setTitle(assignment.title);
        setDescription(assignment.description);
        setPoints(assignment.points);
        setGroup(assignment.group);
        setSubmissionType(assignment.submissionType);
        setAssignTo(assignment.assignTo);
        setDueDate(assignment.dueDate);
        setAvailableFrom(assignment.availableFrom);
        setAvailableUntil(assignment.availableUntil);
      }
    };

    fetchAssignment();
  }, [aid]);

  const handleSave = async () => {
      const modifiedAssignment = {
        _id: aid || `${Date.now()}`,
        title,
        description,
        points,
        group,
        submissionType,
        assignTo,
        dueDate,
        availableFrom,
        availableUntil,
        course: cid,
      };
      if (aid) {
        await assignmentsClient.updateAssignment(modifiedAssignment); // Update existing assignment
      } else {
        await coursesClient.createAssignment(cid || "", modifiedAssignment);
      }
      dispatch(upsertAssignment(modifiedAssignment)); // Update Redux state
      navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to assignments list
  };

  return (
    <div id="wd-assignments-editor">

      <label htmlFor="wd-name">
        Assignment Name</label>
      <div className="row mt-4">
        <input id="wd-name"
          value={title} onChange={(e) => setTitle(e.target.value)}
          className="form-control" />
      </div>

      <div className="row mt-4">
        <textarea id="wd-description" className="col-sm-2 col-form-label"
          value={description} onChange={(e) => setDescription(e.target.value)}>
        </textarea>
      </div>


      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-points" className="col-sm-4 col-form-label text-end">Points</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <input id="wd-points" className="form-control" value={points}
            onChange={(e) => setPoints(Number(e.target.value))} />
        </div>
      </div>

      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-group" className="col-sm-4 col-form-label text-end">
          Assignment Group</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <select id="wd-group" className="form-select">
            <option defaultValue="ASSIGNMENTS">ASSIGNMENTS</option>
            <option defaultValue="LABS">LABS</option>
          </select>
        </div>
      </div>


      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label text-end">
          Display Grade as</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <select id="wd-display-grade-as" className="form-select">
            <option defaultValue="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-submission-type" className="col-sm-4 col-form-label text-end">
          Submission Type
        </label>

        <div className="col-sm-6">
          <div className="d-flex flex-column form-control">
            <div className="d-flex justify-content-end">
              <select id="wd-submission-type" className="form-select">
                <option defaultValue="Online">Online</option>
              </select>
            </div>

            <fieldset className="mt-4 mb-4">
              <strong> Online Entry Options</strong>
              <div className="form-check mt-4">
                <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check mt-4">
                <input className="form-check-input" type="checkbox" id="wd-website-url" />
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check mt-4">
                <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                <label className="form-check-label" htmlFor="wd-media-recordings">
                  Media Recordings
                </label>
              </div>
              <div className="form-check mt-4">
                <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                <label className="form-check-label" htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div className="form-check mt-4">
                <input className="form-check-input" type="checkbox" id="wd-file-upload" />
                <label className="form-check-label" htmlFor="wd-file-upload">
                  File Uploads
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>


      <div className="row mt-4 justify-content-end">
        <label className="col-sm-4 col-form-label text-end">
          Assign
        </label>

        <div className="col-sm-6">
          <div className="d-flex flex-column form-control">

            <label htmlFor="wd-assign-to" className="mt-4" style={{ fontWeight: 'bold' }}>
              Assign to
            </label>
            <input id="wd-assign-to" className="form-control mt-2" defaultValue="Everyone" />

            <label htmlFor="wd-due-date" className="mt-4" style={{ fontWeight: 'bold' }}>
              Due
            </label>
            <input type="date" id="wd-due-date" className="form-control mt-2"
              value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="mt-4" style={{ fontWeight: 'bold' }}>
                  Available from
                </label>
                <input type="date" id="wd-available-from" className="form-control mt-2"
                  value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-until" className="mt-4" style={{ fontWeight: 'bold' }}>
                  Until
                </label>
                <input type="date" id="wd-available-until" className="form-control mt-2"
                  value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <ProtectedContent allowedRole="FACULTY">
        <div className="row mt-4 justify-content-end">
          <div className="col-sm-6 d-flex justify-content-end">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-primary">
              Save</button>
          </div>
        </div>
      </ProtectedContent>


    </div>
  );
}
