"use client";

import {
  createMessageSchema,
  CreateMessageSchemaType,
} from "@/app/schemas/message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MessageComposer } from "./message-composer";
import { useMutation } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";

interface MessageInputFormProps {
  channelId: string;
}

export default function MessageInputForm({ channelId }: MessageInputFormProps) {
  const form = useForm({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      channelId: channelId,
      content: "",
    },
  });

  const createMessageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onSuccess: () => {
        return toast.success("Message sent successfully");
      },
      onError: () => {
        return toast.error("Failed to send message");
      },
    })
  );

  const onSubmit = (values: CreateMessageSchemaType) => {
    createMessageMutation.mutate(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MessageComposer
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
