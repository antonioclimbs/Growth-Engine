import { IconFileImport } from '@tabler/icons-react';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { SupportedExportFormats } from '@/types/export';
import { SidebarButton } from '../Sidebar/SidebarButton';
import * as Papa from 'papaparse';
import UserController from '@/services/UserController';

interface Props {
  onImport: (data: SupportedExportFormats) => void;
}

export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');
  async function processData(prompt: string, parsedData: JSON) {
    // const parsedData = Papa.parse(csvData);

    // do something with parsed data
    console.log(parsedData);
    await UserController.testCreateController();
    // UserController.createUser('aayala381@gmail.com');
    // UserController.createPrompt('aayala381@gmail.com', prompt, parsedData)
    console.log('finished creating user and prompt')
  }
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
            processData('why?', parsedData);
          };
          reader.readAsText(file);
        }}
      />
      {/* <input
        id="import-file"
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => {
          if (!e.target.files?.length) return;

          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            let json = JSON.parse(e.target?.result as string);
            onImport(json);
          };
          reader.readAsText(file);
        }}
      /> */}

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
