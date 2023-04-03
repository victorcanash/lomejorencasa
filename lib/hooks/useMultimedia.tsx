import { useRef, useState } from 'react';

import type { UploadFile } from '@core/types/multimedia';

const useMultimedia = () => {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadImgs, setUploadImgs] = useState<UploadFile[]>([]);

   const handleChangeUploadInput = (event: React.ChangeEvent<HTMLInputElement>, maxFiles: number) => {
    const files = event.target.files;
    const maxUploadFiles = maxFiles - uploadImgs.length;
    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        if (index < maxUploadFiles) {
          setUploadImgs(current => [...current, { 
            url: URL.createObjectURL(file),
            file: file,
          }]);
        }
      })
    }
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  };

  const handleClickDeleteUploadBtn = (uploadImgIndex: number) => {
    setUploadImgs(
      uploadImgs.filter((_item, index) => index !== uploadImgIndex)
    );
  };

  return {
    uploadInputRef,
    uploadImgs,
    handleChangeUploadInput,
    handleClickDeleteUploadBtn,
  };
};

export default useMultimedia;
