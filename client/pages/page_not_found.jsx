import { Link } from "react-router-dom";

export default function PageNotFound({}) {
  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h1>404 Error</h1>
      <p>No page could be found at this address...</p>
    </div>
  );
}
