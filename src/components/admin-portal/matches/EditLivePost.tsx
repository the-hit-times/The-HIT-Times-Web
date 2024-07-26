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
  const [matchData, setMatchData] = useState<MatchPosts | null>(null);
  const [showPenalty, setShowPenalty] = useState<boolean>(false);
  const [notificationResponse, setNotificationResponse] = useState<string>("");
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    // Fetch match data on component mount
    fetch(`/api/v1/live/match/${matchId}`)
      .then((res) => res.json())
      .then((result) => setMatchData(result.data));
  }, [matchId]);

  useEffect(() => {
    if (matchData) {
      setShowPenalty(
        (matchData.team1.team_penalty !== "0" ||
          matchData.team2.team_penalty !== "0") &&
          matchData.team1.team_score === matchData.team2.team_score
      );
    }
  }, [matchData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setMatchData((prev) => {
      if (!prev) return prev;
      const updatedData = { ...prev };
      switch (id) {
        case "team1_code":
        case "team1_score":
        case "team1_penalty":
          updatedData.team1 = {
            ...updatedData.team1,
            [id.split("_")[1]]: value,
          };
          break;
        case "team2_code":
        case "team2_score":
        case "team2_penalty":
          updatedData.team2 = {
            ...updatedData.team2,
            [id.split("_")[1]]: value,
          };
          break;
        case "mdatetime":
          updatedData.match_date = new Date(value);
          break;
        case "matchStatus":
          updatedData.match_status = value;
          break;
        case "match_type":
          updatedData.match_type = value;
          setShowPenalty(value !== "cricket");
          break;
        case "match_live":
          updatedData.is_live = value === "true";
          break;
        default:
          break;
      }
      return updatedData;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPenalty(e.target.checked);
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationResponse(e.target.checked ? "enabled" : "disabled");
  };

  const updateData = async (timelineMessage: string | null) => {
    if (!matchData) return;

    const sendNotification = notificationResponse === "enabled";

    const res = await fetch(`/api/live/match/${matchId}`, {
      method: "PUT",
      body: JSON.stringify(matchData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (res.ok) {
      const result = await res.json();
      if (result.msg === "success") {
        if (!sendNotification) {
          router.refresh();
          return;
        }

        const notifyRes = await fetch("/api/live/notification/send", {
          method: "POST",
          body: JSON.stringify({
            ...matchData,
            id: matchId,
            timeline_message: timelineMessage,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        if (notifyRes.ok) {
          router.refresh();
        }
      }
    }
  };

  const createTimeline = () => {
    const msgHtml = editorRef.current?.getContent();
    const msgBody = editorRef.current?.getContent({ format: "text" });
    const timelineDate = (
      document.getElementById("timeline_date") as HTMLInputElement
    ).value;

    if (msgBody?.trim().length === 0) {
      alert("Timeline message cannot be empty");
      editorRef.current?.setContent("");
      return;
    }

    const data = {
      msgHtml,
      timeline_date: new Date(timelineDate),
    };

    fetch(`/api/live/match/${matchId}/timeline`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        if (result.msg === "success") {
          await updateData(msgBody);
          router.refresh();
        }
      });
  };

  const deleteTimeline = (msgId: string) => {
    fetch(`/api/live/match/${matchId}/timeline/${msgId}/del`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.msg === "success") {
          router.refresh();
        }
      });
  };

  if (!matchData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {notificationResponse === "success" && (
          <div className="bg-green-500 text-white p-2 rounded mb-4">
            Successfully notified updated live match
          </div>
        )}
        {notificationResponse === "failed" && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            Error while notifying updated live match
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-4 rounded-lg shadow-lg">
        <h3 className="text-white text-xl font-bold mb-4">UPDATE LIVE POST</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateData(null);
          }}
          className="space-y-4"
        >
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sendNotification"
              defaultChecked
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="sendNotification" className="text-white">
              Notify users
            </label>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="team1_code" className="text-white block mb-2">
                Team 1
              </label>
              <select
                id="team1_code"
                name="team1_code"
                className="form-select mb-2"
                value={matchData.team1.team_code}
                onChange={handleChange}
              >
                {getAllTeamsCode().map((code) => (
                  <option key={code} value={code}>
                    {codeToTeamName[code]}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="team1_score"
                name="team1_score"
                className="form-input mb-2"
                placeholder="Score"
                required
                value={matchData.team1.team_score}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="team2_code" className="text-white block mb-2">
                Team 2
              </label>
              <select
                id="team2_code"
                name="team2_code"
                className="form-select mb-2"
                value={matchData.team2.team_code}
                onChange={handleChange}
              >
                {getAllTeamsCode().map((code) => (
                  <option key={code} value={code}>
                    {codeToTeamName[code]}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="team2_score"
                name="team2_score"
                className="form-input mb-2"
                placeholder="Score"
                required
                value={matchData.team2.team_score}
                onChange={handleChange}
              />
            </div>
          </div>

          <input
            type="datetime-local"
            id="mdatetime"
            className="form-input mb-2"
            required
            value={new Date(matchData.match_date).toISOString().slice(0, 16)}
            onChange={handleChange}
          />

          <select
            id="matchStatus"
            className="form-select mb-2"
            value={matchData.match_status}
            onChange={handleChange}
          >
            <option value="NOT_STARTED">Not started</option>
            <option value="FIRST_HALF">First half</option>
            <option value="HALF_TIME">Half time</option>
            <option value="SECOND_HALF">Second half</option>
            <option value="FULL_TIME">Full time</option>
          </select>

          <select
            id="match_type"
            className="form-select mb-2"
            value={matchData.match_type}
            onChange={handleChange}
          >
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
          </select>

          {showPenalty && (
            <>
              <label htmlFor="penalty" className="text-white block mb-2">
                Show Penalty
              </label>
              <input
                type="checkbox"
                id="penalty"
                checked={showPenalty}
                onChange={handleCheckboxChange}
              />
            </>
          )}

          {showPenalty && (
            <div className="flex gap-4">
              <input
                type="text"
                id="team1_penalty"
                name="team1_penalty"
                className="form-input mb-2"
                placeholder="Penalty"
                required
                value={matchData.team1.team_penalty}
                onChange={handleChange}
              />
              <input
                type="text"
                id="team2_penalty"
                name="team2_penalty"
                className="form-input mb-2"
                placeholder="Penalty"
                required
                value={matchData.team2.team_penalty}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="mytextarea" className="text-white block mb-2">
              Timeline Message
            </label>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              id="mytextarea"
              apiKey="w6q7m6bspz8sqsc3xf8ogte5se9rmnjz0x84aruqxnvb5jek"
              initialValue=""
              init={{
                height: 300,
                plugins: "link",
                default_link_target: "_blank",
              }}
    
            />
          </div>

          <button
            type="button"
            onClick={createTimeline}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Timeline
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
          >
            Save Match Data
          </button>
        </form>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Timeline</h3>
        <ul className="space-y-2">
          {matchData.timeline.map((timeline) => (
            <li
              key={timeline.firebase_timeline_id}
              className="p-2 border-b border-gray-200 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800">{parse(timeline.msgHtml)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(timeline.timeline_date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteTimeline(timeline.firebase_timeline_id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditLivePostForm;
