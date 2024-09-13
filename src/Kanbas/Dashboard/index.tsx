import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1200 Python
            </Link>
            <p className="wd-dashboard-course-title">
              Programming Foundation
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1201 Discrete Math
            </Link>
            <p className="wd-dashboard-course-title">
              Discrete Math
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1202 Object Oriented Design
            </Link>
            <p className="wd-dashboard-course-title">
              Object Oriented Design
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1203 Data Structure
            </Link>
            <p className="wd-dashboard-course-title">
              Data Structure
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1204 Java Programming
            </Link>
            <p className="wd-dashboard-course-title">
            Java Programming
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1205 C++ Programming
            </Link>
            <p className="wd-dashboard-course-title">
              C++ Programming
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        <div className="wd-dashboard-course">
        <img src="/images/placeholder.jpg" width={200} />
          <div>                                              
            <Link className="wd-dashboard-course-link"       
              to="/Kanbas/Courses/1234/Home">
              CS1206 Algorithms
            </Link>
            <p className="wd-dashboard-course-title">
              Algorithms
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
