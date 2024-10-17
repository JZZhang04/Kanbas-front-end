import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((assignment) => assignment._id === aid);

    return (
    <div id="wd-assignments-editor">

      <label htmlFor="wd-name">
        Assignment Name</label>
      <div className="row mt-4">
        <input id="wd-name" 
        value={assignment ? assignment.title : ""} 
        className="form-control" />
      </div>

      <div className="row mt-4">
        <textarea id="wd-description" className="col-sm-2 col-form-label">
          {`The assignment is available online.
          Submit a link to the landing page of your Web application running onNetlify.
          The landing page should include the following:
            *   Your full name and section
            *   Links to each of the lab assignments
            *   Link to the Kanbas application
            *   Links to all relevant source code repositories
          The Kanbas application should include a link to navigate back to the landing page.`}
        </textarea>
      </div>


      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-points" className="col-sm-4 col-form-label text-end">Points</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <input id="wd-points" className="form-control" value={100} style={{ width: "100%" }} />
        </div>
      </div>

      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-group" className="col-sm-4 col-form-label text-end">
          Assignment Group</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="LABS">LABS</option>
          </select>
        </div>
      </div>


      <div className="row mt-4 justify-content-end">
        <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label text-end">
          Display Grade as</label>
        <div className="col-sm-6 d-flex justify-content-end">
          <select id="wd-display-grade-as" className="form-select">
            <option value="Percentage">Percentage</option>
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
                <option value="Online">Online</option>
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
            <input id="wd-assign-to" className="form-control mt-2" value="Everyone" />

            <label htmlFor="wd-due-date" className="mt-4" style={{ fontWeight: 'bold' }}>
              Due
            </label>
            <input type="date" id="wd-due-date" className="form-control mt-2" value="2024-05-13" />

            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="mt-4" style={{ fontWeight: 'bold' }}>
                  Available from
                </label>
                <input type="date" id="wd-available-from" className="form-control mt-2" value="2024-05-06" />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-until" className="mt-4" style={{ fontWeight: 'bold' }}>
                  Until
                </label>
                <input type="date" id="wd-available-until" className="form-control mt-2" value="2024-05-20" />
              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="row mt-4 justify-content-end">
        <div className="col-sm-6 d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-primary">
            Save
          </Link>
        </div>
      </div>


    </div>
  );
}
