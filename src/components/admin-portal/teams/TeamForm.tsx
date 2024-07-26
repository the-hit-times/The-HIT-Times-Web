import { Player, Teams } from "@/models/Team";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([^\/&]+)/
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
  <div className="flex flex-row gap-2 my-1">
    <div>
      <Image
        src={extractImageUrl(player.player_image)}
        alt={player.player_name}
        width={50}
        height={50}
        className="rounded-full aspect-square object-cover"
      />
    </div>
    <input
      type="text"
      placeholder="Player Name"
      className="
        outline outline-transparent
        px-3
        block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      value={player.player_name}
      onChange={(e) => handleChange("player_name", e.target.value)}
    />
    <input
      type="text"
      className="
        outline outline-transparent
        px-3
        block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Player Position"
      value={player.player_description}
      onChange={(e) => handleChange("player_description", e.target.value)}
    />
    <input
      type="url"
      className="
        outline outline-transparent
        px-3
        block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="Player Image"
      value={player.player_image}
      onChange={(e) => handleChange("player_image", e.target.value)}
    />
    <button type="button" onClick={handleDelete}>
      <TrashIcon width={24} className="text-red-700" />
    </button>
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
      <h2 className={"text-2xl font-bold my-2"}>{teamType.charAt(0).toUpperCase() + teamType.slice(1)}</h2>
      <div className="flex flex-row gap-2">
        <Image
          src={extractImageUrl(teamData.team_logo ?? "")}
          alt={teamData.team_name}
          width={50}
          height={50}
          className="rounded-full aspect-square object-cover"
        />
        <input
          type="text"
          className="
        outline outline-transparent
        px-3
        block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Team Name"
          value={teamData.team_name}
          onChange={(e) => setTeamData("team_name", e.target.value)}
        />
        <input
          type="url"
          placeholder="Team Logo"
          className="
        outline outline-transparent
        px-3
        block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={teamData.team_logo}
          onChange={(e) => setTeamData("team_logo", e.target.value)}
        />
      </div>
      <h3 className="font-semibold my-4">Players</h3>
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
        <button
          className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="button"
          onClick={handleAddPlayer}
        >
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
      <form onSubmit={handleSave} className="grid grid-flow-row gap-4">
        <TeamFormSection team={team} setTeam={setTeam} teamType="football" />
        <TeamFormSection team={team} setTeam={setTeam} teamType="cricket" />
        <button
          className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
