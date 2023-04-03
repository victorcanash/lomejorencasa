import { MutableRefObject } from 'react';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { UploadFile } from '@core/types/multimedia';
import type { FormatText } from '@core/types/texts';

type UploadInputProps = {
  uploadInputRef: MutableRefObject<HTMLInputElement | null>,
  uploadImgs: UploadFile[],
  handleChangeUploadInput: (event: React.ChangeEvent<HTMLInputElement>, maxFiles: number) => void,
  handleClickDeleteUploadBtn: (uploadIndex: number) => void,
  maxFiles: number,
  maxWidth: string,
  descriptionText: FormatText,
};

const UploadInput = (props: UploadInputProps) => {
  const {
    uploadInputRef,
    uploadImgs,
    handleChangeUploadInput,
    handleClickDeleteUploadBtn,
    maxFiles,
    maxWidth,
    descriptionText,
  } = props;

  return (
    <>
      { uploadImgs && uploadImgs.length > 0 &&
        <Box
          sx={{
            maxWidth: maxWidth, 
            margin: 'auto',
          }}              
        >
          <Grid container spacing={1} py={3}>
            { uploadImgs.map((item, index) => (
              <Grid item xs={6} key={index}>
                <Image
                  src={item.url}
                  alt="Image"
                  width="500"
                  height="500"
                  layout="responsive"
                  objectFit="cover"
                />
                <Button variant="contained" onClick={()=>handleClickDeleteUploadBtn(index)}>
                  <FormattedMessage 
                    id="app.removeBtn" 
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
      <Box
        sx={{
          maxWidth: maxWidth,
          margin: 'auto',
        }}
      >
        { maxFiles > 1 &&
          <Typography mb={3} textAlign={descriptionText.textAlign || 'left'}>
            <FormattedMessage 
              id={descriptionText.id}
              values={descriptionText.values}
            />
          </Typography>
        }
        <Button 
          variant="contained" 
          fullWidth
          disabled={uploadImgs.length >= maxFiles}
          component="label"
        >
          <FormattedMessage 
            id="forms.uploadInput.uploadBtn"
          />
          <input 
            ref={uploadInputRef}
            hidden
            accept=".png, .jpg, .jpeg"
            multiple={maxFiles > 1 ? true : false}
            type="file"
            onChange={(e) => {
              handleChangeUploadInput(e, maxFiles);
            }}
          />
        </Button>
      </Box>
    </>
  );
};

export default UploadInput;
