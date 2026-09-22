import type { SquadProfile } from '@/lib/schemas/squad';

export function PlayerCardMedia({ player, large = false }: { player: SquadProfile; large?: boolean }) {
  return (
    <div className={`player-art ${large ? 'player-art-large' : ''}`} data-position={player.position} aria-hidden="true">
      <div className="player-art-stripes" />
      <div className="player-art-orbit" />
      <span className="player-art-number">{String(player.number).padStart(2, '0')}</span>
      <span className="player-art-caption">BLAU / GRANA</span>
      <span className="player-art-edition">24—25</span>
    </div>
  );
}
