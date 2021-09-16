import {ArmyLDF, UnitLDF} from "sw-legion-data/lib/types/ldf";
import {Army, Faction, SlotKey, Unit} from "sw-legion-data/lib/types";
import {loadArmy, pointsForUnit} from "./unit";
import {allUnits} from "sw-legion-data/lib/units";
import {allUpgrades} from "sw-legion-data/lib/upgrades";
import {keyFromSlot} from "./convert";

const stringToUnits = (s: string): UnitLDF[] => {
    // https://tabletopadmiral.com/listbuilder/Galactic%20Republic/p62uEMue8uEMp29uEMu66uEMuEMp38u01uEMp25uEMuEMuEMuEMp25uEMuEMuEMuEMp25uEMuc2uEMuEMuEMp25uEMuc1uEMuEMc08

    let result: UnitLDF[] = []

    // let num = parseInt(s.slice(0, 1))
    //
    // let unitString = s.slice(1,3)
    //
    // // Remove empty upgrade slots, noted by '0'
    // let upgradesString = s.slice(3, s.length).replace(/0/g, "");
    //
    // // console.log("s: " + s + ` unitString: ${unitString} upgradesString: ${upgradesString}`);
    //
    // // split upgrades by 2 characters each
    // let upgradeLDFs = upgradesString.match(/.{1,2}/g) || []
    //
    // // let foo: Unit[] = allUnits;
    // let unit: Unit | undefined = allUnits.find(u => u.ldf == unitString)
    // if (unit) {
    //     let unitLdf = <UnitLDF>{
    //         ldf: unit.ldf,
    //         rank: unit.rank,
    //         points: unit.points
    //     }
    //
    //     const parsedUpgrades: { [key in SlotKey]?: string[] } = {};
    //
    //     upgradeLDFs.forEach(ldf => {
    //         let slotKey: SlotKey = 'armament' // default
    //         let foundUpgrade = allUpgrades.find(u => u.ldf === ldf);
    //         if (foundUpgrade) {
    //             slotKey = keyFromSlot(foundUpgrade.slot);
    //         }
    //         if (!parsedUpgrades[slotKey]) {
    //             parsedUpgrades[slotKey] = [];
    //         }
    //
    //         // @ts-ignore
    //         parsedUpgrades[slotKey].push(ldf);
    //     });
    //
    //     unitLdf.upgrades = parsedUpgrades;
    //
    //     for (var i=0; i<num; i++) {
    //         result.push(unitLdf)
    //     }
    // }
    return result;
}

// https://tabletopadmiral.com/listbuilder/Galactic%20Republic/p62uEMue8uEMp29uEMu66uEMuEMp38u01uEMp25uEMuEMuEMuEMp25uEMuEMuEMuEMp25uEMuc2uEMuEMuEMp25uEMuc1uEMuEMc08
// https://tabletopadmiral.com/listbuilder/Empire/p03uEMuEMuEMc08
// https://tabletopadmiral.com/listbuilder/Separatist%20Alliance/p5euEMuEMuEMuEMc08
// https://tabletopadmiral.com/listbuilder/Rebel/p0buEMuEMuEMc08
const ttaFaction = (faction: String): Faction => {
    switch (faction) {
        case 'Rebel': return 'rebel';
        case 'Empire': return 'imperial';
        case 'Separatist%20Alliance': return 'separatist';
        case 'Galactic%20Republic': return 'republic';
        default: return 'rebel';
    }
}

export const ttaToArmy = (faction: string, tta: string): Army | undefined => {
    const uS: UnitLDF[] = [];

    // let strings = legionhq.split(",");
    // let unitStrings = strings.filter(s => s.length > 2)
    // // let commandStrings = strings.filter(s => s.length == 2)
    // if (unitStrings.length < 0) {
    //     return undefined;
    // } else {
    //     unitStrings.forEach(u => {
    //         let ldfs = stringToUnits(u)
    //         if (ldfs) {
    //             ldfs.forEach(ldf => uS.push(ldf))
    //         }
    //     })
    // }

    let armyPoints = uS.map(u => pointsForUnit(u)).reduce((s, p) => s + p, 0);

    let factionFixed: Faction = ttaFaction(faction);

    let armyLDF = <ArmyLDF>{
        points: armyPoints,
        faction: factionFixed,
        commander: uS.filter(u => u.rank == "Commander"),
        operative: uS.filter(u => u.rank == "Operative"),
        corps: uS.filter(u => u.rank == "Corps"),
        special: uS.filter(u => u.rank == "Special Forces"),
        support: uS.filter(u => u.rank == "Support"),
        heavy: uS.filter(u => u.rank == "Heavy"),
    };

    return loadArmy(armyLDF)
}