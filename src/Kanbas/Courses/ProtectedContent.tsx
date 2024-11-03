import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

interface ProtectedContentProps {
  children: ReactNode;
  allowedRole: string;  // Add a prop for the allowed role
}

export default function ProtectedContent({ children, allowedRole }: ProtectedContentProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser && currentUser.role === allowedRole) {
    return <>{children}</>;
  }

  return null;
}
