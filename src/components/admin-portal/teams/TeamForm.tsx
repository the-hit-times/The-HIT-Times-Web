import { Player, Teams } from "@/models/Team";
import { useEffect, useState } from "react";
import Image from "next/image";

type TeamProps = {
  teamCode: string;
  deptName: string;
};

type TeamFormProps = {
  team: Teams;
  setTeam: (team: Teams) => void;
  teamType: "football" | "cricket";
};

type PlayerFormProps = {
  player: Player;
  handleChange: (field: keyof Player, value: string) => void;
  handleDelete: () => void;
};

const emptyPlayer: Player = {
  player_name: "",
  player_description: "",
  player_image: "",
};

const extractImageUrl = (url: string): string => {
  const googleDriveMatch = url.match(
    /https:\/\/drive\.google\.com\/file\/d\/(.+?)\/view/
  );
  return googleDriveMatch
    ? `https://drive.google.com/uc?export=view&id=${googleDriveMatch[1]}`
    : url;
};

const PlayerForm = ({
  player,
  handleChange,
  handleDelete,
}: PlayerFormProps) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ marginRight: "10px" }}>
      <Image
        src={extractImageUrl(player.player_image)}
        alt={player.player_name}
        width={50}
        height={50}
        style={{ objectFit: "cover" }}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Player Name"
        value={player.player_name}
        onChange={(e) => handleChange("player_name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Player Position"
        value={player.player_description}
        onChange={(e) => handleChange("player_description", e.target.value)}
      />
      <input
        type="url"
        placeholder="Player Image"
        value={player.player_image}
        onChange={(e) => handleChange("player_image", e.target.value)}
      />
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  </div>
);

const TeamFormSection = ({ team, setTeam, teamType }: TeamFormProps) => {
  const [newPlayer, setNewPlayer] = useState<Player>({ ...emptyPlayer });
  const teamData = team[teamType];

  const setTeamData = (field: keyof typeof teamData, value: string) => {
    setTeam({
      ...team,
      [teamType]: { ...teamData, [field]: value },
    });
  };

  const handleAddPlayer = () => {
    if (
      newPlayer.player_name ||
      newPlayer.player_description ||
      newPlayer.player_image
    ) {
      setTeam({
        ...team,
        [teamType]: {
          ...teamData,
          players: [...teamData.players, newPlayer],
        },
      });
      setNewPlayer({ ...emptyPlayer }); // Reset the new player form
    }
  };

  const handleEditPlayer = (
    index: number,
    field: keyof Player,
    value: string
  ) => {
    const updatedPlayers = teamData.players.map((player, idx) =>
      idx === index ? { ...player, [field]: value } : player
    );
    setTeam({
      ...team,
      [teamType]: { ...teamData, players: updatedPlayers },
    });
  };

  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = teamData.players.filter((_, idx) => idx !== index);
    setTeam({
      ...team,
      [teamType]: { ...teamData, players: updatedPlayers },
    });
  };

  return (
    <div>
      <h1>{teamType.charAt(0).toUpperCase() + teamType.slice(1)}</h1>
      <input
        type="text"
        placeholder="Team Name"
        value={teamData.team_name}
        onChange={(e) => setTeamData("team_name", e.target.value)}
      />
      <input
        type="url"
        placeholder="Team Logo"
        value={teamData.team_logo}
        onChange={(e) => setTeamData("team_logo", e.target.value)}
      />
      <h1>Players</h1>
      {teamData.players.map((player, index) => (
        <div key={index}>
          <PlayerForm
            player={player}
            handleChange={(field, value) =>
              handleEditPlayer(index, field, value)
            }
            handleDelete={() => handleDeletePlayer(index)}
          />
        </div>
      ))}
      <div>
        <PlayerForm
          player={newPlayer}
          handleChange={(field, value) =>
            setNewPlayer({ ...newPlayer, [field]: value })
          }
          handleDelete={() => setNewPlayer({ ...emptyPlayer })}
        />
        <button type="button" onClick={handleAddPlayer}>
          Add Player
        </button>
      </div>
    </div>
  );
};

export default function TeamForm({ teamCode, deptName }: TeamProps) {
  const [loading, setLoading] = useState(true);
  const emptyTeamData: Teams = {
    _id: "",
    team_code: teamCode,
    dept_name: deptName,
    football: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
    cricket: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
  };
  const [team, setTeam] = useState(emptyTeamData);

  const getTeamData = async (code: string) => {
    const res = await fetch(`/api/v1/team/${code}`);
    const data = await res.json();
    if (res.ok && data.code === "success") {
      setTeam(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTeamData(teamCode);
  }, [teamCode]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(team);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <TeamFormSection team={team} setTeam={setTeam} teamType="football" />
        <TeamFormSection team={team} setTeam={setTeam} teamType="cricket" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
