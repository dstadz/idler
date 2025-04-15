import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { Building, BUILDING_TYPES } from '@/types/building';
import { generateId } from '@/utils/id';

// Atom to store all buildings
export const buildingsAtom = atom<Building[]>([]);

// Atom to store the selected building ID
export const selectedBuildingIdAtom = atom<string | null>(null);

export function useBuilding() {
  const [buildings, setBuildings] = useAtom(buildingsAtom);
  const [selectedBuildingId, setSelectedBuildingId] = useAtom(selectedBuildingIdAtom);

  // Get a building by ID
  const getBuilding = useCallback((id: string) => {
    return buildings.find(building => building.id === id);
  }, [buildings]);

  // Get the currently selected building
  const selectedBuilding = selectedBuildingId ? getBuilding(selectedBuildingId) : null;

  // Create a new building
  const createBuilding = useCallback((type: keyof typeof BUILDING_TYPES, position: { x: number; y: number }) => {
    const newBuilding: Building = {
      id: generateId(),
      type,
      name: BUILDING_TYPES[type].name,
      level: 1,
      position,
      stats: { ...BUILDING_TYPES[type].baseStats },
      isSelected: false,
      constructionProgress: 0,
    };
    setBuildings(prev => [...prev, newBuilding]);
    return newBuilding;
  }, [setBuildings]);

  // Update a building
  const updateBuilding = useCallback((id: string, updates: Partial<Building>) => {
    setBuildings(prev => prev.map(building =>
      building.id === id ? { ...building, ...updates } : building
    ));
  }, [setBuildings]);

  // Delete a building
  const deleteBuilding = useCallback((id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    if (selectedBuildingId === id) {
      setSelectedBuildingId(null);
    }
  }, [setBuildings, selectedBuildingId, setSelectedBuildingId]);

  // Select a building
  const selectBuilding = useCallback((id: string | null) => {
    setSelectedBuildingId(id);
    setBuildings(prev => prev.map(building => ({
      ...building,
      isSelected: building.id === id
    })));
  }, [setSelectedBuildingId, setBuildings]);

  // Level up a building
  const levelUpBuilding = useCallback((id: string) => {
    const building = getBuilding(id);
    if (!building) return;

    const newLevel = building.level + 1;
    const levelMultiplier = 1 + (newLevel - 1) * 0.1; // 10% increase per level

    updateBuilding(id, {
      level: newLevel,
      stats: {
        health: Math.floor(BUILDING_TYPES[building.type].baseStats.health * levelMultiplier),
        production: Math.floor(BUILDING_TYPES[building.type].baseStats.production * levelMultiplier),
        storage: Math.floor(BUILDING_TYPES[building.type].baseStats.storage * levelMultiplier),
        defense: Math.floor(BUILDING_TYPES[building.type].baseStats.defense * levelMultiplier),
      }
    });
  }, [getBuilding, updateBuilding]);

  // Update construction progress
  const updateConstructionProgress = useCallback((id: string, progress: number) => {
    updateBuilding(id, { constructionProgress: progress });
  }, [updateBuilding]);

  return {
    buildings,
    selectedBuilding,
    getBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    selectBuilding,
    levelUpBuilding,
    updateConstructionProgress,
  };
}
