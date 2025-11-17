// "use client";

// import { useRef, useState, useEffect } from "react";

// interface UploadBoxProps {
//   addFlg?: boolean;
//   editFlg?: boolean;
//   imageUrl?: string | null;
//   onFileSelect?: (file: File) => void; // Pass the selected file
//   onChange?: (url: string) => void;
// }

// export default function UploadBox({
//   addFlg = false,
//   editFlg = false,
//   imageUrl = null,
//   onFileSelect,
//   onChange,
// }: UploadBoxProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   // Show existing image if editing
//   useEffect(() => {
//     if (imageUrl) {
//       setPreview(
//         imageUrl.startsWith("http") ? imageUrl : `http://localhost:5000${imageUrl}`
//       );
//     }
//   }, [imageUrl]);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const imageUrl = URL.createObjectURL(file);
//     setPreview(imageUrl);

//     if (onFileSelect) onFileSelect(file); // send File to parent
//     if (onChange) onChange(imageUrl); // send URL to parent
//   };
  
//   {console.log("preview", preview)}
//   const uploadText = editFlg
//     ? "Drop other image here"
//     : addFlg
//     ? "Drop an image here"
//     : "Drop image";

//   return (
//     <div
//       className="border-2 border-dashed border-gray-500 rounded-xl w-full h-[380px] flex flex-col items-center justify-center text-gray-400 text-sm overflow-hidden cursor-pointer"
//       onClick={() => fileInputRef.current?.click()}
//       >
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileSelect}
//         className="hidden"
//         />
//       {preview ? (
//         <img src={preview} alt="preview" className="w-full h-full object-cover" />
//       ) : (
//         <div className="flex flex-col items-center cursor-pointer">
//           <span className="text-4xl mb-4">⬆️</span>
//           {uploadText}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";

interface UploadBoxProps {
  addFlg?: boolean;
  editFlg?: boolean;
  imageUrl?: string | null;
  onFileSelect?: (file: File) => void;
  onChange?: (url: string) => void;
}

export default function UploadBox({
  addFlg = false,
  editFlg = false,
  imageUrl = null,
  onFileSelect,
  onChange,
}: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Show existing image if editing, only if preview is not set
  useEffect(() => {
    if (imageUrl && !preview) {
      setPreview(
        imageUrl  
      );
    }
  }, [imageUrl, preview]);

  console.log("preview state:", preview);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    if (onFileSelect) onFileSelect(file);
    if (onChange) onChange(imageUrl);
  };

  const uploadText = editFlg
    ? "Drop other image here"
    : addFlg
    ? "Drop an image here"
    : "Drop image";

  return (
    <div
      className="border-2 border-dashed border-gray-500 rounded-xl w-full h-[380px] flex flex-col items-center justify-center text-gray-400 text-sm overflow-hidden cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <img src={preview} alt="preview" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-4xl mb-4">⬆️</span>
          {uploadText}
        </div>
      )}
    </div>
  );
}

