"use client"

import { useUploadFile } from "@/hooks/api";
import { useCallback, useRef, useState } from "react";

interface FileUploadProps{
    label:string;
    value?:string;
    onChange: (url:string)=>void;
    accept?:string;
    maxSize?:number;
}



export function FileUpload({
    label,
    value,
    onChange,
    accept= '.pdf',
    maxSize = 10
}:FileUploadProps){

    const [error,setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useUploadFile();

    const handleFile = useCallback(async (file:File)=>{

        setError(null);

        console.log("This is file size",file.size);
        console.log("THis is maxsize",maxSize*1024*1024)    

        // size validation
        if(file.size>maxSize *1024*1024){

            setError(`File must be less than ${maxSize} MB`);
            return;
        }

        try{
            const result = await uploadMutation.mutateAsync(file);
            const uploadedUrl = result.file?.url;
            onChange(uploadedUrl);


        }
        catch(err){
            setError("Update failed, make sure only .pdf file is uploaded");


        }

    },[maxSize,onchange,uploadMutation])


      const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

    return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      {value ? (
        <div className="border rounded-lg p-3 flex justify-between items-center">
          <span className="text-sm truncate">{value.split('/').pop()}</span>

          <button
            type="button"
            onClick={() => onChange('')}
            className="text-red-600 text-xs"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
        >
          {uploadMutation.isPending ? 'Uploading...' : 'Click to upload file'}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}



interface MultiFileUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function MultiFileUpload({
  label,
  values,
  onChange,
  maxFiles = 5,
}: MultiFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadFile();


    const handleFiles = async (files: FileList) => {
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (values.length + newUrls.length >= maxFiles) break;

      const result = await uploadMutation.mutateAsync(file);
      newUrls.push(result.file?.url);
    }

    onChange([...values, ...newUrls]);
  };

    return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      <div className="space-y-2">
        {values.map((url, index) => (
          <div key={index} className="border rounded p-2 flex justify-between">
            <span className="truncate">{url.split('/').pop()}</span>

            <button
              onClick={() =>
                onChange(values.filter((_, i) => i !== index))
              }
              className="text-red-600 text-xs"
            >
              Remove
            </button>
          </div>
        ))}

        {values.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-dashed border-2 p-4 w-full text-center"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Add file'}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );

}