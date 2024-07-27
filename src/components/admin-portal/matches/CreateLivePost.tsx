"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";

const CreateLivePostForm = () => {
  const router = useRouter();
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

    const res = await fetch("/api/v1/live/create", {
      method: "POST",
      redirect: "follow",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (res.ok) {
      const result = await res.json();

      if (result.msg === "success") {
        if (!sendNotification) {
          router.push(`/admin-portal/matches/edit/${result.matchId}`);
          return;
        }

        const notifyRes = await fetch("/api/v1/live/notification/send", {
          method: "POST",
          redirect: "follow",
          body: JSON.stringify({
            ...data,
            id: result.matchId,
            timeline_message: matchStatus,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const notifyResult = await notifyRes.json();

        if (notifyResult.msg === "success") {
          router.push(`/admin-portal/matches/edit/${result.matchId}`);
        } else {
          alert(
            "Failed to send a live match notification: " + notifyResult.msg
          );
        }
      } else {
        alert("Failed to create a live match: " + result.msg);
      }
    }
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
    setTeamCode: any,
    teamScore: string,
    setTeamScore: any,
    otherTeamCode: string
  ) => (
    <div>
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

  return (
    <div className="my-4">
      <form onSubmit={matchPostData} className="grid grid-flow-row gap-4">
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          {renderTeamInput(
            1,
            team1Code,
            setTeam1Code,
            team1Score,
            setTeam1Score,
            team2Code
          )}
          {renderTeamInput(
            2,
            team2Code,
            setTeam2Code,
            team2Score,
            setTeam2Score,
            team1Code
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Match Date and Time
          </label>
          <input
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            type="datetime-local"
            value={matchDateTime}
            onChange={(e) => setMatchDateTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Is Match Live?
          </label>
          <select
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            value={isLive}
            onChange={(e) => setIsLive(e.target.value)}
          >
            <option value="true">LIVE</option>
            <option value="false">NOT LIVE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Match Type
          </label>
          <select
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
          >
            <option value="football">football</option>
            <option value="cricket">cricket</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
            Match Status
          </label>
          <textarea
            className="outline outline-transparent px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            required
            placeholder="Match Started"
            value={matchStatus}
            onChange={(e) => setMatchStatus(e.target.value)}
            maxLength={35}
          ></textarea>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div>
            <input
              type="checkbox"
              checked={sendNotification}
              onChange={() => setSendNotification(!sendNotification)}
            />
            <label>Notify Users</label>
          </div>

          <button
            className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLivePostForm;
