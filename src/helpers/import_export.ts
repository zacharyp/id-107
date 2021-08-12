import { Army } from "sw-legion-data/lib/types";
import { slotKeys } from "./enums";
import { armyUnits } from "./unit";

export const exportAsText = (army: Army) => {
  let text = `${army.name}\n`;

  armyUnits(army).map(unit => {
    text += `\n(${unit.points}) ${unit.name}`;

    slotKeys.forEach(key => {
      const up = unit.upgrades && unit.upgrades[key];
      if (up) {
        up.forEach(u => {
          text += `\n(${u.points}) ${u.name}`;
        });
      }
    });
    text += `\nPoints: ${unit.pointsWithUpgrades}\n`;
  });

  text += `\nTotal points: ${army.points}`;
  return text;
  // Clipboard.setString(text);
  // Alert.alert('Text Exported', 'All data has been copied to your clipboard');
};

