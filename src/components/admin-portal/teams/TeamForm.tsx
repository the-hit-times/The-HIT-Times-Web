import { Teams } from "@/models/Team";
import { useEffect, useState } from "react";


export default function TeamForm({
  teamData,
}: Readonly<{ teamData: Teams }>) {
  const [team, setTeam] = useState<Teams>(teamData);


  return (
    <div>
      <h1>TeamForm</h1>
    </div>
  );
}
