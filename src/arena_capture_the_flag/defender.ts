import { ERR_NOT_IN_RANGE } from "game/constants";
import { Creep, StructureSpawn } from "game/prototypes";
import { findClosestByPath, findInRange, getObjectsByPrototype, getRange } from "game/utils";
import { creepWorkingStates } from "./creepDeclarations";

// Creep that stays around spawn and attacks enemy creeps that get too close.
export function defender(creep: Creep) {
  let mySpawn = getObjectsByPrototype(StructureSpawn).find(spawn => spawn.my);

  if (mySpawn === undefined) {
    console.log("No spawn to defend!");
    return;
  }

  let enemyCreepsInRange = getObjectsByPrototype(Creep).filter(
    creep => !creep.my && getRange(creep, mySpawn as StructureSpawn) < 8
  );
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
    if (enemyCreepsInRange.length == 0) {
      creep.workingState = creepWorkingStates.Idle;
      console.log("No more enemies");
      return;
    }
    let closestEnemy = findClosestByPath(creep, enemyCreepsInRange);

    console.log(`Creep${creep.id} is attacking enemie ${closestEnemy} ok?`);
    if (creep.rangedAttack(closestEnemy) == ERR_NOT_IN_RANGE) {
      creep.moveTo(closestEnemy);
    }
  }
}
