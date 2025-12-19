import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { Button } from "@/components/ui/button";
import { ImageIcon, Send } from "lucide-react";

interface MessageComposerProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function MessageComposer({
  value,
  onChange,
  onSubmit,
  isSubmitting,
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
          <Button
            disabled={isSubmitting}
            type="button"
            size="sm"
            variant="outline"
          >
            <ImageIcon className="size-4" />
            Attach
          </Button>
        }
      />
    </>
  );
}
