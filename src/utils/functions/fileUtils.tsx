import React, { useState } from 'react';

export default function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.error) {
        reject(reader.error);
      } else {
        resolve(new Blob([reader.result as ArrayBuffer], { type: file.type }));
      }
    };

    reader.readAsArrayBuffer(file);
  });
}
