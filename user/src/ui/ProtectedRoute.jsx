import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // If no authenticated user, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      //   navigate("/login"); // Redirect to login page
    }
  }, [isAuthenticated, isLoading, navigate]);

  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there is a user, render the app
  if (isAuthenticated) return children;

  // Optionally return a fallback, like null or a message if not authenticated
  return null;
}

export default ProtectedRoute;
