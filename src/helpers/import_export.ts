import { Army } from "sw-legion-data/lib/types";
import { slotKeys } from "./enums";
import { armyUnits } from "./unit";

export const exportAsText = (army: Army) => {
  let units = armyUnits(army);
  let text = `${army.points}/800 ${units.length} activations\n`;

  units.map(unit => {
    text += `\n(${unit.pointsWithUpgrades}) ${unit.name}`;

    slotKeys.forEach(key => {
      const up = unit.upgrades && unit.upgrades[key];
      if (up) {
        up.forEach(u => {
          text += ` + ${u.name}`;
        });
      }
    });
  });

  return text;
  // Clipboard.setString(text);
  // Alert.alert('Text Exported', 'All data has been copied to your clipboard');
};

