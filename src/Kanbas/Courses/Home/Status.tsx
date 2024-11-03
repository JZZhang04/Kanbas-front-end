import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { PiCrosshair } from "react-icons/pi";
import { RiBarChartFill } from "react-icons/ri";
import { RiMegaphoneLine } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import ProtectedContent from "../ProtectedContent";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }} className="d-none d-lg-block">
      <h2>Course Status</h2>

      <ProtectedContent allowedRole="FACULTY">
        <div className="d-flex">
          <div className="w-50 pe-1">
            <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
              <MdDoNotDisturbAlt className="me-2 fs-5" />Unpublish</button>
          </div>
          <div className="w-50">
            <button className="btn btn-lg btn-success w-100">
              <FaCheckCircle className="me-2 fs-5" />Publish</button>
          </div>
        </div> <br />

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" />Import Existing Cotent</button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <PiCrosshair className="me-2 fs-5" />Choose Home Page</button>
      </ProtectedContent>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <RiBarChartFill className="me-2 fs-5" />View Course Stream</button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <RiMegaphoneLine className="me-2 fs-5" />New Announcement</button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoBarChartSharp className="me-2 fs-5" />New Analytics</button>

      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaRegBell className="me-2 fs-5" />View Course Notifications</button>

    </div>
  );
}
