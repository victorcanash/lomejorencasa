import { MutableRefObject } from 'react';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { UploadFile } from '@core/types/multimedia';
import type { FormatText } from '@core/types/texts';
import Button from '@core/components/inputs/Button';

import { uploadConfig } from '@lib/config/multimedia.config';

type UploadInputProps = {
  uploadInputRef: MutableRefObject<HTMLInputElement | null>,
  uploadImgs: UploadFile[],
  handleChangeUploadInput: (event: React.ChangeEvent<HTMLInputElement>, maxFiles: number) => void,
  handleClickDeleteUploadBtn: (uploadIndex: number) => void,
  maxFiles: number,
  maxWidth: string,
  descriptionText?: FormatText,
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

  const RemoveBtn = (props: { index: number }) => (
    <Button
      onClick={()=>handleClickDeleteUploadBtn(props.index)}
      sx={{ float: 'right' }}
    >
      <FormattedMessage
        id="app.removeBtn"
      />
    </Button>
  );

  return (
    <>
      { uploadImgs && uploadImgs.length > 0 &&
        <Box
          sx={{
            maxWidth: maxFiles > 1 ? maxWidth : undefined,
            position: maxFiles > 1 ? undefined : 'relative',
            width: maxFiles > 1 ? undefined : '100%',
            margin: 'auto',
            paddingTop: maxFiles > 1 ? undefined : '100%',
          }}
        >
          { (maxFiles === 1 && uploadImgs.length === 1) &&
            <>
              <Image
                src={uploadImgs[0].url}
                alt="Upload image"
                layout="fill"
                objectFit="cover"
              />
              <Box mb={1} />
              <RemoveBtn index={0} />
            </>
          }
          { (maxFiles > 1 && uploadImgs.length >= 1) &&
            <Grid
              container
              spacing={1}
              py={3}
            >
              { uploadImgs.map((item, index) => (
                <Grid
                  key={index}
                  item xs={6}
                >
                  <Image
                    src={item.url}
                    alt="Image"
                    width="500"
                    height="500"
                    layout="responsive"
                    objectFit="cover"
                  />
                  <Box mb={1} />
                  <RemoveBtn index={index} />
                </Grid>
              ))}
            </Grid>
          }
        </Box>
      }
      <Box
        sx={{
          maxWidth: maxWidth,
          margin: 'auto',
        }}
      >
        { descriptionText &&
          <Typography mb={3} textAlign={descriptionText.textAlign || 'left'}>
            <FormattedMessage 
              id={descriptionText.id}
              values={descriptionText.values}
            />
          </Typography>
        }
        <MuiButton 
          variant="contained" 
          fullWidth
          disabled={uploadImgs.length >= maxFiles}
          component="label"
          sx={{ mt: 2 }}
        >
          <FormattedMessage 
            id="forms.uploadInput.uploadBtn"
          />
          <input 
            ref={uploadInputRef}
            hidden
            accept={uploadConfig.extensions.join(',')}
            multiple={maxFiles > 1 ? true : false}
            type="file"
            onChange={(e) => {
              handleChangeUploadInput(e, maxFiles);
            }}
          />
        </MuiButton>
      </Box>
    </>
  );
};

export default UploadInput;
