"use client";

import { useCallback, useMemo, useState } from "react";

export function useAttachmentUpload() {
  const [isOpen, setOpen] = useState(false);
  const [stagedUrl, setStagedUrl] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onUploaded = useCallback((url: string) => {
    setStagedUrl(url);
    setIsUploading(false);
    setOpen(false);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      setOpen,
      onUploaded,
      stagedUrl,
      isUploading,
    }),
    [isOpen, setOpen, onUploaded, stagedUrl, isUploading]
  );
}

export type AttachmentUpload = ReturnType<typeof useAttachmentUpload>;
