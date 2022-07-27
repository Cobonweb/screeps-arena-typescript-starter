import { Creep } from "game/prototypes";
import { getObjectById, getObjectsByPrototype } from "game/utils";
import { CreepRoles } from "./creepDeclarations";
import { defender } from "./defender";
import { hauler } from "./hauler";

export function creepManager() {
  let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

  for (let creep of myCreeps) {
    if (creep.role === CreepRoles.hauler) {
      hauler(creep);
    }
    if (creep.role === CreepRoles.defender) {
      defender(creep);
    }
  }
}
