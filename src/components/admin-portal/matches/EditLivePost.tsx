"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { MatchPosts } from "@/models/Match";
import parse from "html-react-parser";
import { TrashIcon } from "@heroicons/react/24/solid";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
// import ReactQuill from "react-quill";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const quillRef= useRef<ReactQuill |null>(null);

interface EditLivePostFormProps {
  match: MatchPosts;
}

const EditLivePostForm: React.FC<EditLivePostFormProps> = ({ match }) => {
  const [matchData, setMatchData] = useState<MatchPosts>(match);
  const [showPenalty, setShowPenalty] = useState<boolean>(false);
  const [sendNotification, setSendNotification] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [timelineContent, setTimelineContent] = useState<string>("");

  const team1ScoreRef = useRef<HTMLInputElement>(null);
  const team2ScoreRef = useRef<HTMLInputElement>(null);
  const matchStatusRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ error: false, success: false, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Initialize Quill content
  useEffect(() => {
    setTimelineContent("");
  }, []);

  const handleTeamChange = useCallback(
    (setTeamCode: (code: string) => void, otherTeamCode: string) =>
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value !== otherTeamCode) {
          setTeamCode(value);
        }
      },
    []
  );

  const renderTeamSelect = (
    teamCode: string,
    setTeamCode: (code: string) => void,
    otherTeamCode: string
  ) => (
    <select
      className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      value={teamCode}
      onChange={handleTeamChange(setTeamCode, otherTeamCode)}
    >
      {getAllTeamsCode().map((code: string) => (
        <option key={code} value={code} disabled={code === otherTeamCode}>
          {codeToTeamName[code]}
        </option>
      ))}
    </select>
  );

  const renderTeamInput = (
    teamNo: number,
    teamCode: string,
    setTeamCode: (code: string) => void,
    teamScore: string,
    setTeamScore: (score: string) => void,
    otherTeamCode: string
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        {"Team " + teamNo}
      </label>
      {renderTeamSelect(teamCode, setTeamCode, otherTeamCode)}
      <input
        ref={teamNo === 1 ? team1ScoreRef : team2ScoreRef}
        className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
        required
        placeholder="Score"
        value={teamScore || ""}
        onChange={(e) => setTeamScore(e.target.value)}
      />
    </div>
  );

  const setTeam1Code = useCallback((teamCode: string) => {
    setMatchData(prev => ({
      ...prev,
      team1: { ...prev.team1, team_code: teamCode },
    }));
  }, []);

  const setTeam2Code = useCallback((teamCode: string) => {
    setMatchData(prev => ({
      ...prev,
      team2: { ...prev.team2, team_code: teamCode },
    }));
  }, []);

  const setTeam1Score = useCallback((teamScore: string) => {
    setMatchData(prev => ({
      ...prev,
      team1: { ...prev.team1, team_score: teamScore },
    }));
  }, []);

  const setTeam2Score = useCallback((teamScore: string) => {
    setMatchData(prev => ({
      ...prev,
      team2: { ...prev.team2, team_score: teamScore },
    }));
  }, []);

  useEffect(() => {
    if (showPenalty) return;
    const isPenalty =
      matchData.team1.team_penalty != null &&
      matchData.team2.team_penalty != null &&
      (matchData.team1.team_penalty.trim() !== "0" ||
        matchData.team2.team_penalty.trim() !== "0") &&
      matchData.team1.team_score === matchData.team2.team_score;
    setShowPenalty(isPenalty);
  }, [matchData, showPenalty]);

  const PenaltyComponents = () => (
    <div className="mb-4">
      <input
        type="checkbox"
        checked={showPenalty}
        onChange={() => setShowPenalty(!showPenalty)}
        className="mr-2"
      />
      <label className="mb-2">Show Penalty</label>
      {showPenalty && (
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <div className="mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
              {codeToTeamName[matchData.team1.team_code]}
            </label>
            <input
              className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              placeholder="Penalty"
              value={matchData.team1.team_penalty || ""}
              onChange={(e) =>
                setMatchData(prev => ({
                  ...prev,
                  team1: { ...prev.team1, team_penalty: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
              {codeToTeamName[matchData.team2.team_code]}
            </label>
            <input
              className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              placeholder="Penalty"
              value={matchData.team2.team_penalty || ""}
              onChange={(e) =>
                setMatchData(prev => ({
                  ...prev,
                  team2: { ...prev.team2, team_penalty: e.target.value },
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );

  const MatchTypeInputField = () => {
    const setMatchType = useCallback((matchType: string) => {
      setMatchData((prev) => ({ ...prev, match_type: matchType }));
    }, []);

    return (
      <div>
        <label
          htmlFor="matchType"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          Match Type
        </label>
        <select
          id="matchType"
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={matchData.match_type || "football"}
          onChange={(e) => setMatchType(e.target.value)}
        >
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
        </select>
      </div>
    );
  };

  const MatchStatusInputField = () => {
    const setMatchStatus = useCallback((matchStatus: string) => {
      setMatchData(prev => ({ ...prev, match_status: matchStatus }));
    }, []);

    return (
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Match Status
        </label>
        <input
          ref={matchStatusRef}
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={matchData.match_status || ""}
          onChange={(e) => setMatchStatus(e.target.value)}
        />
      </div>
    );
  };

  const MatchDateField = (match_date: Date) => {
    const datetimeLocal = (datetime: Date) => {
      const dt = new Date(datetime);
      const offset = dt.getTimezoneOffset();
      dt.setMinutes(dt.getMinutes() - offset);
      return dt.toISOString().slice(0, 16);
    };
    const date = datetimeLocal(match_date);

    const setMatchDate = useCallback((date: string) => {
      setMatchData(prev => ({ ...prev, match_date: new Date(date) }));
    }, []);

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Match Date
        </label>
        <input
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="datetime-local"
          value={date}
          onChange={(e) => setMatchDate(e.target.value)}
        />
      </div>
    );
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/v1/live/match/${matchData.firebase_match_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchData),
        }
      );

      if (response.ok) {
        setStatusMessage({
          error: false,
          success: true,
          message: "Match updated successfully",
        });

        if (sendNotification) {
          await sendLiveNotification("", matchData, matchData.firebase_match_id);
        }
      } else {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error updating match: " + response.statusText,
        });
      }
    } catch (error: any) {
      setStatusMessage({
        error: true,
        success: false,
        message: "Error updating match: " + error.message,
      });
    }
  };

  const IsMatchLiveField = () => {
    const handleIsLiveChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMatchData(prev => ({ ...prev, is_live: e.target.value === "yes" }));
      },
      []
    );

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Is Live
        </label>
        <select
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={matchData.is_live ? "yes" : "no"}
          onChange={handleIsLiveChange}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  };

  const MatchDetailsForm = () => (
    <form className="grid grid-flow-row gap-2 my-2" onSubmit={handleOnSubmit}>
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        <div>
          {renderTeamInput(
            1,
            matchData.team1.team_code,
            setTeam1Code,
            matchData.team1.team_score,
            setTeam1Score,
            matchData.team2.team_code
          )}
        </div>
        <div>
          {renderTeamInput(
            2,
            matchData.team2.team_code,
            setTeam2Code,
            matchData.team2.team_score,
            setTeam2Score,
            matchData.team1.team_code
          )}
        </div>
      </div>
      {matchData.match_type === "football" && <PenaltyComponents />}
      <IsMatchLiveField />
      <MatchTypeInputField />
      <MatchStatusInputField />
      {MatchDateField(matchData.match_date)}
      <div className="flex flex-row justify-between gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sendNotification}
            onChange={() => setSendNotification(!sendNotification)}
          />
          <span>Send Notification</span>
        </label>
        <button
          className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );

  const TimelineHistory = () => {
    const handleDeleteTimeline = async (firebase_timeline_id: string) => {
      const res = await fetch(
        `/api/v1/live/match/${matchData.firebase_match_id}/timeline/${firebase_timeline_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const newTimeline = matchData.timeline.filter(
          (timeline) => timeline.firebase_timeline_id !== firebase_timeline_id
        );
        setMatchData(prev => ({ ...prev, timeline: newTimeline }));
      } else {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error deleting timeline: " + res.statusText,
        });
      }
    };

    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Timeline History</h2>
        <div className="grid grid-flow-row gap-4 my-2">
          {matchData.timeline
            .sort(
              (a, b) =>
                new Date(b.timeline_date).getTime() -
                new Date(a.timeline_date).getTime()
            )
            .map((timeline) => (
              <div
                key={timeline.firebase_timeline_id}
                className="bg-white p-2 rounded-md flex flex-col gap-2"
              >
                <div className="flex flex-row justify-between">
                  <p className="text-xs font-light text-gray-800">
                    {new Date(timeline.timeline_date).toLocaleString()}
                  </p>
                  <button
                    onClick={() =>
                      handleDeleteTimeline(timeline.firebase_timeline_id)
                    }
                    className="hover:bg-red-50 p-1 rounded-sm"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="prose prose-a:text-blue-500 prose-a:underline">
                  {parse(timeline.msgHtml)}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const AddTimeline = () => {
    const handleAddTimeline = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const timeline_date = formData.get("timeline_date") as string;
      const content = timelineContent.trim();

      if (!content || content === "<p><br></p>") {
        setStatusMessage({
          error: true,
          success: false,
          message: "Content cannot be empty",
        });
        return;
      }

      const timeline = {
        timeline_date: timeline_date ? new Date(timeline_date) : new Date(),
        msgHtml: content,
      };

      try {
        const res = await fetch(
          `/api/v1/live/match/${matchData.firebase_match_id}/timeline`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(timeline),
          }
        );

        if (res.ok) {
          const newTimeline = await res.json();
          setMatchData(prev => ({
            ...prev,
            timeline: [...prev.timeline, newTimeline.data],
          }));
          setTimelineContent(""); // Reset Quill content
          setStatusMessage({
            error: false,
            success: true,
            message: "Timeline added successfully",
          });
          if (sendNotification) {
            const contentText = new DOMParser()
              .parseFromString(content, "text/html")
              .body.textContent || "";
            await sendLiveNotification(
              contentText,
              matchData,
              matchData.firebase_match_id,
              true
            );
          }
        } else {
          setStatusMessage({
            error: true,
            success: false,
            message: "Error adding timeline",
          });
        }
      } catch (error: any) {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error adding timeline: " + error.message,
        });
      }
    };

    const handleQuillChange = useCallback((content: string) => {
      setTimelineContent(content);
    }, []);

    return (
      <form onSubmit={handleAddTimeline} className="grid grid-flow-row gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Add Timeline</h2>
        <div className="grid grid-flow-row gap-2">
          <input
            name="timeline_date"
            type="datetime-local"
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <div className="quill-container">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={timelineContent}
              onChange={handleQuillChange}
              preserveWhitespace={true}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "link",
              ]}
            />
          </div>
          <div className="flex flex-row justify-end gap-4">
            <button
              className="rounded-full bg-blue-600 px-3 mt-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit"
            >
              Add Timeline
            </button>
          </div>
        </div>
      </form>
    );
  };

  const sendLiveNotification = useCallback(
    async (
      timelineMessage: string,
      data: MatchPosts,
      firebaseMatchId: string,
      isTimeline: boolean = false
    ) => {
      const scoreLine = `${data.team1.team_name} ${data.team1.team_score} - ${data.team2.team_score} ${data.team2.team_name}`;
      let notificationBody: string;

      if (isTimeline) {
        notificationBody = timelineMessage;
      } else {
        notificationBody = `${scoreLine}\n${data.match_status}`;
      }

      try {
        const notifyRes = await fetch("/api/v1/live/notification/send", {
          method: "POST",
          body: JSON.stringify({
            team1: {
              team_name: data.team1.team_name,
              team_score: data.team1.team_score,
            },
            team2: {
              team_name: data.team2.team_name,
              team_score: data.team2.team_score,
            },
            match_status: notificationBody,
            postId: firebaseMatchId,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        if (notifyRes.ok) {
          setStatusMessage({
            error: false,
            success: true,
            message: "Notification sent successfully",
          });
        } else {
          setStatusMessage({
            error: true,
            success: false,
            message: "Error sending notification",
          });
        }
      } catch (error: any) {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error sending notification: " + error.message,
        });
      }
    },
    []
  );

  const MessageBox = () => (
    <div
      className={`${
        statusMessage.error ? "bg-red-200" : "bg-green-200"
      } p-2 rounded-md ${
        statusMessage.error ? "text-red-600" : "text-green-600"
      }`}
    >
      <p>{statusMessage.message}</p>
    </div>
  );

  return (
    <div className="grid grid-flow-row gap-4">
      {statusMessage.message && <MessageBox />}
      <MatchDetailsForm />
      <AddTimeline />
      <TimelineHistory />
    </div>
  );
};

export default EditLivePostForm;