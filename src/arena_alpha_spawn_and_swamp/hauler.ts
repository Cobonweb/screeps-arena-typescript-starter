import { Creep, StructureContainer, StructureSpawn } from "game/prototypes";
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants";
import { findClosestByPath, getObjectsByPrototype } from "game/utils";

import { creepWorkingStates } from "./creepTypes";

export function hauler(creep: Creep) {
  // Initialize working state
  if (creep.workingState === undefined) {
    creep.workingState = creepWorkingStates.RetreivingEnergy;
  }

  // Pickup energy
  if (creep.workingState === creepWorkingStates.RetreivingEnergy) {
    // Harvest at closest source
    const myContainers = getObjectsByPrototype(StructureContainer);

    const closestContainer = findClosestByPath(creep, myContainers);
    if (creep.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestContainer);
    }
    // Switch to dropOff state when store is full of energy
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      // console.log(`Creep${creep.id} is full of energy, dropping it off!`);
      creep.workingState = creepWorkingStates.DropingOffAtSpawn;
    }
  }
  // Dropoff energy
  if (creep.workingState === creepWorkingStates.DropingOffAtSpawn) {
    const closestSpawn = findClosestByPath(creep, getObjectsByPrototype(StructureSpawn));
    if (creep.transfer(closestSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSpawn);
    }
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      // console.log(`Creep${creep.id} is finsihed with drop off, picking up energy`);
      creep.workingState = creepWorkingStates.RetreivingEnergy;
    }
  }
}
