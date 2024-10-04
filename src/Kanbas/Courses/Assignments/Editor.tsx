export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>

      <div className="mb-3 row">

        <input id="wd-name" value="A1" className="form-control input-spacing" />

        <textarea id="wd-description" className="col-sm-2 col-form-label input-spacing">
          {`The assignment is available online.
          Submit a link to the landing page of your Web application running onNetlify.
          The landing page should include the following:
            *   Your full name and section
            *   Links to each of the lab assignments
            *   Link to the Kanbas application
            *   Links to all relevant source code repositories
          The Kanbas application should include a link to navigate back to the landing page.`}
        </textarea>




        <div className="row mb-3 input-spacing justify-content-end"> 
          
            <label htmlFor="wd-points" className="col-sm-2 col-form-label">Points</label>
            
            <div className="col-sm-10">
            <input id="wd-points" className="form-control" value={100} />
            </div>

        </div>





        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" className="form-control input-spacing">
              <option value="VAL1">ASSIGNMENTS</option>
              <option value="VAL2">LABS</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="VAL1">Percentage</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="VAL1">Online</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label><br />
            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label><br />
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" value={"Everyone"} />
            <br />
            <br />
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date"
              id="wd-due-date"
              value="2024-05-13" />
            <br />
            <br />
            <td>
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input type="date"
                id="wd-available-from"
                value="2024-05-06" />
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input type="date"
                id="wd-available-until"
                value="2024-05-20" />
            </td>
            <br />
          </td>
        </tr>





      </div>
    </div>
  );
}
