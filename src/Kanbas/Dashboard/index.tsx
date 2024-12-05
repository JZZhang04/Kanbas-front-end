import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedContent from "../Courses/ProtectedContent";
import { enroll, unenroll, setEnrollments } from "./reducer";
import {
  enrollUserInCourse,
  unenrollUserInCourse,
  fetchAllEnrollments,
} from "./client";
import { fetchAllCourses } from "../Courses/client";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );
  const dispatch = useDispatch();

  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showEnrolledOnly, setShowEnrolledOnly] = useState<boolean>(true);

  const preloadEnrollments = async () => {
    if (currentUser) {
      const fetchedEnrollments = await fetchAllEnrollments();
      dispatch(setEnrollments(fetchedEnrollments));
    }
  };

  const preloadCourses = async () => {
    const fetchedCourses = await fetchAllCourses();
    // if (showEnrolledOnly) {
    //   const enrolledCourses = Array.isArray(enrollments)
    //     ? fetchedCourses.filter((course: any) =>
    //         Array.isArray(enrollments) && enrollments.some(
    //           (enrollment: any) =>
    //             enrollment.user === currentUser._id &&
    //             enrollment.course === course._id
    //         )
    //       )
    //     : []; // Default to an empty array if enrollments is not ready
    //   setAllCourses(enrolledCourses);
    // } else {
      setAllCourses(fetchedCourses);
    // }
  };
  

  useEffect(() => {
    preloadEnrollments();
  }, [currentUser, dispatch]);

  useEffect(() => {
    preloadCourses();
  }, [enrollments, showEnrolledOnly, courses]);

  const handleToggleEnrollments = async () => {
    setShowEnrolledOnly((prev) => !prev);
  };

  console.log("Enrollments: ", enrollments);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />

      <ProtectedContent allowedRole="FACULTY">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </ProtectedContent>

      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({allCourses.length || courses.length})
        <ProtectedContent allowedRole="STUDENT">
          <button
            className="btn btn-primary float-end"
            onClick={handleToggleEnrollments}
          >
            {showEnrolledOnly ? "Show All" : "Show Enrolled"}
          </button>
        </ProtectedContent>
      </h2>

      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {allCourses.map((course) => (

            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={ Array.isArray(enrollments) &&enrollments.some(
                    (enrollment: any) =>
                      enrollment.user === currentUser._id &&
                      enrollment.course === course._id)
                    ? `/Kanbas/Courses/${course._id}/Home`
                    : `/Kanbas/Dashboard`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={`/images/${course._id}.png`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // prevents infinite loop if the fallback image fails
                      target.src = "/images/reactjs.png";
                    }}
                    width="100%"
                    height={160}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}{" "}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}{" "}
                    </p>

                    <ProtectedContent allowedRole="STUDENT">
                      { Array.isArray(enrollments) && enrollments.some(
                        (enrollment: any) =>
                          enrollment.user === currentUser._id &&
                          enrollment.course === course._id
                      ) ? (
                        <button
                          className="btn btn-danger float-end"
                          onClick={async (event) => {
                            event.preventDefault();
                            await unenrollUserInCourse(
                              currentUser._id,
                              course._id
                            );
                            dispatch(
                              unenroll({
                                userId: currentUser._id,
                                courseId: course._id,
                              })
                            );
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success float-end"
                          onClick={async (event) => {
                            event.preventDefault();
                            await enrollUserInCourse(
                              currentUser._id,
                              course._id
                            );
                            dispatch(
                              enroll({
                                userId: currentUser._id,
                                courseId: course._id,
                              })
                            );
                          }}
                        >
                          Enroll
                        </button>
                      )}
                    </ProtectedContent>

                    <button className="btn btn-primary"> Go </button>
                    <ProtectedContent allowedRole="FACULTY">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </ProtectedContent>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
