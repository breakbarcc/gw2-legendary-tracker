import type { LegendaryWeaponRecommendation } from '@/types/gw2-api';

export interface TransferOption {
  id: number;
  name: string;
}

export interface TransferEntry {
  /** Unique stable key — used as dnd-kit id */
  id: string;
  weaponType: string;
  impact: number;
  recIcon: string | undefined;
  availableOptions: TransferOption[];
  selectedId: number;
  /** True if a weapon of this type is already present in Glint's Prophecy. */
  alreadyInRoadmap: boolean;
  /** Whether this entry is included in the transfer. Defaults to false when alreadyInRoadmap. */
  enabled: boolean;
}

export type ImportMode = 'append' | 'overwrite';

export interface TransferToProphecyModalProps {
  apiKey: string;
  recommendations: LegendaryWeaponRecommendation[];
  onClose: () => void;
  onTransferred: () => void;
}
