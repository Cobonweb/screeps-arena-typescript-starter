import { ATTACK, CARRY, MOVE, RANGED_ATTACK, TOUGH } from "game/constants";
import { CreepRoles, SpawnEntry } from "./creepTypes";

/* ------ This const is used to determine spawning amount and priority. ----- */
// Priority; 1 is highest priority
// Amount; set to 0 to disable spawn of that role
export const creepsToSpawn: SpawnEntry[] = [
  {
    role: CreepRoles.hauler,
    amountToSpawn: 4,
    spawnPriority: 1,
    bodyComposition: [MOVE, MOVE, CARRY]
  },
  {
    role: CreepRoles.defender,
    amountToSpawn: 2,
    spawnPriority: 2,
    bodyComposition: [RANGED_ATTACK, RANGED_ATTACK, TOUGH]
  },
  {
    role: CreepRoles.sapper,
    amountToSpawn: 10,
    spawnPriority: 3,
    bodyComposition: [MOVE, MOVE, ATTACK, TOUGH]
  }
];
