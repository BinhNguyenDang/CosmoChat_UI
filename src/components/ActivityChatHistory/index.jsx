import Images from "../../constants/images";
import ChatHistoryStyles from "../../styles/chatHistory";
import { Grid } from "@mui/material";

/**
 * Component for rendering activity chat history entries.
 * @param {Object} props - Props object containing chat history data.
 * @param {string} props.date - Date of the chat session.
 * @param {number} props.chatsLength - Number of messages exchanged in the chat session.
 * @returns {JSX.Element} JSX element representing the chat history entry.
 */

const ActivityChatHistory = function({chatsLength, date}) {
    // Rendering for activity entry 
    return (
        <>
        <Grid {...ChatHistoryStyles.activityChat}> {/* Applying styles from chatHistoryStyles.activityChat */}
            <Grid>
                <img src={Images.Clock} alt="Clock" style={{ width: "48px"}} />
            </Grid>
            <Grid {...ChatHistoryStyles.bodyText}>
                <Grid {...ChatHistoryStyles.title}>ReX - {date}</Grid>
                <Grid {...ChatHistoryStyles.text}>
                    {/* Displaying message count */}
                    {chatsLength > 1
                        ? `${chatsLength} Messages` /* Plural form if message count > 1 */
                        : `${chatsLength} Message`} {/* Singular form if message count = 1 */}
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

export default ActivityChatHistory; // Exporting the ActivityChatHistory component.