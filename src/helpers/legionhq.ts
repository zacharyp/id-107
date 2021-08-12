// import { allUnits } from "sw-legion-data/lib/units/index";
import { ArmyLDF, UnitLDF } from "sw-legion-data/lib/types/ldf";
import { loadArmy, pointsForUnit } from "./unit";
import { Army } from "sw-legion-data/lib/types";


const stringToUnit = (s: string): UnitLDF | undefined => {

  return undefined;
}

export const legionhqToArmyLDF = (faction: string, legionhq: string): Army | undefined => {
  const uS: UnitLDF[] = [];

  let strings = legionhq.split(",");
  if (strings.length < 7) {
    return undefined;
  } else {
    // Remove command cards
    let units = strings.slice(0, strings.length - 6)
    units.forEach(u => {
      let ldf = stringToUnit(u)
      if (ldf) {
        uS.push(ldf)
      }
    })
  }

  let armyPoints = uS.map(u => pointsForUnit(u)).reduce((s, p) => s + p, 0);

  let armyLDF = <ArmyLDF>{
    points: armyPoints,
    faction: faction,
    commander: uS.filter(u => u.rank == "Commander"),
    operative: uS.filter(u => u.rank == "Operative"),
    corps: uS.filter(u => u.rank == "Corps"),
    special: uS.filter(u => u.rank == "Special Forces"),
    support: uS.filter(u => u.rank == "Support"),
    heavy: uS.filter(u => u.rank == "Heavy"),
  };

  return loadArmy(armyLDF)
}
