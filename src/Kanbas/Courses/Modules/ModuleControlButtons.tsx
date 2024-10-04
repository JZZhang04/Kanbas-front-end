import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
export default function ModuleControllButtons() {
  return (
    <div className="float-end">
      <span className="me-1">
      <GreenCheckmark /></span>
      <FaPlus className="me-1 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
