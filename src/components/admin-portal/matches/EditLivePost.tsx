"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { useRouter } from "next/navigation";
import { MatchPosts } from "@/models/Match";
import parse from "html-react-parser";
import { TrashIcon } from "@heroicons/react/24/solid";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

  const handleTeamChange =
    (setTeamCode: (code: string) => void, otherTeamCode: string) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === otherTeamCode) {
        setTeamCode("");
      } else {
        setTeamCode(value);
      }
    };

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
        className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
        required
        placeholder="Score"
        value={teamScore}
        onChange={(e) => setTeamScore(e.target.value)}
      />
    </div>
  );

  const setTeam1Code = (teamCode: string) => {
    setMatchData({
      ...matchData,
      team1: {
        ...matchData.team1,
        team_code: teamCode,
      },
    });
  };

  const setTeam2Code = (teamCode: string) => {
    setMatchData({
      ...matchData,
      team2: {
        ...matchData.team2,
        team_code: teamCode,
      },
    });
  };

  const setTeam1Score = (teamScore: string) => {
    setMatchData({
      ...matchData,
      team1: {
        ...matchData.team1,
        team_score: teamScore,
      },
    });
  };

  const setTeam2Score = (teamScore: string) => {
    setMatchData({
      ...matchData,
      team2: {
        ...matchData.team2,
        team_score: teamScore,
      },
    });
  };

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
              value={matchData.team1.team_penalty}
              onChange={(e) =>
                setMatchData({
                  ...matchData,
                  team1: {
                    ...matchData.team1,
                    team_penalty: e.target.value,
                  },
                })
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
              value={matchData.team2.team_penalty}
              onChange={(e) =>
                setMatchData({
                  ...matchData,
                  team2: {
                    ...matchData.team2,
                    team_penalty: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );

  const MatchTypeInputField = () => {
    const setMatchType = (matchType: string) => {
      setMatchData({
        ...matchData,
        match_type: matchType,
      });
    };

    return (
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Match Type
        </label>
        <select
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={matchData.match_type}
          onChange={(e) => setMatchType(e.target.value)}
        >
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
        </select>
      </div>
    );
  };

  const MatchStatusInputField = () => {
    const setMatchStatus = (matchStatus: string) => {
      setMatchData({
        ...matchData,
        match_status: matchStatus,
      });
    };

    return (
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          Match Status
        </label>
        <input
          className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={matchData.match_status}
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

    const setMatchDate = (date: string) => {
      setMatchData({
        ...matchData,
        match_date: new Date(date),
      });
    };

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
        const responseData = await response.json();

        setStatusMessage({
          error: false,
          success: true,
          message: "Match updated successfully",
        });

        if (sendNotification) {
          sendLiveNotification("", matchData, matchData.firebase_match_id);
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
    const handleIsLiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMatchData({
        ...matchData,
        is_live: e.target.value === "yes",
      });
    };

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
          <option value={"yes"}>Yes</option>
          <option value={"no"}>No</option>
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
        setMatchData({
          ...matchData,
          timeline: newTimeline,
        });
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

      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const timeline_date = formData.get("timeline_date") as string;
      const content = timelineContent;

      if (!content || content.trim() === "") {
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
        setMatchData({
          ...matchData,
          timeline: [...matchData.timeline, newTimeline.data],
        });
        setTimelineContent("");
        setStatusMessage({
          error: false,
          success: true,
          message: "Timeline added successfully",
        });
        if (sendNotification) {
          const contentText = new DOMParser()
            .parseFromString(content, "text/html")
            .body.textContent || "";
          sendLiveNotification(
            contentText,
            matchData,
            matchData.firebase_match_id
          );
        }
      } else {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error adding timeline",
        });
      }
    };

    return (
      <form onSubmit={handleAddTimeline} className="grid grid-flow-row gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Add Timeline</h2>
        <div className="grid grid-flow-row gap-2">
          <input
            name="timeline_date"
            type="datetime-local"
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <ReactQuill
            theme="snow"
            value={timelineContent}
            onChange={setTimelineContent}
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
          <div className="flex flex-row justify-end gap-4">
            <button
              className="rounded-full bg-blue-600 px-3 mt-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit"
            >
              Add Timeline
            </button>
          </div>
        </div>
      </form>
    );
  };

  const sendLiveNotification = async (
    timelineMessage: string,
    data: MatchPosts,
    firebaseMatchId: string
  ) => {
    const notifyRes = await fetch("/api/v1/live/notification/send", {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify({
        ...data,
        id: firebaseMatchId,
        timeline_message: timelineMessage,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
  };

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





// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
// import { useRouter } from "next/navigation";
// import { MatchPosts } from "@/models/Match";
// import { Editor } from "@tinymce/tinymce-react";
// import { Editor as TinyMCEEditor } from "tinymce";
// import parse from "html-react-parser";
// import { TrashIcon } from "@heroicons/react/24/solid";

// interface EditLivePostFormProps {
//   match: MatchPosts;
// }

// const EditLivePostForm: React.FC<EditLivePostFormProps> = ({ match }) => {
//   const [matchData, setMatchData] = useState<MatchPosts>(match);
//   const [showPenalty, setShowPenalty] = useState<boolean>(false);
//   const [sendNotification, setSendNotification] = useState<boolean>(true);
//   const [statusMessage, setStatusMessage] = useState({
//     error: false,
//     success: false,
//     message: "",
//   });
//   const editorRef = useRef<TinyMCEEditor | null>(null);

//   const handleTeamChange =
//     (setTeamCode: any, otherTeamCode: string) => (e: any) => {
//       setTeamCode(e.target.value);
//       if (e.target.value === otherTeamCode) {
//         setTeamCode("");
//       }
//     };

//   const renderTeamSelect = (
//     teamCode: string,
//     setTeamCode: any,
//     otherTeamCode: string
//   ) => (
//     <select
//       className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={teamCode}
//       onChange={handleTeamChange(setTeamCode, otherTeamCode)}
//     >
//       {getAllTeamsCode().map((code: string) => (
//         <option key={code} value={code} disabled={code === otherTeamCode}>
//           {codeToTeamName[code]}
//         </option>
//       ))}
//     </select>
//   );

//   const renderTeamInput = (
//     teamNo: number,
//     teamCode: string,
//     setTeamCode: any,
//     teamScore: string,
//     setTeamScore: any,
//     otherTeamCode: string
//   ) => (
//     <div className="mb-4">
//       <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
//         {"Team " + teamNo}
//       </label>
//       {renderTeamSelect(teamCode, setTeamCode, otherTeamCode)}
//       <input
//         className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
//         required
//         placeholder="Score"
//         value={teamScore}
//         onChange={(e) => setTeamScore(e.target.value)}
//       />
//     </div>
//   );

//   const setTeam1Code = (teamCode: string) => {
//     setMatchData({
//       ...matchData,
//       team1: {
//         ...matchData.team1,
//         team_code: teamCode,
//       },
//     });
//   };

//   const setTeam2Code = (teamCode: string) => {
//     setMatchData({
//       ...matchData,
//       team2: {
//         ...matchData.team2,
//         team_code: teamCode,
//       },
//     });
//   };

//   const setTeam1Score = (teamScore: string) => {
//     setMatchData({
//       ...matchData,
//       team1: {
//         ...matchData.team1,
//         team_score: teamScore,
//       },
//     });
//   };

//   const setTeam2Score = (teamScore: string) => {
//     setMatchData({
//       ...matchData,
//       team2: {
//         ...matchData.team2,
//         team_score: teamScore,
//       },
//     });
//   };

//   useEffect(() => {
//     if (showPenalty) return;
//     const isPenalty =
//       matchData.team1.team_penalty != null &&
//       matchData.team1.team_penalty != null &&
//       (matchData.team1.team_penalty.trim() != "0" ||
//         matchData.team2.team_penalty.trim() != "0") &&
//       matchData.team1.team_score == matchData.team2.team_score;
//     setShowPenalty(isPenalty);
//   }, [matchData]);

//   const PenlityComponents = () => (
//     <div className="mb-4">
//       <input
//         type="checkbox"
//         checked={showPenalty}
//         onChange={() => setShowPenalty(!showPenalty)}
//         className="mr-2"
//       />
//       <label className="mb-2">Show Penalty</label>
//       {showPenalty && (
//         <div className="grid grid-flow-row grid-cols-2 gap-4">
//           <div className="mb-2">
//             <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
//               {codeToTeamName[matchData.team1.team_code]}
//             </label>
//             <input
//               className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               required
//               placeholder="Penalty"
//               value={matchData.team1.team_penalty}
//               onChange={(e) =>
//                 setMatchData({
//                   ...matchData,
//                   team1: {
//                     ...matchData.team1,
//                     team_penalty: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
//               {codeToTeamName[matchData.team2.team_code]}
//             </label>
//             <input
//               className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               required
//               placeholder="Penalty"
//               value={matchData.team2.team_penalty}
//               onChange={(e) =>
//                 setMatchData({
//                   ...matchData,
//                   team2: {
//                     ...matchData.team2,
//                     team_penalty: e.target.value,
//                   },
//                 })
//               }
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const MatchTypeInputField = () => {
//     const setMatchType = (matchType: string) => {
//       setMatchData({
//         ...matchData,
//         match_type: matchType,
//       });
//     };

//     return (
//       <div className="">
//         <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
//           Match Type
//         </label>
//         <select
//           className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={matchData.match_type}
//           onChange={(e) => setMatchType(e.target.value)}
//         >
//           <option value="football">Football</option>
//           <option value="cricket">Cricket</option>
//         </select>
//       </div>
//     );
//   };

//   const MatchStatusInputField = () => {
//     const setMatchStatus = (matchStatus: string) => {
//       setMatchData({
//         ...matchData,
//         match_status: matchStatus,
//       });
//     };

//     return (
//       <div className="">
//         <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
//           Match Status
//         </label>
//         <input
//           className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           type="text"
//           value={matchData.match_status}
//           onChange={(e) => setMatchStatus(e.target.value)}
//         />
//       </div>
//     );
//   };

//   const MatchDateField = (match_date: Date) => {
//     function datetimeLocal(datetime: Date) {
//       const dt = new Date(datetime);
//       const offset = dt.getTimezoneOffset();
//       dt.setMinutes(dt.getMinutes() - offset);
//       return dt.toISOString().slice(0, 16);
//     }
//     const date = datetimeLocal(match_date);

//     const setMatchDate = (date: string) => {
//       setMatchData({
//         ...matchData,
//         match_date: new Date(date),
//       });
//     };

//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
//           Match Date
//         </label>
//         <input
//           className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           type="datetime-local"
//           value={date}
//           onChange={(e) => setMatchDate(e.target.value)}
//         />
//       </div>
//     );
//   };

//   const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(
//         `/api/v1/live/match/${matchData.firebase_match_id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(matchData),
//         }
//       );

//       if (response.ok) {
//         const responseData = await response.json();

//         setStatusMessage({
//           error: false,
//           success: true,
//           message: "Match updated successfully",
//         });

//         if (sendNotification) {
//           sendLiveNotification("", matchData, matchData.firebase_match_id);
//         }
//       } else {
//         setStatusMessage({
//           error: true,
//           success: false,
//           message: "Error updating match: " + response.statusText,
//         });
//       }
//     } catch (error) {
//       setStatusMessage({
//         error: true,
//         success: false,
//         message: "Error updating match: " + error,
//       });
//     }
//   };

//   const IsMatchLiveField = () => {
//     const handleIsLiveChange = (e: any) => {
//       setMatchData({
//         ...matchData,
//         is_live: e.target.value === "yes",
//       });
//     };

//     return (
//       <div className="mb-4">
//         <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
//           Match Type
//         </label>
//         <select
//           className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           value={matchData.is_live ? "yes" : "no"}
//           onChange={handleIsLiveChange}
//         >
//           <option value={"yes"}>Yes</option>
//           <option value={"no"}>No</option>
//         </select>
//       </div>
//     );
//   };

//   const MatchDetailsForm = () => (
//     <form className="grid grid-flow-row gap-2 my-2" onSubmit={handleOnSubmit}>
//       <div className="grid grid-flow-row grid-cols-2 gap-4">
//         <div className="">
//           {renderTeamInput(
//             1,
//             matchData.team1.team_code,
//             setTeam1Code,
//             matchData.team1.team_score,
//             setTeam1Score,
//             matchData.team2.team_code
//           )}
//         </div>
//         <div className="">
//           {renderTeamInput(
//             2,
//             matchData.team2.team_code,
//             setTeam2Code,
//             matchData.team2.team_score,
//             setTeam2Score,
//             matchData.team1.team_code
//           )}
//         </div>
//       </div>
//       {matchData.match_type === "football" && <PenlityComponents />}
//       <IsMatchLiveField />
//       <MatchTypeInputField />
//       <MatchStatusInputField />
//       {MatchDateField(matchData.match_date)}

//       <div className="flex flex-row justify-between gap-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={sendNotification}
//             onChange={() => setSendNotification(!sendNotification)}
//           />
//           <span>Send Notification</span>
//         </label>
//         <button
//           className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//           type="submit"
//         >
//           Update
//         </button>
//       </div>
//     </form>
//   );

//   const TimelineHistory = () => {
//     const handleDeleteTimeline = async (firebase_timeline_id: string) => {
//       const res = await fetch(
//         `/api/v1/live/match/${matchData.firebase_match_id}/timeline/${firebase_timeline_id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (res.ok) {
//         const newTimeline = matchData.timeline.filter(
//           (timeline) => timeline.firebase_timeline_id !== firebase_timeline_id
//         );
//         setMatchData({
//           ...matchData,
//           timeline: newTimeline,
//         });
//       } else {
//         console.error("Error deleting timeline:", res.statusText);
//       }
//     };

//     return (
//       <div>
//         <h2 className="text-lg font-semibold text-gray-800">
//           Timeline History
//         </h2>
//         <div className="grid grid-flow-row gap-4 my-2">
//           {matchData.timeline
//             .sort(
//               (a, b) =>
//                 new Date(b.timeline_date).getTime() -
//                 new Date(a.timeline_date).getTime()
//             )
//             .map((timeline, index) => (
//               <div
//                 key={timeline.firebase_timeline_id}
//                 className="bg-white p-2 rounded-md flex flex-col gap-2 "
//               >
//                 <div className="flex flex-row justify-between">
//                   <p className="text-xs font-light text-gray-800">
//                     {new Date(timeline.timeline_date).toLocaleString()}
//                   </p>
//                   <button
//                     onClick={() =>
//                       handleDeleteTimeline(timeline.firebase_timeline_id)
//                     }
//                     className="hover:bg-red-50 p-1 rounded-sm"
//                   >
//                     <TrashIcon className="h-5 w-5 text-red-500 " />
//                   </button>
//                 </div>
//                 <div className="porse prose-a:text-blue-500 prose-a:underline">
//                   {parse(timeline.msgHtml)}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   };

//   const AddTimeline = () => {
//     const handleAddTimeline = async (e: any) => {
//       e.preventDefault();

//       const timeline_date = e.target.timeline_date.value;
//       const content = editorRef.current?.getContent();
//       const contentText = editorRef.current?.getContent({ format: "text" });

//       if (!content) {
//         setStatusMessage({
//           error: true,
//           success: false,
//           message: "Content cannot be empty",
//         });
//         return;
//       }
//       const timeline = {
//         timeline_date: timeline_date ? new Date(timeline_date) : new Date(),
//         msgHtml: content,
//       };
//       const res = await fetch(
//         `/api/v1/live/match/${matchData.firebase_match_id}/timeline`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(timeline),
//         }
//       );

//       if (res.ok) {
//         if (sendNotification) {
//           sendLiveNotification(
//             contentText ?? "",
//             matchData,
//             matchData.firebase_match_id
//           );
//         }
//         const newTimeline = await res.json();
//         setMatchData({
//           ...matchData,
//           timeline: [...matchData.timeline, newTimeline.data],
//         });
//         editorRef.current?.setContent("");
//         setStatusMessage({
//           error: false,
//           success: true,
//           message: "Timeline added successfully",
//         });
//       } else {
//         setStatusMessage({
//           error: true,
//           success: false,
//           message: "Error adding timeline",
//         });
//       }
//     };

//     return (
//       <form onSubmit={handleAddTimeline} className="grid grid-flow-row gap-4">
//         <h2 className="text-lg font-semibold text-gray-800">Add Timeline</h2>
//         <div className="grid grid-flow-row gap-2">
//           <input
//             name="timeline_date"
//             type="datetime-local"
//             className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//           <Editor
//             onInit={(evt, editor) => (editorRef.current = editor)}
//             apiKey="w6q7m6bspz8sqsc3xf8ogte5se9rmnjz0x84aruqxnvb5jek"
//             init={{
//               plugins: "link",
//               default_link_target: "_blank",
//             }}
//             initialValue=""
//           />
//           <div className="flex flex-row justify-end gap-4">
//             <button
//               className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//               type="submit"
//             >
//               Add Timeline
//             </button>
//           </div>
//         </div>
//       </form>
//     );
//   };

//   const sendLiveNotification = async (
//     timelineMessage: String,
//     data: MatchPosts,
//     firebaseMatchId: string
//   ) => {
//     const notifyRes = await fetch("/api/v1/live/notification/send", {
//       method: "POST",
//       redirect: "follow",
//       body: JSON.stringify({
//         ...data,
//         id: firebaseMatchId,
//         timeline_message: timelineMessage,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });

//     if (notifyRes.ok) {
//       setStatusMessage({
//         error: false,
//         success: true,
//         message: "Notification sent successfully",
//       });
//     } else {
//       setStatusMessage({
//         error: true,
//         success: false,
//         message: "Error sending notification",
//       });
//     }
//   };

//   const MessageBox = () => (
//     <div
//       className={`${
//         statusMessage.error ? "bg-red-200" : "bg-green-200"
//       } p-2 rounded-md ${
//         statusMessage.error ? "text-red-600" : "text-green-600"
//       }`}
//     >
//       <p>{statusMessage.message}</p>
//     </div>
//   );

//   return (
//     <div className="grid grid-flow-row gap-4">
//       {statusMessage.message && <MessageBox />}
//       <MatchDetailsForm />
//       <AddTimeline />
//       <TimelineHistory />
//     </div>
//   );
// };

// export default EditLivePostForm;
