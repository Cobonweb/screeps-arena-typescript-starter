import { Visual } from "game/visual";

export const enum creepWorkingStates {
  RetreivingEnergy,
  DropingOffAtSpawn,
  AttackingEnemy,
  RetreatingFromEnemy,
  Idle
}

export const enum CreepRoles {
  hauler,
  defender
}

declare module "game/prototypes" {
  interface Creep {
    role: CreepRoles;
    workingState: creepWorkingStates;
  }
}
