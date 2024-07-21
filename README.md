# CosmoChat UI

![image](https://github.com/user-attachments/assets/fcff13be-32f2-49cb-aae1-f19f2326170a)
![image](https://github.com/user-attachments/assets/1bd99b13-cf90-42e7-b979-0696e6d614f3)



## Overview:
CosmoChat UI is the frontend application that enables users to engage in chat sessions with an AI chatbot powered by OpenAI's language model. The primary objective is to offer a seamless platform for users to interact with the chatbot, ask questions, and receive responses naturally. It incorporates features such as activity tracking, session ending, and session management.

## Technologies and Tools used:
* React.js
* Material UI
* Axios
* OpenAI

## Available Scripts

In the project directory, we can run:

1. `npm start`:\
Runs the react app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in our browser.\
The page will reload when we make changes.

1. `node ./server.js`:\
Runs the server.js file which start server that will store the chats sessions in `data/db.json` file in json format.
Server will be running on port 3500.

## Project Setup Instructions:
To set up CosmoChatUI, follow these steps:

1. **Clone the repository to your local machine**.
    - To clone run: 
      ```
      git clone https://github.com/BinhNguyenDang/CosmoChat_UI.git
      ```

2. **Ensure you have Node.js and npm installed:**
    - Download and install [Node.js](https://nodejs.org/en) if you haven't already.

3. **Navigate to the root directory of the project**: 
    - To navigate to the root directory of the project, run: 
      ```
      cd CosmoChatUI
      ```

4. **Install Dependencies**:
    - To install required dependencies, run: 
      ```
      npm install
      ```

5. **Add your OpenAI API key**:
    - Get your OpenAI API key from [OpenAI](https://platform.openai.com/api-keys)
    - Create a .env file in the root directory of the project.
    - Add the following line to the .env file, replacing {YOUR_API_KEY} with your actual API key:
        ```
        REACT_APP_OPENAI_API_KEY={YOUR_API_KEY}
        ```

6. **Run Server**:
   - To run the server that store that chats session inside the `data/db.json` file in json format. Run:
      ```
      node ./server.js
      ```

7. **Start React Application**:
    - To start react application. Run:
      ```
      npm start
      ```
