import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { ImageUploadModal } from "@/components/rich-text-editor/image-upload-modal";
import { Button } from "@/components/ui/button";
import { AttachmentUpload } from "@/hooks/use-attachment-upload";
import { ImageIcon, Send } from "lucide-react";

interface MessageComposerProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  upload: AttachmentUpload;
}

export function MessageComposer({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  upload,
}: MessageComposerProps) {
  return (
    <>
      <RichTextEditor
        field={{ value, onChange }}
        sendButton={
          <Button
            disabled={isSubmitting}
            type="button"
            size="sm"
            onClick={onSubmit}
          >
            <Send className="size-4" />
            Send
          </Button>
        }
        footerLeft={
          upload.stagedUrl ? (
            <p>Upload</p>
          ) : (
            <Button
              disabled={isSubmitting}
              onClick={() => upload.setOpen(true)}
              type="button"
              size="sm"
              variant="outline"
            >
              <ImageIcon className="size-4" />
              Attach
            </Button>
          )
        }
      />

      <ImageUploadModal
        onUploaded={(url) => upload.onUploaded(url)}
        open={upload.isOpen}
        onOpenChange={upload.setOpen}
      />
    </>
  );
}
