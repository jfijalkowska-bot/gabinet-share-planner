
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  className 
}) => {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
