import { useEffect, useRef, useState } from 'react';
import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US';

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

import './univers-sheet.css'

interface UniverSheetProps {
  className?: string;
}

const championsLeagueTeams = [
  ["Équipe", "Pays", "Ville", "Stade"],
  ["Real Madrid", "Espagne", "Madrid", "Santiago Bernabéu"],
  ["Bayern Munich", "Allemagne", "Munich", "Allianz Arena"],
  ["Manchester City", "Angleterre", "Manchester", "Etihad Stadium"],
  ["Paris Saint-Germain", "France", "Paris", "Parc des Princes"],
  ["AC Milan", "Italie", "Milan", "San Siro"],
  ["Liverpool", "Angleterre", "Liverpool", "Anfield"],
  ["Borussia Dortmund", "Allemagne", "Dortmund", "Signal Iduna Park"],
  ["FC Barcelona", "Espagne", "Barcelone", "Camp Nou"]
];

export const UniverSheet = ({ className }: UniverSheetProps) => {
  const univerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const { univerAPI } = createUniver({
        locale: LocaleType.EN_US,
        locales: {
          enUS: merge({}, UniverPresetSheetsCoreEnUS),
        },
        theme: defaultTheme,
        presets: [
          UniverSheetsCorePreset({
            container: containerRef.current,
            toolbar: false,
            header: false,
            footer: false,
            contextMenu: false,
          }),
        ],
      });

      univerRef.current = univerAPI;
      univerAPI.createUniverSheet({ name: 'Champions League Teams' });
      
    }
  }, []);

  const handleFillData = () => {
    const univerAPI = univerRef.current;
    if (!univerAPI) return;

    const workbook = univerAPI.getActiveWorkbook();
    const worksheet = workbook?.getActiveSheet();
    const range = worksheet?.getRange(0, 0, championsLeagueTeams.length, championsLeagueTeams[0].length);

    range?.setValues(championsLeagueTeams);

    for (let i = 0; i < championsLeagueTeams[0].length; i++) {
      worksheet.autoResizeColumn(i)
    }
  };

  const handleClearData = () => {
    const univerAPI = univerRef.current;
    if (!univerAPI) return;

    const workbook = univerAPI.getActiveWorkbook();
    const worksheet = workbook?.getActiveSheet();

    // Créer un tableau 2D vide de la même taille que championsLeagueTeams
    const emptyData = Array(championsLeagueTeams.length).fill(null)
      .map(() => Array(championsLeagueTeams[0].length).fill(""));

    const range = worksheet?.getRange(0, 0, championsLeagueTeams.length, championsLeagueTeams[0].length);

    range?.setValues(emptyData);
  };

  return (
    <div className={`univer-container ${className ?? ''}`}>
      <div className="controls">
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Masquer' : 'Afficher'} la feuille
        </button>
        <button onClick={handleFillData}>Remplir les données</button>
        <button onClick={handleClearData}>Effacer les données</button>
      </div>
      <div
        ref={containerRef}
        className={`sheet-content ${isVisible ? 'visible' : 'hidden'}`}
      />
    </div>
  );
};