"use client";

import {
  ChannelNameSchema,
  ChannelNameSchemaType,
  transformChannelName,
} from "@/app/schemas/channel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { orpc } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function CreateNewChannel() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();

  const form = useForm({
    resolver: zodResolver(ChannelNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const createChannelMutation = useMutation(
    orpc.channel.create.mutationOptions({
      onSuccess: (newChannel) => {
        toast.success(`Channel ${newChannel.name} created successfully`);

        queryClient.invalidateQueries({
          queryKey: orpc.channel.list.queryKey(),
        });

        form.reset();
        setOpen(false);

        router.push(
          `/workspace/${params.workspaceId}/channel/${newChannel.id}`
        );
      },
      onError: (error) => {
        if (isDefinedError(error)) {
          toast.error(error.message);

          return;
        }
        toast.error("Failed to create channel. Please try again later.");
      },
    })
  );

  const watchedName = form.watch("name");
  const transformedName = watchedName ? transformChannelName(watchedName) : "";

  function onSubmit(values: ChannelNameSchemaType) {
    createChannelMutation.mutate(values);
  }

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, setOpen]);

  const isCreatingChannel = createChannelMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="size-4" /> Create Channel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>

          <DialogDescription>
            Create a new channel to get started.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Channel"
                      autoComplete="off"
                      disabled={isCreatingChannel}
                      {...field}
                    />
                  </FormControl>
                  {transformedName && transformedName !== watchedName && (
                    <p className="text-sm text-muted-foreground">
                      Will be creates as:{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        {transformedName}
                      </code>
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isCreatingChannel} type="submit">
              Create new Channel
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
