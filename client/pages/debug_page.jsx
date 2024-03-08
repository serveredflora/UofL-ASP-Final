import React, { useState, useEffect } from 'react';

export default function Debug() {
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  useEffect(() => {
    // Function to fetch paginated data from your API
    const fetchData = async () => {
      try {
        // Fetch data from the updated endpoint with pagination support
        const response = await fetch(`/generic/data/contents/page/${currentPage}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const {data, currentPage: page, maxPages: max} = await response.json();
        setContents(data);
        setCurrentPage(page);
        setMaxPages(max);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, [currentPage]); // Dependency array includes currentPage to refetch data when it changes

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col space-y-8 adaptive-margin">
      <h1>Debug Page</h1>
      {contents.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Language</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content, index) => (
                <tr key={index}>
                  <td>{content.title}</td>
                  <td>{content.type}</td>
                  <td>{content.language}</td>
                  <td>{content.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>Prev</button>
            <span>Page {currentPage} of {maxPages}</span>
            <button onClick={() => handlePageChange(Math.min(maxPages, currentPage + 1))} disabled={currentPage >= maxPages}>Next</button>
          </div>
        </>
      ) : (
        <p>No content found.</p>
      )}
    </div>
  );
}
