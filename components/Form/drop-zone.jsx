import { useDropzone } from 'react-dropzone';
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dropzone({ setGenerating }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
    multiple: true,
  });

  return (
    <div className=''>
      <div
        className="flex justify-center"
        {...getRootProps()}
      >
        {' '}
        <label className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 sm:p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
          {' '}
          <svg
            className="mx-auto h-8 sm:h-12 w-8 sm:w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            />
          </svg>
          <input
            {...getInputProps({
              onClick: (event) => event.stopPropagation(),
            })}
          />
          <span className="mt-2 sm:mt-2 block text-xs sm:text-sm font-semibold text-gray-800">
            {selectedFiles.length > 0
              ? selectedFiles.map((file) => file.name).join(', ')
              : 'Drag and drop or click to select files to upload'}
          </span>
        </label>
      </div>
      
      <div className='text-center'>
        <Button type="button" className="mt-5 px-7"> Upload </Button>
      </div>


      {errorMessage && (
        <p className="font-semibold text-center text-destructive mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
