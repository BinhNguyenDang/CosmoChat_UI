import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing necessary components from React Router.
import Chat from "./pages/Chat"; // Importing the Chat component.
import Layout from "./Layout";
import Home from "./pages/Home"; // Importing the Home component.
import EndedChats from "./pages/EndedChats"; // Importing the EndedChats component.
import Activity from "./pages/Activity"; // Importing the Activity component.

/**
 * The root component of the application, responsible for defining routes using React Router.
 * @returns {JSX.Element} The JSX element representing the entire application.
 */
function App() {
  return (
    <Router>
      {/* The `Routes` component is used to define the routing configuration */}
      <Routes>
        {/* The `Route` component defines individual routes */}
        <Route element={<Layout />}>
          {/* Route for the Home page */}
          <Route path="/" index element={<Home />}></Route>
          {/* Route for individual chat sessions */}
          <Route path="/sessions/:id" element={<Chat />}></Route>
          {/* Route for displaying ended chat sessions */}
          <Route path="/endedChats" element={<EndedChats />}></Route>
          {/* Route for the Activity page */}
          <Route path="/activity" element={<Activity />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component.
