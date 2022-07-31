import { ATTACK, BodyPartConstant, CARRY, MOVE, RANGED_ATTACK, TOUGH } from "game/constants";

export const enum creepWorkingStates {
  RetreivingEnergy,
  DropingOffAtSpawn,
  AttackingSpawn,
  AttackingEnemy,
  RetreatingFromEnemy,
  Idle
}

export interface SpawnEntry {
  role: CreepRoles;
  spawnPriority: number;
  amountToSpawn: number;
  bodyComposition: BodyPartConstant[];
}
export const enum CreepRoles {
  hauler,
  defender,
  sapper
}

declare module "game/prototypes" {
  interface Creep {
    role: CreepRoles;
    workingState: creepWorkingStates;
  }
}
