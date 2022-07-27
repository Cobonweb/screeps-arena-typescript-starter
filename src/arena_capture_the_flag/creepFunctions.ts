import { Creep } from "game/prototypes";

Creep.prototype.say = function () {
  const creep = this;
  console.log(`Creep ${this.id} says hi!`);
  return true;
};
