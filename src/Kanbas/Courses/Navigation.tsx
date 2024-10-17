import { Link, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const location = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 d-none d-md-block">

      {links.map((link) => (
        <Link key={link}
          to={`/Kanbas/Courses/${cid}/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item ${location.pathname===`/Kanbas/Courses/${cid}/${link}` ? "active" : "text-danger"} border border-0`}>
          {link}
        </Link>
      ))}

    </div>
  );
}

