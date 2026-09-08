import { useTranslation } from 'react-i18next';
import type { WeaponChoice } from '@/hooks/useGen1WeaponCards.ts';
import type { WeaponType } from '@/types/gw2-api';
import { WeaponCard } from './WeaponCard';

export interface SlotRowProps {
  slotIndex: number;
  totalSlots: number;
  /** The legendary item ID chosen for this slot, or null if unassigned. */
  choice: number | null;
  weaponChoices: WeaponChoice[];
  unlockedItemIds: Set<number>;
  partiallyCoveredWeaponTypes: Set<WeaponType>;
  coveredWeaponTypes: Set<WeaponType>;
  disabled?: boolean;
  onChange: (legendaryId: number | null) => void;
}

export function SlotRow({
  slotIndex,
  totalSlots,
  choice,
  weaponChoices,
  unlockedItemIds,
  partiallyCoveredWeaponTypes,
  coveredWeaponTypes,
  disabled = false,
  onChange,
}: SlotRowProps) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: 'rgba(20,16,28,0.6)',
        borderRadius: 8,
        border: '1px solid rgba(147,73,204,0.1)',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {!disabled && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#4a4458',
          }}
        >
          {t('starterKits.slotLabel', { index: slotIndex, total: totalSlots })}
        </span>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
          gap: 8,
        }}
      >
        {weaponChoices.map(({ weaponType, card }) => (
          <WeaponCard
            key={card.id}
            weaponType={weaponType}
            cardInfo={card}
            isSelected={choice === card.id}
            isItemOwned={unlockedItemIds.has(card.id)}
            isPartiallyCovered={partiallyCoveredWeaponTypes.has(weaponType)}
            isTypeCovered={coveredWeaponTypes.has(weaponType)}
            disabled={disabled}
            onSelect={() => onChange(choice === card.id ? null : card.id)}
          />
        ))}
      </div>
    </div>
  );
}
