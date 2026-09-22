import type { PlayerPosition } from '@/data/types';

export type SquadFilter = 'All' | PlayerPosition;
const filters: { value: SquadFilter; label: string }[] = [
  { value: 'All', label: 'All' }, { value: 'Goalkeeper', label: 'Goalkeepers' },
  { value: 'Defender', label: 'Defenders' }, { value: 'Midfielder', label: 'Midfielders' },
  { value: 'Forward', label: 'Forwards' },
];

export function SquadFilters({ selected, onChange }: { selected: SquadFilter; onChange: (value: SquadFilter) => void }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-5" role="group" aria-label="Filter players by position">
      {filters.map(({ value, label }) => (
        <button key={value} type="button" aria-pressed={selected === value} aria-controls="squad-grid" onClick={() => onChange(value)} className="squad-filter">
          {label}
        </button>
      ))}
    </div>
  );
}
