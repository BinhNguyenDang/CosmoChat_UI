import React, {useState, useEffect} from "react";
import { Grid, Typography } from "@mui/material";
import ChatHistory from "../../components/ChatHistory";
import api from "../../api/sessions"
import useMediaQuery from "@mui/material";
import WidthError from "../../components/WidthError";
import AllStyles from "../../styles/home";

/**
 * Functional component representing the list of ended chat sessions.
 * @returns {JSX.Element} JSX element representing the EndedChats component
 */

const EndedChats = () => {
    //State to manage the list of sessions
    const [sessions, setSessions] = useState([]);
    
    //useMediaQuery to check if the screen width is at least 600px
    // const matches = useMediaQuery("(min-width:600px");

    //useEffect hook to fetch sessions on component mount 
    useEffect(() => {
        //Async function to fetch sessions 
        const fetchSessions = async () => {
            try {
                // Fetching ended sessions from the API
                const response = await api.get("/sessions");
                // If response data exists, update sessions state 
                if (response && response.data) {
                    setSessions(response.data);
                }
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else {
                console.log("Error fetching sessions:", err);
                }
            }
        };
        fetchSessions();
    },[]);

    // Function to handle deletion of a session
  /**
   * Function to handle deletion of a session. 
   * This function sends a delete request to the server to delete the session with the specified ID.
   * It then updates the sessions state to remove the deleted session.
   * @param {string} id The ID of the session to be deleted.
   */

  const handleDelete = async (id) => {
    try {
        // Convert id to string
        const ID = id.toString();
        //Send a delete request to the server
        await api.delete(`/sessions/${ID}`);
        // Update the sessions state to remove the deleted session
        setSessions(sessions.filter((session) => session.id !== ID));
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
  };

  // Returning the JSX for the EndedChats component
  return (
    // If the screen size is more than 600px then displaying the message to set the width to 600px else displaying the content.
    // matches? (
    //   <WidthError />
    // ) : (
      // Grid container for the main layout
      <Grid container>
        <Grid {...AllStyles.ChatsTitle}>
          <Typography {...AllStyles.ChatsTitleText}>
            Ended Chats
          </Typography>
        </Grid>
        <Grid container>
          {/* Mapping over sessions to display ended chats */}
          {sessions.map((session) =>
            session.isSessionEnded ? (
              <ChatHistory
                key={session.id}
                id={session.id}
                date={session.date}
                lastChatText={
                  session?.chats?.length > 0
                          ? session?.chats[session.chats.length - 1].ReX.slice(0,100)
                          : ""
                }
                sessionEnded={session.isSessionEnded}
                handleDelete={() => handleDelete(session.id)}
                isActivity={false}
                chatsLength={session.chats.length}
              />
            ) : null
          )}
        </Grid>
      </Grid>
    )
//   );
};

export default EndedChats;