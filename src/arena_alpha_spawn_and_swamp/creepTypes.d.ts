export const enum creepWorkingStates {
  RetreivingEnergy,
  DropingOffAtSpawn,
  AttackingSpawn,
  AttackingEnemy,
  RetreatingFromEnemy,
  Idle
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
