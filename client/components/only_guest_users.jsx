import { Navigate } from 'react-router-dom';

const OnlyGuestUsers = ({ children }) => {
  const userToken = localStorage.getItem('userToken'); 

  if (userToken) {
    // User is logged in, redirect them from the register page to the home page
    return <Navigate to="/" />;
  }

  // User is not logged in, allow them to proceed to the register page
  return children;
};

export default OnlyGuestUsers; 
