import { useUploadCv } from "@/hooks/api";
import { useCallback, useRef, useState } from "react";

interface CvUploadProps{
    label:string;
    value?:string;
    onChange: (url:string)=>void;
    accept?:string;
    maxSize?:number;
    
}



export function CvUpload({
    label,
    value,
    onChange,
    accept= '.pdf',
    maxSize = 10
}:CvUploadProps){

    const [error,setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadMutation = useUploadCv();

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
            console.log("This is result",result);
            onChange(uploadedUrl);


        }
        catch(err){
            setError("Update failed, make sure only .pdf file is uploaded");


        }

    },[maxSize, onChange, uploadMutation])


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
