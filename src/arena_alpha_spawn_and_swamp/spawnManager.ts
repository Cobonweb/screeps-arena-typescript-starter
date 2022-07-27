import { ATTACK, CARRY, MOVE, RANGED_ATTACK, TOUGH, WORK } from "game/constants";
import { Creep, StructureSpawn } from "game/prototypes";

import { CreepRoles } from "./creepTypes";
import { getObjectsByPrototype } from "game/utils";

export function spawnManager() {
  const mySpawns = getObjectsByPrototype(StructureSpawn);
  const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

  // create an inventory of all current creep roles.
  const currentCreepRoles = myCreeps.map(element => element.role);

  // === Haulers ===
  for (const spawn of mySpawns) {
    if (currentCreepRoles.filter(x => x === CreepRoles.hauler).length < 2) {
      const spawningCreep = spawn.spawnCreep([MOVE, MOVE, CARRY]).object; // returns reference to spawing creep for first tick of spawning sequence
      if (spawningCreep !== undefined) {
        spawningCreep.role = CreepRoles.hauler;
      }
    }
  }
  // === Defenders ===
  for (const spawn of mySpawns) {
    if (myCreeps.length > 1) {
      if (currentCreepRoles.filter(x => x === CreepRoles.defender).length < 2) {
        const spawningCreep = spawn.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, TOUGH]).object; // returns reference to spawing creep for first tick of spawning sequence
        if (spawningCreep !== undefined) {
          spawningCreep.role = CreepRoles.defender;
        }
      }
    }
  }
  // === Sappers ===
  for (const spawn of mySpawns) {
    if (myCreeps.length > 3) {
      if (currentCreepRoles.filter(x => x === CreepRoles.sapper).length < 10) {
        const spawningCreep = spawn.spawnCreep([MOVE, MOVE, ATTACK, TOUGH]).object; // returns reference to spawing creep for first tick of spawning sequence
        if (spawningCreep !== undefined) {
          spawningCreep.role = CreepRoles.sapper;
        }
      }
    }
  }
}
