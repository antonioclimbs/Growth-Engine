import { IconGraph } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { useState } from 'react';
import { Prompt } from '@/types/prompt';
import { useCreateReducer } from '@/hooks/useCreateReducer';

// interface Props {
//   message: string
// prompt: Prompt;
// onClose: () => void;
// onUpdatePrompt: (prompt: Prompt) => void;
// }

/*
export const Import: FC<Props> = ({ onImport }) => {
  const { t } = useTranslation('sidebar');
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <input
        id="create-graph"
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
          setShowModal(true);
          reader.readAsText(file);
        }}
      />
      <SidebarButton
        text={t('Import data')}
        icon={<IconGraph size={18} />}
        onClick={handleClick}
      />
      <Modal showModal={showModal} onClose={handleClose} />
    </>
  );
};
*/

export const CreateGraph = (prompt: Prompt) => {
  const { t } = useTranslation('sidebar');
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [content, setContent] = useState(prompt.content);

  return (
    <>
      <SidebarButton
        text={t('Create graph')}
        icon={<IconGraph size={18} />}
        onClick={() => {
          const importFile = document.querySelector(
            '#import-file',
          ) as HTMLInputElement;
          if (importFile) {
            importFile.click();
          }
          setShowModal(true)
        }}
      />
      {showModal &&
        < div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              />

              <div
                className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                role="dialog"
              >
                <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  {t('Description')}
                </div>
                <textarea
                  className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                  style={{ resize: 'none' }}
                  placeholder={t('A description for your prompt.') || ''}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />

                <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  {t('Prompt')}
                </div>
                <textarea
                  className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                  style={{ resize: 'none' }}
                  placeholder={
                    t(
                      'Prompt content. Use {{}} to denote a variable. Ex: {{name}} is a {{adjective}} {{noun}}',
                    ) || ''
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                />

                <button
                  type="button"
                  className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                  onClick={() => {
                    const updatedPrompt = {
                      ...prompt,
                      // name,
                      description,
                      content: content.trim(),
                    };
                    console.log(updatedPrompt)

                    setShowModal(false);
                    fetch('/api/chat', {
                      method: 'POST',
                      body: JSON.stringify(updatedPrompt),
                    })
                  }}
                >
                  {t('Save')}
                </button>
              </div>
            </div>
          </div>
        </div >
      }
    </>
    //   <>
    //     <input
    //       id="create-graph"
    //       className="sr-only"
    //       tabIndex={-1}
    //       type="file"
    //       accept=".csv, .json"
    //       onChange={(e) => {
    //         if (!e.target.files?.length) return;
    //         const file = e.target.files[0];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //           let parsedData;
    //           if (file.type === "text/csv") {
    //             const csvData = e.target?.result as string;
    //             parsedData = Papa.parse(csvData);
    //           } else {
    //             parsedData = JSON.parse(e.target?.result as string);
    //           };
    //           // process data here
    //           // processData(parsedData, file.name);
    //         };
    //         reader.readAsText(file);
    //       }}
    //     />
    //     <SidebarButton
    //       text={t('Create graph')}
    //       icon={<IconGraph size={18} />}
    //       onClick={handleClick}
    //     />
    //   </>
  );
};
