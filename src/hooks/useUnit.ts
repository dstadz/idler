import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { Unit, UNIT_TYPES } from '@/types/unit';
import { generateId } from '@/utils/id';

// Atom to store all units
export const unitsAtom = atom<Unit[]>([]);

// Atom to store the selected unit ID
export const selectedUnitIdAtom = atom<string | null>(null);

export function useUnit() {
  const [units, setUnits] = useAtom(unitsAtom);
  const [selectedUnitId, setSelectedUnitId] = useAtom(selectedUnitIdAtom);

  // Get a unit by ID
  const getUnit = useCallback((id: string) => {
    return units.find(unit => unit.id === id);
  }, [units]);

  // Get the currently selected unit
  const selectedUnit = selectedUnitId ? getUnit(selectedUnitId) : null;

  // Create a new unit
  const createUnit = useCallback((type: keyof typeof UNIT_TYPES, position: { x: number; y: number }) => {
    const newUnit: Unit = {
      id: generateId(),
      type,
      name: UNIT_TYPES[type].name,
      level: 1,
      position,
      stats: { ...UNIT_TYPES[type].baseStats },
      isSelected: false,
      experience: 0,
      targetPosition: null,
    };
    setUnits(prev => [...prev, newUnit]);
    return newUnit;
  }, [setUnits]);

  // Update a unit
  const updateUnit = useCallback((id: string, updates: Partial<Unit>) => {
    setUnits(prev => prev.map(unit =>
      unit.id === id ? { ...unit, ...updates } : unit
    ));
  }, [setUnits]);

  // Delete a unit
  const deleteUnit = useCallback((id: string) => {
    setUnits(prev => prev.filter(unit => unit.id !== id));
    if (selectedUnitId === id) {
      setSelectedUnitId(null);
    }
  }, [setUnits, selectedUnitId, setSelectedUnitId]);

  // Select a unit
  const selectUnit = useCallback((id: string | null) => {
    setSelectedUnitId(id);
    setUnits(prev => prev.map(unit => ({
      ...unit,
      isSelected: unit.id === id
    })));
  }, [setSelectedUnitId, setUnits]);

  // Level up a unit
  const levelUpUnit = useCallback((id: string) => {
    const unit = getUnit(id);
    if (!unit) return;

    const newLevel = unit.level + 1;
    const levelMultiplier = 1 + (newLevel - 1) * 0.1; // 10% increase per level

    updateUnit(id, {
      level: newLevel,
      stats: {
        health: Math.floor(UNIT_TYPES[unit.type].baseStats.health * levelMultiplier),
        attack: Math.floor(UNIT_TYPES[unit.type].baseStats.attack * levelMultiplier),
        defense: Math.floor(UNIT_TYPES[unit.type].baseStats.defense * levelMultiplier),
        speed: Math.floor(UNIT_TYPES[unit.type].baseStats.speed * levelMultiplier),
        range: Math.floor(UNIT_TYPES[unit.type].baseStats.range * levelMultiplier),
      }
    });
  }, [getUnit, updateUnit]);

  // Add experience to a unit
  const addExperience = useCallback((id: string, amount: number) => {
    const unit = getUnit(id);
    if (!unit) return;

    const newExperience = unit.experience + amount;
    const experienceToLevel = 100 * unit.level; // 100 exp per level

    if (newExperience >= experienceToLevel) {
      levelUpUnit(id);
      updateUnit(id, { experience: newExperience - experienceToLevel });
    } else {
      updateUnit(id, { experience: newExperience });
    }
  }, [getUnit, levelUpUnit, updateUnit]);

  // Set unit target position
  const setUnitTarget = useCallback((id: string, target: { x: number; y: number } | null) => {
    updateUnit(id, { targetPosition: target });
  }, [updateUnit]);

  return {
    units,
    selectedUnit,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit,
    selectUnit,
    levelUpUnit,
    addExperience,
    setUnitTarget,
  };
}
