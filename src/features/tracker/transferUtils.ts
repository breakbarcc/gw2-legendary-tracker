import type { LegendaryPickerItem } from '@/features/prophecy/useAllLegendaryItems';
import type { LegendaryWeaponRecommendation } from '@/types/gw2-api';
import type { TransferEntry } from './transferTypes';

export function buildEntries(
  recommendations: LegendaryWeaponRecommendation[],
  allItems: LegendaryPickerItem[],
  roadmapWeaponTypes: Set<string> = new Set(),
): TransferEntry[] {
  return recommendations.flatMap((rec): TransferEntry[] => {
    const matching = allItems
      .filter((it) => it.itemType === 'Weapon' && it.detailType === rec.weaponType)
      .map((it) => ({ id: it.id, name: it.name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (matching.length === 0) return [];

    const alreadyInRoadmap = roadmapWeaponTypes.has(rec.weaponType);

    return [
      {
        id: rec.weaponType,
        weaponType: rec.weaponType,
        impact: rec.impact,
        recIcon: rec.icon,
        availableOptions: matching,
        selectedId: matching[0].id,
        alreadyInRoadmap,
        enabled: !alreadyInRoadmap,
      },
    ];
  });
}

/** Detail types (e.g. weapon type) of legendary weapons already present in the roadmap. */
export function getRoadmapWeaponTypes(
  steps: { item: number | null }[],
  itemsById: Map<number, LegendaryPickerItem>,
): Set<string> {
  const set = new Set<string>();
  for (const step of steps) {
    if (step.item == null) continue;
    const it = itemsById.get(step.item);
    if (it?.itemType === 'Weapon' && it.detailType) set.add(it.detailType);
  }
  return set;
}
