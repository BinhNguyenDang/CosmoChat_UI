import { Grid, Button, Link, Typography } from "@mui/material";
import React, {useState} from "react";
import AllStyles from "../../styles/home";
import Images from "../../constants/images";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import api from "../../api/sessions"; // Importing API utility for session management
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import chatHistoryStyles from "../../styles/chatHistory";

// Functional component Navigation taking props like isChat, isEndedChats, and isActivity.
/**
 * Navigation component for managing the navigation bar and associated actions.
 * @param {Object} props - Props object containing flags for different navigation states.
 * @param {boolean} props.isChat - Flag indicating if the current navigation is for a chat.
 * @param {boolean} props.isActivity - Flag indicating if the current navigation is for activity.
 * @returns {JSX.Element} JSX element representing the navigation bar component.
 */
const Navigation = ({ isChat, isActivity}) => {
    //State management using useState hook for anchor element, dialog open state, sessions, and current session. 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [sessions, setSessions] = useState([]);
    const [thisSession, setThisSession] = useState({});
    // The useParams hook is a React Router hook used for accessing parameters in the URL of a routed component. It allows components to retrieve dynamic segments of the URL and use them within the component logic. This hook returns an object containing key-value pairs of the URL parameters specified in the route definition. These parameters can be used to dynamically render content, fetch data, or perform other actions based on the current URL. Essentially, useParams enables components to respond to changes in the URL and adapt their behavior accordingly, making it a powerful tool for building dynamic and interactive web applications.
    const { id } = useParams(); // Retrieving the dynamic parameter 'id' from the URL.
    // State management for dialog open state 
    const [opn, setOpn] = useState(false);
    // Array of representing months for date formatting 
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    // Function to close dialog.
    /**
     * Function to close the dialog.
     * Toggles the dialog state.
     */
    const handleDialogClose = () => {
        setOpn((prev) => !prev) // Toggling the dialog state. 
    }; 
    // Function to modify session based on the action (End or Clear).
    /**
    * Function to modify the session based on the action (End or Clear).
    * @param {string} key - Action to perform on the session (End or Clear).
    */
    const modifySession = async (key) => {
        //Getting the current data
        const date = new Date();
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        //Formating date
        const formattedDate = months[month] + " " + day + ", " + year;
        let updatedSession = {};
        // Fetching session data from the API.
        const response = await api.get("/sessions");
        setSessions(response.data);
        // Filtering current session data based on id.
        let currentSession = {};
        id ? currentSession = response.data.filter((session) => session.id === id) : currentSession = {};
        // Updating session object based on action (End or Clear)
        id ? updatedSession = {
            id,
            date: formattedDate,
            chats: key === "Clear" ? [] : (response.data.filter((session) => session.id === id)[0].chats),
            isSessionEnded: key === "End" ? true : false 
        } : updatedSession = {};
        // Updating the session data on the server
        const res = await api.put(`/sessions/${id}`, updatedSession);
        // Reloading the page after session modification.
        window.location.reload();

        //Updating sessions state with modified session.
        setSessions(
            sessions.map((session) =>
                session.id === id? updatedSession : session
            )
        );

        setThisSession(res.data);
    };
    // Function to handle click event on menu.
    /**
     * Function to handle click event on the menu.
     * @param {Event} event - Click event object.
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle close event on menu.
    /**
    * Function to handle close event on the menu.
    */
    const handleClose = () => {
    setAnchorEl(null); // closing the menu
    setOpn(true); //Opening dialog to confirm ending the chat
    };

    // Returning the JSX element representing the navigation bar component.
    return (
        // Grid container for the navigation bar with styles from AllStyles.navigationBar.
        <Grid {...AllStyles.navigationBar}>
          {/* Conditional rendering based on the props isEndedChats and isActivity */}
          {isActivity ? (
            // If isActivity is true, render navigation for ended chats or activity.
            <Grid {...AllStyles.navigationLeft}>
              {/* Grid for the back arrow with margin */}
              <Grid style={{ margin: "5px" }}>
                {/* Link to navigate back to the homepage */}
                <Link href="/">
                  {/* Image for the back arrow */}
                  <img src={Images.BackArrow} alt="Back" />
                </Link>
              </Grid>
              {/* Conditional rendering of navigation name */}
              {/* // If isActivity is true, render "Activity" as the navigation name. */}
              <Grid {...AllStyles.navigationName}>Activity</Grid>
            </Grid>
          ) : isChat ? (
            // If isChat is true, render navigation for chat.
            <Grid {...AllStyles.navigationLeft}>
              {/* Grid for the back arrow with margin */}
              <Grid style={{ margin: "5px" }}>
                {/* Link to navigate back to the homepage */}
                <Link href="/">
                  {/* Image for the back arrow */}
                  <img src={Images.BackArrow} alt="Back" />
                </Link>
              </Grid>
              {/* Render "ReX" as the navigation name */}
              <Grid {...AllStyles.navigationName}>ReX Chat</Grid>
            </Grid>
          ) : (
            // If none of the above conditions match, render default navigation.
            <Grid {...AllStyles.navigationLeft}>
              {/* Grid for the NavRex logo */}
              <Grid>
                {/* Link to navigate back to the homepage */}
                <Link href="/">
                  {/* Image for the BackArrow logo */}
                  <img src={Images.BackArrow} alt="Back" />
                </Link>
              </Grid>
              {/* Render "ReX" as the navigation name */}
              <Grid {...AllStyles.navigationName}>ReX</Grid>
            </Grid>
          )}
          {/* Conditional rendering based on isChat */}
          {isChat ? (
            // If either isChat or isEndedChats is true, render options for chat navigation.
            <Grid {...AllStyles.navigationRight}>
              {/* Grid for the options menu */}
              <Grid>
                {/* Link to open options menu */}
                <Link onClick={handleClick}>
                  {/* Image for the options icon */}
                  <img src={Images.Options} alt="Options" />
                </Link>
                {/* Menu component for options */}
                <Menu
                  anchorEl={anchorEl} // Anchor element for the menu.
                  open={open} // Boolean indicating if the menu is open.
                  onClose={() => setAnchorEl(null)} // Event handler for menu close.
                  {...AllStyles.optionsMenu}
                >
                  {/* Divider */}
                  <Divider />
                  {/* MenuItem to end chat */}
                  <MenuItem
                    onClick={() => handleClose()}
                    variant="outlined"
                    {...AllStyles.optionsMenuItem}
                  >
                    {/* Image for ending chat */}
                    <img src={Images.End} alt="end" />
                    {/* Text for ending chat */}
                    <Typography>&nbsp; End Chat</Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            ) : ( !isActivity ? (
              // If isChat is false and isActivity is false, render navigation for activity.
              <Grid {...AllStyles.navigationRight}>
                {/* Grid for the activity icon */}
                <Grid>
                  {/* Link to navigate to the activity page */}
                  <Link href="/activity">
                    {/* Image for the activity icon */}
                    <img src={Images.ActivityIcon} alt="Activity" />
                  </Link>
                </Grid>
              </Grid>
              // else rendering nothing.
              ) : null 
            )
          }
          {/* Dialog component for confirming end chat action */}
          <Dialog
            open={opn} // Open state for dialog
            onClose={handleDialogClose} // Event handler for closing dialog
            {...chatHistoryStyles.popUp}
          >
            {/* Dialog title */}
            <DialogTitle>
              {/* Image for the HomeRex logo */}
              <img src={Images.HomeRex} alt="homeRex" style={{width: "20%"}} />
            </DialogTitle>
            {/* Dialog content */}
            <DialogContent>
              {/* Dialog content text for end chat confirmation */}
              <DialogContentText {...chatHistoryStyles.popUpTextTitle}>
                End Chat?
              </DialogContentText>
              {/* Dialog content text for end chat confirmation */}
              <DialogContentText>
                Are you sure, you want to end this chat?
              </DialogContentText>
            </DialogContent>
            {/* Dialog actions */}
            <DialogActions>
              {/* Grid container for dialog buttons */}
              <Grid container {...chatHistoryStyles.popUpButtons}>
                {/* Grid item for 'Yes, End' button */}
                <Grid item>
                  {/* Button to confirm ending chat */}
                  <Button
                    onClick={() => modifySession("End")} // Event handler for ending chat
                    {...chatHistoryStyles.buttonDelete}
                  >
                    Yes, End
                  </Button>
                </Grid>
                {/* Grid item for 'Cancel' button */}
                <Grid item>
                  {/* Button to cancel ending chat */}
                  <Button onClick={handleDialogClose} {...chatHistoryStyles.buttonCancel}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </Grid>
      );
    }
    
    export default Navigation; // Exporting the Navigation component.
    