"use client";

import React, { useState } from "react";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";

const CreateLivePostForm = () => {
  const [team1Code, setTeam1Code] = useState("100");
  const [team1Score, setTeam1Score] = useState("");
  const [team2Code, setTeam2Code] = useState("101");
  const [team2Score, setTeam2Score] = useState("");
  const [matchDateTime, setMatchDateTime] = useState("");
  const [isLive, setIsLive] = useState("true");
  const [matchStatus, setMatchStatus] = useState("");
  const [matchType, setMatchType] = useState("football");
  const [sendNotification, setSendNotification] = useState(true);

  const matchPostData = async (e: any) => {
    e.preventDefault();

    const data = {
      team1: {
        team_score: team1Score,
        team_code: team1Code,
      },
      team2: {
        team_score: team2Score,
        team_code: team2Code,
      },
      match_date: new Date(matchDateTime),
      is_live: isLive === "true",
      match_type: matchType,
      match_status: matchStatus,
    };

    console.log(data);

    // const res = await fetch("/api/live/create", {
    //   method: "POST",
    //   redirect: "follow",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // });

    // if (res.ok) {
    //   const result = await res.json();

    //   if (result.msg === 'success') {
    //     if (!sendNotification) {
    //       window.location = `/pages/live/edit/${result.matchId}`;
    //       return;
    //     }

    //     const notifyRes = await fetch("/api/live/notification/send", {
    //       method: "POST",
    //       redirect: "follow",
    //       body: JSON.stringify({
    //         ...data,
    //         id: result.matchId,
    //         timeline_message: matchStatus,
    //       }),
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //       },
    //     });

    //     const notifyResult = await notifyRes.json();

    //     if (notifyResult.msg === 'success') {
    //       window.location = `/pages/live/edit/${result.matchId}`;
    //     } else {
    //       alert("Failed to send a live match notification: " + notifyResult.msg);
    //     }
    //   } else {
    //     alert("Failed to create a live match: " + result.msg);
    //   }
    // }
  };

  const handleTeamChange =
    (setTeamCode: any, otherTeamCode: string) => (e: any) => {
      setTeamCode(e.target.value);
      if (e.target.value === otherTeamCode) {
        setTeamCode("");
      }
    };

  const renderTeamSelect = (
    teamCode: string,
    setTeamCode: any,
    otherTeamCode: string
  ) => (
    <select
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
    teamCode: string,
    setTeamCode: any,
    teamScore: string,
    setTeamScore: any,
    otherTeamCode: string
  ) => (
    <div>
      <label>{codeToTeamName[teamCode]}</label>
      {renderTeamSelect(teamCode, setTeamCode, otherTeamCode)}
      <input
        required
        placeholder="Score"
        value={teamScore}
        onChange={(e) => setTeamScore(e.target.value)}
      />
    </div>
  );

  return (
    <div>
      <form onSubmit={matchPostData}>
        <div>
          <input
            type="checkbox"
            checked={sendNotification}
            onChange={() => setSendNotification(!sendNotification)}
          />
          <label>Notify Users</label>
        </div>

        {renderTeamInput(
          team1Code,
          setTeam1Code,
          team1Score,
          setTeam1Score,
          team2Code
        )}
        {renderTeamInput(
          team2Code,
          setTeam2Code,
          team2Score,
          setTeam2Score,
          team1Code
        )}

        <div>
          <label>Match Date and Time</label>
          <input
            type="datetime-local"
            value={matchDateTime}
            onChange={(e) => setMatchDateTime(e.target.value)}
          />
        </div>

        <div>
          <label>Is Match Live?</label>
          <select value={isLive} onChange={(e) => setIsLive(e.target.value)}>
            <option value="true">LIVE</option>
            <option value="false">NOT LIVE</option>
          </select>
        </div>

        <div>
          <label>Match Type</label>
          <select
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
          >
            <option value="football">football</option>
            <option value="cricket">cricket</option>
          </select>
        </div>

        <div>
          <label>Match Status</label>
          <textarea
            required
            placeholder="Match Started"
            value={matchStatus}
            onChange={(e) => setMatchStatus(e.target.value)}
            maxLength={35}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLivePostForm;
