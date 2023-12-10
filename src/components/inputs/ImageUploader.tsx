/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { Delete, Upload } from '@mui/icons-material';
import { Badge, Grid, IconButton, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import handleStop from '@/Utils/functions/handleStop';
import { uploadFile } from '@/Utils/functions/auth.d';
import { Documento } from '@/Utils/functions/IDocumento';

const useStyles = makeStyles((theme: Theme) => ({
  dropContainer: {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    display: 'none',
  },
}));

type DefaultImageUploader = {
  variant: 'default';

  onChange(action: Documento): void;
  title: string | 'Escolha um Arquivo';
};
type DropImageUploader = {
  variant: 'drop';
  title: string | 'Arraste e solte uma imagem aqui';
  onDrop(action: Documento): void;
};
type ImageUploaderProps = {
  className?: string;
  value?: ArrayBuffer | string;
  onDelete?: () => void;
  nmImagem?: string;
} & (DefaultImageUploader | DropImageUploader);

export function arrayBufferToBlobUrl(arrayBuffer: any | undefined, mimeType: any) {
  if (arrayBuffer) {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
  }
  return null;
}
function fileToBlobUrl(file: File) {
  const blob = file instanceof Blob ? file : new Blob(file);
  const blobUrl = (window.URL || window.webkitURL).createObjectURL(blob);
  return blobUrl;
}

type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export function ImageFromBuffer({ arrayBuffer, ...props }: { arrayBuffer: ArrayBuffer | undefined } & ImgProps) {
  return arrayBuffer ? (
    <img
      src={arrayBufferToBlobUrl(arrayBuffer, 'image/png/jpeg') || undefined}
      style={{ maxWidth: '40px' }}
      alt="img"
      {...props}
    />
  ) : null;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const classes = useStyles();
  const { variant, className, title, value, nmImagem, onDelete } = props;

  const imgUrl = arrayBufferToBlobUrl(value, 'image/jpeg');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleSelectedFile = async (file: File) => {
    setSelectedFile(file);
    const resDocumento = await uploadFile(`docAfu_${file.name}`, file);

    const blobUrl = fileToBlobUrl(file);
    const documento: Documento = {
      ...resDocumento,
      blobDocumento: blobUrl,
    };

    if (variant === 'default') {
      const { onChange } = props;
      onChange(documento);
    } else if (variant === 'drop') {
      const { onDrop } = props;
      onDrop(documento);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleSelectedFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClear = (e: any) => {
    handleStop(e);
    setSelectedFile(null);
    if (value && typeof onDelete === 'function') {
      onDelete();
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <>
      {variant === 'drop' && (
        <>
          <Grid
            className={clsx(classes.dropContainer, { [className ?? '']: true })}
            onDrop={handleDrop}
            onClick={handleClick}
            onDragOver={handleDragOver}
          >
            {selectedFile || imgUrl ? (
              <Badge
                badgeContent={
                  <IconButton onClick={handleClear}>
                    <Delete />
                  </IconButton>
                }
                component={Grid}
              >
                <Grid container item xs={12}>
                  <Grid container justifyContent="center" item xs={12}>
                    <img
                      src={selectedFile ? URL.createObjectURL(selectedFile) : imgUrl || undefined}
                      alt="Uploaded"
                      style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
                    />
                  </Grid>
                  <Grid container item justifyContent="center" xs={12}>
                    <Typography variant="caption">{selectedFile?.name || nmImagem}</Typography>
                  </Grid>
                </Grid>
              </Badge>
            ) : (
              <>
                <Upload fontSize="large" />
                <p> {title} </p>
              </>
            )}
          </Grid>
          <input style={{ display: 'none' }} onChange={handleFileChange} type="file" ref={inputRef} />
        </>
      )}

      {variant === 'default' && (
        <input accept="image/*" className={classes.input} id="image-upload" type="file" onChange={handleFileChange} />
      )}
    </>
  );
}

ImageUploader.defaultProps = {
  className: undefined,
  value: null,
  nmImagem: undefined,
  onDelete: undefined,
};
