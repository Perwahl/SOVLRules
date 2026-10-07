import game from '../data/game.json';

export interface ModelType {
  id: string;
  name: string;
  baseWidth: number;
  baseDepth: number;
  movement?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface ArmySize { id: string; name: string; points: number; maxUnits: number }

export const MODEL_TYPES: ModelType[] = game.modelTypes as ModelType[];
export const ARMY_SIZES: ArmySize[] = game.armySizes as ArmySize[];
export const GAME_VERSION: string = game.gameVersion;

export function modelType(id: string): ModelType | undefined {
  return MODEL_TYPES.find((m) => m.id === id);
}

/** Inches, printed without a trailing .0 */
export function inches(n: number | undefined): string {
  if (!n) return '0"';
  return `${Number.isInteger(n) ? n : n.toFixed(1)}"`;
}
