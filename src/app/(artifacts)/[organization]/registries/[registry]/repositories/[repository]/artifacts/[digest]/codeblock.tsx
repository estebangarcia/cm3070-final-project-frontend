"use client";

import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks'

export interface ManifestCodeBlockProps {
    manifestJson: string,
}

export default function ManifestCodeBlock({manifestJson}: ManifestCodeBlockProps) {
  return (
    <CopyBlock language="json" showLineNumbers={true} theme={dracula} wrapLongLines={true} text={manifestJson} />
  );
}
