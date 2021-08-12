import {v4 as uuidv4} from 'uuid'

import { upgradesRecord } from "sw-legion-data/lib/upgrades";
import { unitsRecord } from "sw-legion-data/lib/units/index";
import {
  Army,
  Slot,
  SlotKey,
  Upgrade,
  Unit,
  CommandCard
} from "sw-legion-data/lib/types";
import { commandCards } from "sw-legion-data/lib/command-cards";
import { ArmyLDF, LDFString, UnitLDF } from "sw-legion-data/lib/types/ldf";
import { slotKeys } from "./enums";
import { slotFromKey } from "./convert";

export const upgradeExists = (slot: Slot, ldf: string) => {
  return upgradesRecord[slot].filter(u => u.ldf === ldf).length > 0;
};

const unitLDFToUnit = (
  unitLDF: UnitLDF,
  skipLoadingUpgrades: boolean = false
): Unit => {
  let unit: Unit = JSON.parse(
    JSON.stringify(unitsRecord[unitLDF.rank].find(u => u.ldf === unitLDF.ldf))
  );

  if (!unit.upgrades) {
    unit.upgrades = {};
  }

  let pointsWithUpgrades: number = unit.points;
  slotKeys.forEach(key => {
    const up = unitLDF.upgrades ? unitLDF.upgrades[key] : undefined;
    if (up && !skipLoadingUpgrades) {
      // @ts-ignore
      unit.upgrades[key] = up
        .filter(ldf => {
          const s = slotFromKey(key);
          return upgradeExists(s, ldf);
        })
        .map(upLdf => {
          const upg = loadUpgrade(key, upLdf);
          if (upg) {
            pointsWithUpgrades = pointsWithUpgrades + upg.points;
          }
          return upg;
        });
    }
  });

  unit.uid = unitLDF.uid || uuidv4();
  unit.pointsWithUpgrades = pointsWithUpgrades;

  return unit;
};

export const armyUnits = (army: Army): Unit[] => {
  return [
    army.commander,
    army.operative,
    army.corps,
    army.special,
    army.support,
    army.heavy
  ].reduce((a, b) => a.concat(b));
};

export const loadUpgrade = (slotKey: SlotKey, upgradeLDF: string): Upgrade | undefined => {
  const slot = slotFromKey(slotKey);
  return upgradesRecord[slot].find(u => u.ldf == upgradeLDF);
};

export const pointsForArmy = (army: ArmyLDF): number => {
  const armyUnits = [
    army.commander,
    army.operative,
    army.corps,
    army.special,
    army.support,
    army.heavy
  ].reduce((a, b) => a.concat(b));

  return armyUnits.map(u => pointsForUnit(u)).reduce((s, p) => s + p, 0);
};

export const pointsForUnit = (unitLDF: UnitLDF): number => {
  return unitLDFToUnit(unitLDF).pointsWithUpgrades || 0;
};

export const pointsForUpgrade = (
  upgrade: Upgrade,
  usePrinted: boolean
): number => {
  if (usePrinted) {
    return upgrade.printed_points || upgrade.points;
  } else {
    return upgrade.points;
  }
};

export const loadCommandCards = (ccs?: LDFString[]): CommandCard[] => {
  if (!ccs) {
    return [];
  }

  const isCommandCard = (item: CommandCard | undefined): item is CommandCard => {
    return !!item
  }

  return ccs.map(cLdf => commandCards.find(c => c.ldf == cLdf)).filter(isCommandCard);
};

const unitLDFsToUnits = (units: UnitLDF[]): Unit[] => {
  return units.map(u => unitLDFToUnit(u));
};

export const loadArmy = (ldf: ArmyLDF): Army | undefined => {
  if (!ldf) {
    return undefined;
  }

  const army: Army = {
    uid: ldf.uid || uuidv4(),
    name: ldf.name || "",
    points: ldf.points || 0,
    faction: ldf.faction,
    format: ldf.format || "Standard",
    favourite: ldf.favourite || false,
    version: ldf.version,
    commander: unitLDFsToUnits(ldf.commander),
    operative: unitLDFsToUnits(ldf.operative),
    corps: unitLDFsToUnits(ldf.corps),
    special: unitLDFsToUnits(ldf.special),
    support: unitLDFsToUnits(ldf.support),
    heavy: unitLDFsToUnits(ldf.heavy),
    commandCards: loadCommandCards(ldf.commandCards || [])
  };

  army.points = pointsForArmy(ldf);
  return army;
};
