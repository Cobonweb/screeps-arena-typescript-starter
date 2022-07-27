import { Creep, StructureSpawn } from "game/prototypes";
import { findClosestByPath, getObjectsByPrototype, getRange } from "game/utils";

import { ERR_NOT_IN_RANGE } from "game/constants";
import { creepWorkingStates } from "./creepTypes";

// Creep that stays around spawn and attacks enemy creeps that get too close.
export function sapper(creep: Creep) {
  const enemySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => !spawn.my);

  if (enemySpawn === undefined) {
    console.log("No spawn to attack!");
    return;
  }

  const enemyCreeps = getObjectsByPrototype(Creep).filter(c => !c.my);
  const enemyInCloseProximity = enemyCreeps.find(c => getRange(creep, c) < 4);

  if (creep.workingState === undefined) {
    creep.workingState = creepWorkingStates.AttackingSpawn;
  }

  // Attack spawn unless an enemy creep is in short proximity.
  if (creep.workingState === creepWorkingStates.AttackingSpawn) {
    // Check for closes proximity enemies

    // Attack spawn
    if (creep.attack(enemySpawn) === ERR_NOT_IN_RANGE) {
      creep.moveTo(enemySpawn);
    }

    if (enemyInCloseProximity !== undefined) {
      creep.workingState = creepWorkingStates.AttackingEnemy;
    }
  }

  if (creep.workingState === creepWorkingStates.AttackingEnemy) {
    if (enemyInCloseProximity === undefined) {
      creep.workingState = creepWorkingStates.AttackingSpawn;
      console.log("No more enemies");
      return;
    }
    const closestEnemy = findClosestByPath(creep, enemyCreeps);

    if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestEnemy);
    }
  }
}
