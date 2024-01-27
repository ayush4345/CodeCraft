// Import necessary components and data
import React from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import Workspace from '../../components/Workspace/Workspace';

// ProblemPage component
export default function ProblemPage() {
  // Get the 'pid' parameter from the URL
  const { pid } = useParams();

  // Fetch the corresponding problem id
  const problemData ={
    id:pid
  }

  // Handle case where 'pid' is not found
  if (!problemData) {
    return <div>Error: Problem not found</div>;
  }

  // Render the page using 'problemData'
  return (
    <>
      <Topbar problemPage />
      <Workspace problem={problemData} />
    </>
  );
}
