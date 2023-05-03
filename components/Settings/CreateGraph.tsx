import { IconGraph } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { useState, useRef, KeyboardEvent, useContext, useEffect, FC } from 'react';
import { Prompt } from '@/types/prompt';
import { processData } from './Import';
import * as Papa from 'papaparse';

interface Props {
  prompt: {
    name: string,
    description: string,
    content: string,
  };
}

export const CreateGraph: FC<Props> = ({ prompt }) => {
  const { t } = useTranslation('sidebar');
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState(prompt.name);
  const [description, setDescription] = useState(prompt.description);
  const [content, setContent] = useState(prompt.content);
  const [data, setParsedData] = useState('')

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // onUpdatePrompt({ ...prompt, name, description, content: content.trim() });
      setShowModal(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      setShowModal(false);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [() => setShowModal(false)]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

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
              // parsedData = Papa.parse(csvData);
            } else {
              parsedData = JSON.parse(e.target?.result as string);
              // parsedData = JSON.parse(e.target?.result as string);
            };
            // process data here
            setParsedData(parsedData)
            processData(parsedData, file.name);
          };
          reader.readAsText(file);
        }}
      />
      <SidebarButton
        text={t('Create graph')}
        icon={<IconGraph size={18} />}
        onClick={() => {
          const createFile = document.querySelector(
            '#create-graph',
          ) as HTMLInputElement;
          if (createFile) {
            createFile.click();
            console.log(createFile)
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
                <div className="text-sm font-bold text-black dark:text-neutral-200">
                  {t('Name')}
                </div>
                <input
                  className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                  placeholder={t('A name for your prompt.') || ''}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    console.log(name)
                  }}
                />
                <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  {t('Description')}
                </div>
                <textarea
                  className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                  style={{ resize: 'none' }}
                  placeholder={t('A description for your prompt.') || ''}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    console.log(description)
                  }}
                  rows={3}
                />

                <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  {t('What do you want to do with your data?')}
                </div>
                <textarea
                  className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                  style={{ resize: 'none' }}
                  placeholder={
                    t(
                      'Use {{}} to denote a variable. Ex: {{name}} is a {{adjective}} {{noun}}',
                    ) || ''
                  }
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value)
                    console.log(content)
                  }}
                  rows={10}
                />

                <button
                  type="button"
                  className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                  onClick={() => {
                    const updatedPrompt = {
                      ...prompt,
                      name,
                      description,
                      content: content.trim(),
                      data
                    };
                    console.log(updatedPrompt)

                    setShowModal(false);
                    fetch('/api/controllers/masloRedirect', {
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
