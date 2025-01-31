import { IconFileImport } from '@tabler/icons-react';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SupportedExportFormats } from '@/types/export';
import { SidebarButton } from '../Sidebar/SidebarButton';
import * as Papa from 'papaparse';

interface Props {
  onImport: (data: SupportedExportFormats) => void;
}

export async function processData(parsedData: JSON, filename: string) {
  const body = JSON.stringify({
    data: parsedData,
    filename,
  });

  await fetch('/api/controllers/dataController', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');
  return (
    <>
      <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".csv, .json"
        onChange={(e) => {
          if (!e.target.files?.length) return;
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            let parsedData;
            if (file.type === "text/csv") {
              const csvData = e.target?.result as string;
              parsedData = Papa.parse(csvData);
            } else {
              parsedData = JSON.parse(e.target?.result as string);
            };
            // process data here
            processData(parsedData, file.name);
          };
          reader.readAsText(file);
        }}
      />
      <SidebarButton
        text={t('Import data')}
        icon={<IconFileImport size={18} />}
        onClick={() => {
          const importFile = document.querySelector(
            '#import-file',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
        }}
      />
    </>
  );
};
