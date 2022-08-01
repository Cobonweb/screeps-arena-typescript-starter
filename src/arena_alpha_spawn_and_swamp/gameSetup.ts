import { ATTACK, CARRY, MOVE, RANGED_ATTACK, TOUGH } from "game/constants";
import { CreepRoles, SpawnEntry } from "./creepTypes";

/* ------ This const is used to determine spawning amount and priority. ----- */
// Priority; 1 is highest priority
// Amount; set to 0 to disable spawn of that role
export const creepsToSpawn: SpawnEntry[] = [
  {
    role: CreepRoles.hauler,
    amountToSpawn: 1,
    spawnPriority: 1,
    bodyComposition: [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]
  },
  {
    role: CreepRoles.defender,
    amountToSpawn: 0,
    spawnPriority: 2,
    bodyComposition: [RANGED_ATTACK, RANGED_ATTACK, TOUGH]
  },
  {
    role: CreepRoles.sapper,
    amountToSpawn: 10,
    spawnPriority: 3,
    bodyComposition: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE]
  }
];
