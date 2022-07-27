import { CARRY, MOVE, RANGED_ATTACK, TOUGH, WORK } from "game/constants";
import { Creep, StructureSpawn } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";
import { CreepRoles, creepWorkingStates } from "./creepDeclarations";

export function spawnManager() {
  const mySpawns = getObjectsByPrototype(StructureSpawn);
  const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

  // create an inventory of all current creep roles.
  let currentCreepRoles = myCreeps.map(element => element.role);

  // === Haulers ===
  for (let spawn of mySpawns) {
    if (currentCreepRoles.filter(x => x == CreepRoles.hauler).length < 2) {
      const spawningCreep = spawn.spawnCreep([MOVE, WORK, WORK, WORK, CARRY]).object; //returns reference to spawing creep for first tick of spawning sequence
      if (spawningCreep !== undefined) {
        spawningCreep.role = CreepRoles.hauler;
      }
    }
  }
  // === Defenders ===
  for (let spawn of mySpawns) {
    if (myCreeps.length > 1) {
      if (currentCreepRoles.filter(x => x == CreepRoles.defender).length < 4) {
        const spawningCreep = spawn.spawnCreep([MOVE, MOVE, RANGED_ATTACK, TOUGH]).object; //returns reference to spawing creep for first tick of spawning sequence
        if (spawningCreep !== undefined) {
          spawningCreep.role = CreepRoles.defender;
        }
      }
    }
  }
}
