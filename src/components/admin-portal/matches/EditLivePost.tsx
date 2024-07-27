"use client";

import React, { useState, useEffect, useRef } from "react";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { useRouter } from "next/navigation";
import { MatchPosts } from "@/models/Match";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

interface EditLivePostFormProps {
  match: MatchPosts;
}

const EditLivePostForm: React.FC<EditLivePostFormProps> = ({ match }) => {
  const router = useRouter();
  const [matchData, setMatchData] = useState<MatchPosts>(match);
  const [showPenalty, setShowPenalty] = useState<boolean>(false);
  const [sendNotification, setSendNotification] = useState<boolean>(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

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
      matchData.team1.team_penalty != null &&
      (matchData.team1.team_penalty.trim() != "0" ||
        matchData.team2.team_penalty.trim() != "0") &&
      matchData.team1.team_score == matchData.team2.team_score;
    setShowPenalty(isPenalty);
  }, [matchData]);

  const PenlityComponents = () => (
    <div>
      <input
        type="checkbox"
        checked={showPenalty}
        onChange={() => setShowPenalty(!showPenalty)}
      />
      <label>Show Penalty</label>
      {showPenalty && (
        <div>
          <div>
            <label>{codeToTeamName[matchData.team1.team_code]}</label>
            <input
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

            <label>{codeToTeamName[matchData.team2.team_code]}</label>
            <input
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
        <label>Match Type</label>
        <select
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
        <label>Match Status</label>
        <input
          type="text"
          value={matchData.match_status}
          onChange={(e) => setMatchStatus(e.target.value)}
        ></input>
      </div>
    );
  };

  const MatchDateField = (match_date: Date) => {
    function datetimeLocal(datetime: Date) {
      const dt = new Date(datetime);
      const offset = dt.getTimezoneOffset();
      dt.setMinutes(dt.getMinutes() - offset);
      return dt.toISOString().slice(0, 16);
    }
    const date = datetimeLocal(match_date);

    const setMatchDate = (date: string) => {
      setMatchData({
        ...matchData,
        match_date: new Date(date),
      });
    };

    return (
      <div>
        <label>Match Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setMatchDate(e.target.value)}
        />
      </div>
    );
  };

  const handleMatchDataUpdate = async (e: any) => {
    e.preventDefault();
    const data = {
      ...matchData,
    };

    const matchUpdateResponse = await fetch(`/api/v1/live/match/${matchData.firebase_match_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  };

  return (
    <div>
      <form onSubmit={handleMatchDataUpdate}>
        <div>
          <input
            type="checkbox"
            checked={sendNotification}
            onChange={() => setSendNotification(!sendNotification)}
          />
          <label>Notify Users</label>

          {renderTeamInput(
            matchData.team1.team_code,
            setTeam1Code,
            matchData.team1.team_score,
            setTeam1Score,
            matchData.team2.team_code
          )}
          {renderTeamInput(
            matchData.team2.team_code,
            setTeam2Code,
            matchData.team2.team_score,
            setTeam2Score,
            matchData.team1.team_code
          )}

          {matchData.match_type === "football" && <PenlityComponents />}

          {MatchDateField(matchData.match_date)}

          <MatchTypeInputField />
          <MatchStatusInputField />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditLivePostForm;
