import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants";
import { Creep, Source, StructureSpawn } from "game/prototypes";
import { findClosestByPath, getObjectsByPrototype } from "game/utils";
import { creepWorkingStates } from "./creepDeclarations";

export function hauler(creep: Creep) {
  // Initialize working state
  if (creep.workingState === undefined) {
    creep.workingState = creepWorkingStates.RetreivingEnergy;
  }

  // Pickup energy
  if (creep.workingState == creepWorkingStates.RetreivingEnergy) {
    //Harvest at closest source
    let mySources = getObjectsByPrototype(Source);

    let closestSource = findClosestByPath(creep, mySources);
    if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSource);
    }
    //Switch to dropOff state when store is full of energy
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
      //console.log(`Creep${creep.id} is full of energy, dropping it off!`);
      creep.workingState = creepWorkingStates.DropingOffAtSpawn;
    }
  }
  // Dropoff energy
  if (creep.workingState == creepWorkingStates.DropingOffAtSpawn) {
    let closestSpawn = findClosestByPath(creep, getObjectsByPrototype(StructureSpawn));
    if (creep.transfer(closestSpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSpawn);
    }
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
      //console.log(`Creep${creep.id} is finsihed with drop off, picking up energy`);
      creep.workingState = creepWorkingStates.RetreivingEnergy;
    }
  }
}
