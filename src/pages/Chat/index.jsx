import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import Images from "../../constants/images"
import ChatStyles from "../../styles/chat";
import ReXMessage from "../../components/ReXMessage";
import api from "../../api/sessions";
import OpenAI from "openai";
import { useParams } from "react-router-dom";

