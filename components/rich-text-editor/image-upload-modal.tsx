import { UploadDropzone } from "@/lib/uploadthing";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploaded: (url: string) => void;
}

export function ImageUploadModal({
  open,
  onOpenChange,
  onUploaded,
}: ImageUploadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>

        <UploadDropzone
          className=""
          appearance={{
            container: "bg-card",
            label: "text-muted-foreground",
            allowedContent: "text-xs text-muted-foreground",
            button: "bg-primary text-primary-foreground hover:bg-primary/50",
            uploadIcon: "text-muted-foreground",
          }}
          endpoint={"imageUploader"}
          onClientUploadComplete={(res) => {
            const url = res[0].ufsUrl;
            onUploaded(url);

            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error) => {
            toast.error(error.message);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
