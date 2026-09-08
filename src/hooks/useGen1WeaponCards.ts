import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getStarterKitWeaponChoices } from '@/utils/starterKits';
import type { WeaponChoice } from '@/utils/gen1WeaponCards';

export type { WeaponCardInfo, WeaponChoice } from '@/utils/gen1WeaponCards';

export function useGen1WeaponCards(): {
  getWeaponChoicesForKit: (kitId: number) => WeaponChoice[];
} {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('de') ? 'de' : 'en';
  const getWeaponChoicesForKit = useCallback(
    (kitId: number) => getStarterKitWeaponChoices(kitId, lang),
    [lang]
  );
  return { getWeaponChoicesForKit };
}
