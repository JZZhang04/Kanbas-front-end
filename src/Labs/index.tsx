import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC"
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
export default function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <h1>Jiazuo Zhang</h1>
      <a href="https://github.com/JZZhang04/kanbas-react-web-app-cs5610-fa24.git" id="wd-github">
      GitHub Repository</a>

      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
