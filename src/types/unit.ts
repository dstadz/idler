export interface UnitStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  range: number;
}

export interface Unit {
  id: string;
  name: string;
  type: 'worker' | 'soldier' | 'scout' | 'builder';
  stats: UnitStats;
  position: { x: number; y: number };
  level: number;
  experience: number;
  isSelected: boolean;
}

export const UNIT_TYPES = {
  worker: {
    name: 'Worker',
    baseStats: {
      health: 50,
      attack: 5,
      defense: 5,
      speed: 3,
      range: 1,
    },
    emoji: '🦫',
  },
  soldier: {
    name: 'Soldier',
    baseStats: {
      health: 100,
      attack: 15,
      defense: 10,
      speed: 2,
      range: 1,
    },
    emoji: '🐦‍🔥',
  },
  scout: {
    name: 'Scout',
    baseStats: {
      health: 40,
      attack: 8,
      defense: 5,
      speed: 4,
      range: 2,
    },
    emoji: '🐆',
  },
  builder: {
    name: 'Builder',
    baseStats: {
      health: 60,
      attack: 5,
      defense: 8,
      speed: 2,
      range: 1,
    },
    emoji: '🏗️',
  },
};
