import {
  Army,
  Rank,
  RankKey,
  Slot,
  SlotKey,
  Unit,
  Upgrade,
  Upgrades
} from "sw-legion-data/lib/types";
import {
  ArmyLDF,
  UnitLDF,
  UpgradesLDF,
  LDFString
} from "sw-legion-data/lib/types/ldf";
import { allSlots, rankKeys, ranks, slotKeys } from "./enums";

export const slotFromKey = (key: SlotKey): Slot => {
  const index = slotKeys.indexOf(key);
  if (index >= 0) {
    return allSlots[index];
  }
  return "Force";
};

export const keyFromSlot = (slot: Slot): SlotKey => {
  const index = allSlots.indexOf(slot);
  if (index >= 0) {
    return slotKeys[index];
  }
  return "force";
};

export const rankFromRankKey = (key: RankKey): Rank => {
  const index = rankKeys.indexOf(key);
  if (index >= 0) {
    return ranks[index];
  }
  return "Commander";
};

export const rankKeyFromRank = (rank: Rank): RankKey => {
  const index = ranks.indexOf(rank);
  if (index >= 0) {
    return rankKeys[index];
  }
  return "commander";
};

export const upgradesToLDF = (upgrades?: Upgrades): UpgradesLDF => {
  const upgradesObj: { [s: string]: LDFString[] } = {};

  slotKeys.forEach(key => {
    const uS: Upgrade[] | undefined = upgrades && upgrades[key];
    if (uS) {
      upgradesObj[key] = uS.map(u => <LDFString>u.ldf);
    }
  });

  return <UpgradesLDF>upgradesObj;
};

export const unitToLDF = (unit: Unit): UnitLDF => {
  return <UnitLDF>{
    uid: unit.uid,
    ldf: unit.ldf,
    rank: unit.rank,
    upgrades: upgradesToLDF(unit.upgrades),
    points: unit.points
  };
};

export const ldfFromArmy = (army: Army): ArmyLDF => {
  return <ArmyLDF>{
    uid: army.uid,
    name: army.name,
    description: "",
    points: army.points,
    faction: army.faction,
    favourite: army.favourite,
    format: army.format,
    commander: army.commander.map(u => unitToLDF(u)),
    corps: army.corps.map(u => unitToLDF(u)),
    heavy: army.heavy.map(u => unitToLDF(u)),
    operative: army.operative.map(u => unitToLDF(u)),
    special: army.special.map(u => unitToLDF(u)),
    support: army.support.map(u => unitToLDF(u))
  };
};
