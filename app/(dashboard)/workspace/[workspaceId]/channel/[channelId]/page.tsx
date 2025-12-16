"use client";

import { useParams } from "next/navigation";
import { ChannelHeader } from "./_components/channel-header";
import { MessageList } from "./_components/message-list";
import MessageInputForm from "./_components/message/message-input-form";

export default function Page() {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col flex-1 min-w-0">
        {/* Fixed header */}
        <ChannelHeader />

        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-hidden mb-4">
          <MessageList />
        </div>

        <div className="border-t bg-background p-4">
          <MessageInputForm channelId={channelId} />
        </div>
      </div>
    </div>
  );
}
