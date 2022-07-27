import { creepManager } from "./creepManager";
import { spawnManager } from "./spawnManager";

export function loop(): void {
  spawnManager();
  creepManager();
}
