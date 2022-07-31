import { ATTACK, BodyPartConstant, CARRY, MOVE, RANGED_ATTACK, TOUGH, WORK } from "game/constants";
import { Creep, StructureSpawn } from "game/prototypes";
import { CreepRoles, SpawnEntry } from "./creepTypes";

import { creepsToSpawn } from "./gameSetup";
import { getObjectsByPrototype } from "game/utils";

export function spawnManager() {
  const mySpawns = getObjectsByPrototype(StructureSpawn);
  const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

  // create an inventory of all current creep roles.
  const currentCreepRoles = myCreeps.map(element => element.role);

  // Spawn desired creep
  const desiredCreep = creepsToSpawn.find(x => x.role === creepRoleToSpawn(currentCreepRoles, creepsToSpawn));
  if (desiredCreep === undefined) {
    return;
  }
  for (const spawn of mySpawns) {
    const spawningCreep = spawn.spawnCreep(desiredCreep?.bodyComposition).object;
    if (spawningCreep !== undefined) {
      spawningCreep.role = desiredCreep.role;
    }
  }
}

function creepRoleToSpawn(currentRoles: CreepRoles[], requiredRoles: SpawnEntry[]) {
  // Iterate through creepsToSpawn with priority sorterd.
  // let creepRoleToSpawn:CreepRoles;
  if (currentRoles === undefined) {
    return undefined;
  }
  if (requiredRoles === undefined) {
    return undefined;
  }

  requiredRoles.sort((a, b) => a.spawnPriority - b.spawnPriority);
  for (const entry of requiredRoles) {
    // count requested vs. current roles
    if (currentRoles.filter(a => a === entry.role).length < entry.amountToSpawn) {
      return entry.role;
    }
  }

  return undefined;
}
