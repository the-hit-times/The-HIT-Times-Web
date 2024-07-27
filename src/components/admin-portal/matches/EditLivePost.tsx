"use client";

import React, { useState, useEffect, useRef } from "react";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { useRouter } from "next/navigation";
import { MatchPosts } from "@/models/Match";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

interface EditLivePostFormProps {
  matchId: string;
}

const EditLivePostForm: React.FC<EditLivePostFormProps> = ({ matchId }) => {
  const router = useRouter();
  const [matchData, setMatchData] = useState<MatchPosts|null>(null);
  const [showPenalty, setShowPenalty] = useState<boolean>(false);
  const [notificationResponse, setNotificationResponse] = useState<string>("");
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMatchData = async () => {
    const response = await fetch(`/api/v1/live/match/${matchId}`);
    const data = await response.json();
    setMatchData(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMatchData();
  }, []);

  return <div> {JSON.stringify(matchData)}</div>;
};

export default EditLivePostForm;
