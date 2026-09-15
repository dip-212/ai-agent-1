"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useUser } from "@clerk/nextjs";
import {
  ArrowUp,
  Paperclip,
  Loader2,
  X,
  Sparkles,
  Wand2,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { PricingModal } from "@/components/PricingModal";
import type { Message, StatusStep } from "@/types/workspace";
// import { createClient } from "@supabase/supabase-js";
import { BlueTitle } from "./reusables";
import Image from "next/image";

interface ChatPanelProps {
  messages: Message[];
  isGenerating: boolean;
  isImproving: boolean;
  statusLog: StatusStep[];
  credits: number;
  initialPrompt: string | null;
  onGenerate: (prompt: string, imageUrl?: string) => Promise<void>;
  onStop: () => void;
  userId: string;
  workspaceId: string | null;
  appTitle: string | null;
}

export function ChatPanel({
  messages,
  isGenerating,
  isImproving,
  statusLog,
  credits,
  initialPrompt,
  onGenerate,
  onStop,
  userId,
  workspaceId,
  appTitle,
}: ChatPanelProps)  {
  return (
    <div>ChatPanel</div>
  )
}

export default ChatPanel
