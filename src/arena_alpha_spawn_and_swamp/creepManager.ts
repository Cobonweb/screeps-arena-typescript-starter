import { Creep } from "game/prototypes";
import { CreepRoles } from "./creepTypes";
import { defender } from "./defender";
import { getObjectsByPrototype } from "game/utils";
import { hauler } from "./hauler";
import { sapper } from "./sapper";

export function creepManager() {
  const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

  for (const creep of myCreeps) {
    if (creep.role === CreepRoles.hauler) {
      hauler(creep);
    }
    if (creep.role === CreepRoles.sapper) {
      sapper(creep);
    }
    if (creep.role === CreepRoles.defender) {
      defender(creep);
    }
  }
}
