import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing necessary components from React Router.
import Chat from "./pages/Chat"; // Importing the Chat component.

/**
 * The root component of the application, responsible for defining routes using React Router.
 * @returns {JSX.Element} The JSX element representing the entire application.
 */
function App() {
  return (
    <Router>
      {/* The `Routes` component is used to define the routing configuration */}
      <Routes>
        {/* Direct route for testing the Chat component */}
        <Route path="/sessions/:id" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component.
