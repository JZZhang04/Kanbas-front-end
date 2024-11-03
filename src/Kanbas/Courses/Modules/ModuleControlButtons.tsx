import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ProtectedContent from "../ProtectedContent";

export default function ModuleControllButtons(
  { moduleId, deleteModule, editModule }: {
    moduleId: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void
  }) {
  return (
    <div className="float-end">
      <ProtectedContent allowedRole="FACULTY">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
      </ProtectedContent>
      <span className="me-1">
        <GreenCheckmark /></span>
      <FaPlus className="me-1 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
