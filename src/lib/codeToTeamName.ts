export const codeToTeamName: { [key: string]: string; } = {
  "100": "CSE",
  "101": "IT",
  "102": "ECE",
  "103": "AEIE",
  "104": "EE",
  "105": "MECH",
  "106": "CIVIL",
  "107": "CHEMICAL",
  "108": "BT/FT+AGL",
  "109": "CSE CS",
  "110": "CSE DS",
  "111": "CSE AIML",
  "112": "MASTERS",
};

export function getTeamName(code: string): string | null {
  return codeToTeamName[code] ?? null;
}

export function getAllTeamsCode(): string[] {
  return Object.keys(codeToTeamName);
}
