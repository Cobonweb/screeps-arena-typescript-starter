import { Creep, StructureSpawn } from "game/prototypes";
import { findClosestByPath, getObjectsByPrototype, getRange } from "game/utils";

import { ERR_NOT_IN_RANGE } from "game/constants";
import { creepWorkingStates } from "./creepTypes";

// Creep that stays around spawn and attacks enemy creeps that get too close.
export function defender(creep: Creep) {
  const mySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => spawn.my);

  if (mySpawn === undefined) {
    console.log("No spawn to defend!");
    return;
  }

  const enemyCreepsInRange = getObjectsByPrototype(Creep).filter(c => !c.my && getRange(c, mySpawn) < 8);
  console.log(`${enemyCreepsInRange.length} enemies in range!`);

  if (creep.workingState === undefined) {
    creep.workingState = creepWorkingStates.Idle;
  }

  // Wait for enemies to enter circle of engagement around spawn
  if (creep.workingState === creepWorkingStates.Idle) {
    // Stay in range of spawn
    if (getRange(creep, mySpawn) > 8) {
      creep.moveTo(mySpawn);
    }
    // Search for enemies in range of spawn
    if (enemyCreepsInRange.length > 0) {
      creep.workingState = creepWorkingStates.AttackingEnemy;
      console.log("Enemies in range, attacking");
    }
  }

  if (creep.workingState === creepWorkingStates.AttackingEnemy) {
    if (enemyCreepsInRange.length === 0) {
      creep.workingState = creepWorkingStates.Idle;
      console.log("No more enemies");
      return;
    }
    const closestEnemy = findClosestByPath(creep, enemyCreepsInRange);

    if (creep.rangedAttack(closestEnemy) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestEnemy);
    }
  }
}
