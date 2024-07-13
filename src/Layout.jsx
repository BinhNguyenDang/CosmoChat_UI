import React, { useEffect, useState } from "react"; 
import { Outlet } from "react-router-dom"; 
import Navigation from "./components/Navigation"; 
import { useLocation } from "react-router-dom";

// The Outlet component is a unique feature of React Router that serves as a placeholder where child routes are rendered. It acts as a container for nested routes defined within the parent route component. When a route matches its path, the components associated with the nested routes are rendered inside the Outlet. Essentially, it provides a way to render child components dynamically based on the current route, enabling hierarchical routing within React applications.
/* Outlet:
    Outlet is a fundamental component provided by React Router. It serves as a placeholder within the route hierarchy where child routes are rendered.
    When a route component contains an Outlet, it acts as a location where the child routes defined within that parent component will be rendered.
    Essentially, Outlet enables nested routing in React applications. It allows us to define a hierarchy of routes and render components dynamically based on the current URL path.
    Without Outlet, it would be challenging to render nested routes because there wouldn't be a designated space to display them within the parent route component.
    By using Outlet, we can create complex routing structures with ease, organizing our application's UI into logical sections that correspond to different URL paths.
*/
/**
 * Layout component responsible for managing the overall layout of the application and navigation state.
 * @returns {JSX.Element} JSX element representing the layout of the application.
 */
const Layout = () => {
    // State management using useState hook for navigation state.
    const [isChat, setIsChat] = useState(false);
    const [isActivity, setIsActivity] = useState(false);

    // The useLocation hook is a React Router hook that provides access to the current URL location. It returns a location object containing information about the current URL pathname, search parameters, hash, and other relevant data. By using this hook, components can react to changes in the URL and update their behavior or UI accordingly. It's particularly useful for building dynamic applications where different components need to respond to changes in the URL to reflect the current application state.
  /* useLocation:
      useLocation is a React Router hook that provides access to the current URL location within a functional component.
      When we call useLocation within a component, it returns a location object containing various properties related to the current URL.
      The location object includes information such as the current pathname, search parameters, hash, and state.
      By accessing the pathname property of the location object, we can determine the current URL path and use it to conditionally render components or manage application state.
      useLocation is particularly useful for building dynamic applications where components need to respond to changes in the URL to reflect different states or content.
      It enables components to be aware of the current URL context and react accordingly, allowing for flexible and responsive user experiences within React Router-based applications
  */
    // The useLocation hook is a React Router hook used to access the current location object. It provides information about the current URL, including the path, search, hash, and state. This hook is useful for accessing and manipulating the current location in a component without having to explicitly pass it as a prop.
    const location = useLocation();

    // useEffect hook to update navigation state based on the current URL path.
    useEffect(() => {
        // Checking if the current URL path matches the chat route path.
        if (location.pathname === "/") {
            setIsChat(false);
            setIsActivity(false);
        }
        // Checking if the current URL path matches the activity route path.
        else if (location.pathname === "/activity") {
            setIsActivity(true);
            setIsChat(false);
        }
        else if (location.pathname === "/endedChats") {
            setIsActivity(false);
            setIsChat(false);
        }
        else {
            setIsChat(true);
            setIsActivity(false);
        }
    }, [location]); // Dependency array to run the effect whenever location changes

    // Rendering navigation and nested routes 
    return (
        <>
            <Navigation isChat={isChat} isActivity={isActivity} />
            <Outlet />
        </>
    );
};


export default Layout;
