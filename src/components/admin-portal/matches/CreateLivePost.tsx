"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";

const CreateLivePostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    team1Code: "100",
    team1Score: "",
    team2Code: "101",
    team2Score: "",
    matchDateTime: "",
    isLive: "true",
    matchType: "football",
    matchStatus: "",
    sendNotification: true,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<any>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }));
  };

  const handleTeamChange = (team: "team1Code" | "team2Code") => 
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const otherTeam = team === "team1Code" ? formData.team2Code : formData.team1Code;
      if (e.target.value !== otherTeam) {
        setFormData(prev => ({ ...prev, [team]: e.target.value }));
      }
    };

  const submitMatchData = async (e: React.FormEvent) => {
    e.preventDefault();

    const matchData = {
      team1: {
        team_score: formData.team1Score,
        team_code: formData.team1Code,
        team_name: codeToTeamName[formData.team1Code],
      },
      team2: {
        team_score: formData.team2Score,
        team_code: formData.team2Code,
        team_name: codeToTeamName[formData.team2Code],
      },
      match_date: new Date(formData.matchDateTime),
      is_live: formData.isLive === "true",
      match_type: formData.matchType,
      match_status: formData.matchStatus,
    };

    try {
      const res = await fetch("/api/v1/live/create", {
        method: "POST",
        body: JSON.stringify(matchData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) throw new Error("Failed to create match");

      const result = await res.json();
      if (result.msg !== "success") {
        throw new Error(result.msg);
      }

      const matchId = result.matchId || result.data?.firebase_match_id; // Adjust based on your API response structure
      
      if (!formData.sendNotification) {
        router.push(`/admin-portal/matches/edit/${matchId}`);
        return;
      }

      const notifyRes = await fetch("/api/v1/live/notification/send", {
        method: "POST",
        body: JSON.stringify({
          team1: matchData.team1,
          team2: matchData.team2,
          match_status: `Match between ${matchData.team1.team_name} and ${matchData.team2.team_name} is now LIVE!`,
          postId: matchId,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const notifyResult = await notifyRes.json();
      if (notifyResult.success || notifyResult.msg === "success") {
        router.push(`/admin-portal/matches/edit/${matchId}`);
      } else {
        alert(`Failed to send notification: ${notifyResult.msg}`);
        router.push(`/admin-portal/matches/edit/${matchId}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Error: ${errorMessage}`);
    }
  };

  const renderTeamSelect = (teamCode: string, teamField: "team1Code" | "team2Code") => (
    <select
      className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      value={teamCode}
      onChange={handleTeamChange(teamField)}
    >
      {getAllTeamsCode().map((code: string) => (
        <option
          key={code}
          value={code}
          disabled={code === (teamField === "team1Code" ? formData.team2Code : formData.team1Code)}
        >
          {codeToTeamName[code]}
        </option>
      ))}
    </select>
  );

  const renderTeamInput = (teamNum: 1 | 2) => {
    const teamCodeField = `team${teamNum}Code` as "team1Code" | "team2Code";
    const teamScoreField = `team${teamNum}Score` as "team1Score" | "team2Score";
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Team {teamNum}
        </label>
        {renderTeamSelect(formData[teamCodeField], teamCodeField)}
        <input
          className="mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          required
          placeholder="Score"
          value={formData[teamScoreField]}
          onChange={handleInputChange(teamScoreField)}
        />
      </div>
    );
  };

  return (
    <div className="my-4">
      <form onSubmit={submitMatchData} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          {renderTeamInput(1)}
          {renderTeamInput(2)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Match Date and Time
          </label>
          <input
            className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            type="datetime-local"
            value={formData.matchDateTime}
            onChange={handleInputChange("matchDateTime")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Is Match Live?
          </label>
          <select
            className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={formData.isLive}
            onChange={handleInputChange("isLive")}
          >
            <option value="true">LIVE</option>
            <option value="false">NOT LIVE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Match Type
          </label>
          <select
            className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={formData.matchType}
            onChange={handleInputChange("matchType")}
          >
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Match Status
          </label>
          <textarea
            className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            required
            placeholder="Match Started"
            value={formData.matchStatus}
            onChange={handleInputChange("matchStatus")}
            maxLength={35}
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.sendNotification}
              onChange={handleInputChange("sendNotification")}
            />
            <label className="text-sm text-gray-900">Notify Users</label>
          </div>

          <button
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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