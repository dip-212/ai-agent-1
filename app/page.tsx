"use client"

import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { BlueTitle, GrayTitle, SectionHeading, SectionLabel } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn, has } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);


  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">  
      {/* hero section  */}
      <section className="realtive flex flex-col items-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)" // blur
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
          }}
        />
        <Badge variant={'outline'} className="gap 2 p-4 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
          Powered by gemini 3.5 flash 
        </Badge>

          <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl z-10 ">
            <GrayTitle>Forge your Dream</GrayTitle>
            <br/>
            <BlueTitle>from a single prompt</BlueTitle>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/40 z-10">
          Describe what you want to build. AI writes the code, picks the
          packages, and renders a live preview all inside your browser.
          </p>
          {/* prompt box */}
          <div className="relative mx-auto mt-12 w-full max-w-2xl">
            <div className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/8"
                : "border-white/8"
            )}
            >
              <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
              />

              <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
                <span className="text-xs text-white/20">
                  Press ⏎ to generate · Shift+⏎ for new line
                </span>

                {isSignedIn ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim()}
                    className="h-8 rounded-full px-5 font-semibold"
                    variant={prompt.trim() ? "default" : "secondary"}
                  >
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="h-8 rounded-full bg-white px-5 font-semibold">
                      Generate
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-10 text-xs text-white/20">
            No credit card required · 10 free generations on sign up
          </p>
      </section>

      {/* website mockup */}
      <section>
        <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[#0b0c10] border border-zinc-800/80 shadow-2xl overflow-hidden font-sans text-zinc-300 select-none mb-10">
          {/* 1. Window Header Bar */}
          <div className="relative flex items-center justify-between px-4 py-2.5 bg-[#121318] border-b border-zinc-800/80">
            {/* macOS Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            {/* Center URL Pill */}
            <div className="px-5 py-0.5 rounded-md bg-[#1a1b22] border border-zinc-800 text-[11px] font-mono text-zinc-400">
              forge.app/workspace
            </div>
            <div className="w-10" />
          </div>
          {/* 2. Main Workspace Grid */}
          <div className="grid grid-cols-12 min-h-[380px]">
            {/* --- Left Column: Chat Area (5/12 cols) --- */}
            <div className="col-span-5 flex flex-col justify-between p-3.5 border-r border-zinc-800/80 bg-[#0d0e13]">
              <div className="space-y-3">
                <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-1">
                  CHAT
                </div>
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-[90%] px-3 py-2 rounded-2xl rounded-tr-sm bg-[#22242c] border border-zinc-700/40 text-[11px] text-zinc-200 leading-relaxed shadow-sm">
                    Build a kanban board with 3 columns and drag-and-drop
                  </div>
                </div>
                {/* Assistant message */}
                <div className="flex items-start gap-2">
                  <div className="shrink-0 w-5 h-5 rounded bg-white flex items-center justify-center text-black shadow-sm mt-0.5">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="max-w-[88%] px-3 py-2.5 rounded-2xl rounded-tl-sm bg-[#161820] border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed shadow-sm">
                    I'll build a Kanban board with Todo, In Progress, and Done columns. I'll use{' '}
                    <span className="text-sky-400 font-mono text-[10px] bg-sky-950/40 px-1 py-0.5 rounded border border-sky-800/40">
                      @dnd-kit/core
                    </span>{' '}
                    for smooth drag-and-drop...
                  </div>
                </div>
                {/* Typing Indicator */}
                <div className="flex items-center gap-2">
                  <div className="shrink-0 w-5 h-5 rounded bg-white flex items-center justify-center text-black shadow-sm">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#161820] border border-zinc-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse delay-300" />
                  </div>
                </div>
              </div>
              {/* Chat Input */}
              <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-[#15171f] border border-zinc-800 text-[11px] text-zinc-500">
                <span>Ask AI to modify...</span>
                <svg
                  className="w-3.5 h-3.5 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            {/* --- Right Column: Preview Area (7/12 cols) --- */}
            <div className="col-span-7 flex flex-col bg-[#090a0d]">
              {/* Tabs */}
              <div className="flex items-center gap-5 px-5 pt-2.5 border-b border-zinc-800/80">
                <div className="relative pb-2 text-[11px] font-semibold text-zinc-100">
                  Preview
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-400 rounded-full" />
                </div>
                <div className="pb-2 text-[11px] font-medium text-zinc-500 hover:text-zinc-400 cursor-pointer">
                  Code
                </div>
              </div>
              {/* Kanban Columns */}
              <div className="p-4 grid grid-cols-3 gap-3">
                {/* Column 1: TODO */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 text-[10px] font-semibold text-zinc-400">
                    <span>TODO</span>
                    <span className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-400">
                      3
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-3/5 bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-4/5 bg-zinc-700/40 rounded-full" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-4/5 bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-1/2 bg-zinc-700/40 rounded-full" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-full bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-3/4 bg-zinc-700/40 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Column 2: IN PROGRESS */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 text-[10px] font-semibold text-zinc-400">
                    <span className="truncate">IN PROGRESS</span>
                    <span className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-400">
                      2
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-2/3 bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-4/5 bg-zinc-700/40 rounded-full" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-3/4 bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-3/5 bg-zinc-700/40 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Column 3: DONE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 text-[10px] font-semibold text-zinc-400">
                    <span>DONE</span>
                    <span className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] text-zinc-400">
                      1
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-[#13141a] border border-zinc-800/70 space-y-1.5">
                      <div className="h-1.5 w-1/2 bg-zinc-600/70 rounded-full" />
                      <div className="h-1.5 w-4/5 bg-zinc-700/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* features */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From prompt" blue="to production." />
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 group-hover:border-white/15 group-hover:bg-white/8">
                <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70" />
              </div>
              <p className="mb-2 text-sm font-semibold">{label}</p>
              <p className="text-sm leading-relaxed text-white/40">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app." />
        </div>

        <div className="mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center pt-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 ">
                  <span className="font-mono text-xs font-semibold text-white/50 ">
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-white/6" />
                )}
              </div>

              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">
                  {step.label}
                </p>

                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* pricing */}
      <section>
      </section>
      
      {/* cta */}
      <section className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-white/8 px-10 py-24 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)" // blur
          numberOfLines={36}
          numberOfDiscs={36}
          particleRGBColor={[147, 197, 253]}
          className="absolute inset-0 h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        <SectionHeading gray="Start building," blue="for free." />

        <p className="mb-8 text-sm leading-relaxed text-white/40">
          Get 10 free generations on sign up. No credit card required.
          <br />
          Upgrade when you&apos;re ready.
        </p>

        <SignInButton mode="modal">
          <Button
            size="lg"
            className="relative h-11 rounded-full bg-white px-8"
          >
            Get started free
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SignInButton>
      </section>

      <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">
        Made with ❤️ 
      </footer>
    </main>
  );
}
