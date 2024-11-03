import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedContent from "../Courses/ProtectedContent";
import { enroll, unenroll } from "./reducer"

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Toggle showAllCourses when Enrollments button clicked
  const handleToggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };
  // Determine if user is enrolled in a course
  const isEnrolled = (courseId: any) =>
    enrollments.some(
      (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );
  // Filter courses based on showAllCourses state
  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((course) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
      )
    );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      <ProtectedContent allowedRole="FACULTY">
        <h5>New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
            onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>
        </h5>
        <br />
        <input value={course.name} className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <textarea value={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      </ProtectedContent>

      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})
        <ProtectedContent allowedRole="STUDENT">
          <button className="btn btn-primary float-end" onClick={handleToggleEnrollments}> Enrollments </button>
        </ProtectedContent></h2>

      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {/* 
          {courses.filter((course) =>
            enrollments.some(
              (enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
            )).map((course) => (
            */}
          {filteredCourses.map((course) => {
 
            return (
              
              <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                
                  <Link to={isEnrolled(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={`/images/${course._id}.png`}
                      onError={(e) => { // if no matching images, display default one
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevents infinite loop if the fallback image fails
                        target.src = "/images/reactjs.png";
                      }}
                      width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>

                      <ProtectedContent allowedRole="STUDENT">
                        {isEnrolled(course._id) ? (
                          <button className="btn btn-danger"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(unenroll({ userId: currentUser._id, courseId: course._id }));
                            }} >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(enroll({ userId: currentUser._id, courseId: course._id }));
                            }} >
                            Enroll
                          </button>
                        )}
                      </ProtectedContent>

                      <ProtectedContent allowedRole="FACULTY">
                        <button className="btn btn-primary"> Go </button>
                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </ProtectedContent>

                    </div>
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
