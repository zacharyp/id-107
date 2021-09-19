import {
  Faction,
  Format,
  Rank,
  RankKey,
  Slot,
  SlotKey
} from "sw-legion-data/lib/types";

export const factions: Faction[] = [
  "rebel",
  "imperial",
  "republic",
  "separatist"
];

export const formats: Format[] = ["Standard", "Grand", "Skirmish"];

export const allSlots: Slot[] = [
  "Armament",
  "Command",
  "Comms",
  "Counterpart",
  "Crew",
  "Force",
  "Gear",
  "Generator",
  "Grenades",
  "Hardpoint",
  "Heavy Weapon",
  "Ordnance",
  "Personnel",
  "Pilot",
  "Protocol",
  "Training"
];

export const slotKeys: SlotKey[] = [
  "armament",
  "command",
  "comms",
  "counterpart",
  "crew",
  "force",
  "gear",
  "generator",
  "grenades",
  "hardpoint",
  "heavyweapon",
  "ordnance",
  "personnel",
  "pilot",
  "protocol",
  "training"
];

export const ranks: Rank[] = [
  "Commander",
  "Operative",
  "Corps",
  "Special Forces",
  "Support",
  "Heavy"
];

export const rankKeys: RankKey[] = [
  "commander",
  "operative",
  "corps",
  "special",
  "support",
  "heavy"
];
