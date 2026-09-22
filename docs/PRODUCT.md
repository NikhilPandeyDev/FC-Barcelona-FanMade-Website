# FC Barcelona Fan Experience — Product Documentation

## 1. Product Vision & Philosophy

**"Més que un club" in a modern, cinematic digital medium.**

The FC Barcelona Fan Experience is an unofficial, fan-made interactive web platform engineered to deliver the feeling of an elite football broadcast, a luxury editorial sports magazine, and an interactive digital museum.

### Core Pillars
1. **Cinematic Storytelling**: Moving beyond flat web cards into high-impact typography, dramatic imagery, motion choreography, and ambient lighting.
2. **Tactical & Analytical Depth**: Providing modern football enthusiasts with clean, readable data visualizations, xG breakdowns, passing networks, and radar profiles.
3. **Living Heritage**: Seamlessly connecting the 1899 origins, the Cruyff revolution, the Guardiola sextuple era, and the modern La Masia renaissance.
4. **Authentic Fan Culture**: Celebrating the global Culér community with interactive matchday vibes, anthem/chant audio moments, and match ratings.

---

## 2. Information Architecture & Target Routes

| Route | Name | Purpose & Content |
| :--- | :--- | :--- |
| `/` | **Home** | Editorial narrative journey connecting identity, next match countdown, squad highlights, tactical stats teaser, historical timeline, Spotify Camp Nou transformation, and fan community. |
| `/squad` | **Squad Hub** | Complete first team roster with tactical position groupings (Goalkeepers, Defenders, Midfielders, Forwards), player filter, La Masia badges, and key metrics. |
| `/squad/[slug]` | **Player Detail** | Deep-dive profile featuring biography, seasonal statistics, radar chart, career highlights, and jersey typography showcase. |
| `/matches` | **Matches & Schedule** | Season calendar, La Liga & Champions League fixtures, detailed past match results, and broadcast guide. |
| `/matches/[id]` | **Match Center** | Interactive match timeline, live/post-match stats, xG flow, starting XI pitch visualizer, and player ratings. |
| `/stats` | **Analytics Hub** | Team-wide analytics, possession metrics, attacking heatmaps, shot conversion rates, and comparative player radars. |
| `/history` | **History & Eras** | Interactive timeline traversing foundational eras (1899 Founding, 1974 Cruyff, 1992 Dream Team, 2009 Sextuple, 2015 Treble, 2024 New Era). |
| `/legends` | **Hall of Legends** | Tribute showcase to iconic figures (Johan Cruyff, Lionel Messi, Ronaldinho, Andrés Iniesta, Xavi Hernández, Pep Guardiola, etc.). |
| `/trophies` | **Trophy Room** | 3D-feeling interactive museum showcasing the club's silverware (5 Champions Leagues, 27 La Ligas, 31 Copas del Rey, 3 Club World Cups). |
| `/stadium` | **Spotify Camp Nou** | Architectural journey through the historic ground and the cutting-edge Espai Barça redevelopment. |
| `/fan-zone` | **Fan Zone & Chants** | Culér community zone, Cant del Barça lyrics & audio player, matchday predictions, and downloadable wallpapers. |

---

## 3. User Personas & Scenarios

- **The Analytical Culé**: Wants granular match breakdown, xG progression, tactical line-ups, and player performance ratings.
- **The Romantic Historian**: Explores the legacy of Cruyffian positional play, trophy triumphs, and historic match archives.
- **The Matchday Follower**: Checks kickoff times, countdowns, broadcast channels, and starting lineups before kickoff.
- **The Global Supporter**: Seeks an emotionally resonant connection to the club's culture, anthem, and latest prodigies from La Masia.

---

## 4. Content Guidelines

- **Factual Rigor**: Real statistics, actual match dates, authentic trophy counts, and verified player numbers.
- **Tone of Voice**: Sophisticated, passionate, respectful, editorial, and proud (*Orgull Blaugrana*).
- **Disclaimer**: Prominently states: *"Unofficial fan experience. Not affiliated with, endorsed by, or sponsored by FC Barcelona or its official partners."*
