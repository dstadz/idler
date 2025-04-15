export interface BuildingStats {
  health: number;
  production: number;
  storage: number;
  defense: number;
}

export interface Building {
  id: string;
  name: string;
  type: 'farm' | 'mine' | 'lumberMill' | 'barracks' | 'house';
  stats: BuildingStats;
  position: { x: number; y: number };
  level: number;
  isSelected: boolean;
  constructionProgress?: number;
}

export const BUILDING_TYPES = {
  farm: {
    name: 'Farm',
    baseStats: {
      health: 200,
      production: 10,
      storage: 100,
      defense: 5,
    },
    emoji: '🌾',
    description: 'Produces food for your settlement',
  },
  mine: {
    name: 'Mine',
    baseStats: {
      health: 250,
      production: 8,
      storage: 150,
      defense: 8,
    },
    emoji: '⛏️',
    description: 'Extracts stone and minerals',
  },
  lumberMill: {
    name: 'Lumber Mill',
    baseStats: {
      health: 180,
      production: 12,
      storage: 120,
      defense: 5,
    },
    emoji: '🪵',
    description: 'Processes wood from nearby forests',
  },
  barracks: {
    name: 'Barracks',
    baseStats: {
      health: 300,
      production: 0,
      storage: 200,
      defense: 15,
    },
    emoji: '🏰',
    description: 'Trains and houses military units',
  },
  house: {
    name: 'House',
    baseStats: {
      health: 150,
      production: 0,
      storage: 50,
      defense: 3,
    },
    emoji: '🏠',
    description: 'Provides living space for your workers',
  },
};
