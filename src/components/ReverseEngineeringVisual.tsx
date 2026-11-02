"use client";

import { motion } from "framer-motion";

export default function ReverseEngineeringVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-amber-950/25 blur-[90px] pointer-events-none" />

      {/* 2. REVERSE ENGINEERING & DECOMPILER WORKSPACE (IDA PRO & DEVTOOLS STYLE) */}
      <div className="relative w-full max-w-[490px] h-[250px] flex items-center justify-end">
        
        {/* Floating Protocol Sniffer Card (Left Layer) */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-3 z-20 w-[155px] rounded-xl bg-[#140C04]/95 border border-amber-400/35 p-2.5 shadow-2xl backdrop-blur-xl font-mono text-[8px] space-y-1.5"
        >
          <div className="text-amber-300 font-bold uppercase border-b border-white/10 pb-1">
            Network Payload
          </div>
          <div className="space-y-1 text-neutral-300">
            <div>
              <span className="text-neutral-500">POST</span> <span className="text-white">/api/v2/auth</span>
            </div>
            <div className="text-[7px] text-amber-200/90">
              Payload: Encrypted Protobuf
            </div>
            <div className="text-[7px] text-emerald-400">
              Decoded: 128 Fields Intact
            </div>
          </div>
          <div className="text-[7px] text-neutral-400 pt-1 border-t border-white/10">
            HTTP/2 | SSL Pinning Bypassed
          </div>
        </motion.div>

        {/* Main Decompiler & Code Reconstruction Window (Center/Right Layer) */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[330px] sm:w-[370px] h-[225px] rounded-2xl bg-[#110802]/90 border border-amber-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl p-3.5 flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-amber-300 font-semibold">
              Disassembler: Binary to High-Level AST
            </span>
            <span className="font-mono text-[8px] text-neutral-400">
              Target: Web & Mobile Core
            </span>
          </div>

          {/* Split View: Disassembly Opcodes vs Clean Reconstructed Code */}
          <div className="grid grid-cols-2 gap-2 my-auto font-mono text-[8px]">
            {/* Left: Raw Disassembly Stream */}
            <div className="rounded-lg bg-black/50 border border-white/10 p-2 space-y-1 text-neutral-400">
              <div className="text-neutral-500 text-[7px] uppercase border-b border-white/10 pb-0.5">
                Machine Opcodes
              </div>
              <div className="space-y-0.5 text-[7.5px]">
                <div className="text-amber-300/80">0x7F80 PUSH RBP</div>
                <div className="text-neutral-300">0x7F81 MOV RBP, RSP</div>
                <div className="text-neutral-400">0x7F84 SUB RSP, 0x20</div>
                <div className="text-amber-400">0x7F88 CALL 0x0040A2</div>
                <div className="text-neutral-300">0x7F8D TEST EAX, EAX</div>
                <div className="text-amber-300/80">0x7F8F JNZ 0x0040B8</div>
              </div>
            </div>

            {/* Right: Clean Modern TypeScript Interface */}
            <div className="rounded-lg bg-amber-950/20 border border-amber-400/30 p-2 space-y-1 text-neutral-200">
              <div className="text-amber-300 text-[7px] uppercase border-b border-amber-400/20 pb-0.5">
                Recovered Modern Code
              </div>
              <div className="space-y-0.5 text-[7.5px] leading-relaxed">
                <div><span className="text-amber-400">export class</span> <span className="text-white">APIClient</span> &#123;</div>
                <div className="pl-1.5 text-neutral-400"><span className="text-sky-300">async</span> syncData() &#123;</div>
                <div className="pl-3 text-neutral-300"><span className="text-amber-300">await</span> this.reconcile();</div>
                <div className="pl-3 text-emerald-300">return true;</div>
                <div className="pl-1.5 text-neutral-400">&#125;</div>
                <div>&#125;</div>
              </div>
            </div>
          </div>

          {/* Bottom Engineering Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px] text-neutral-400">
            <span>Demangled Architecture: 100%</span>
            <span className="text-amber-300 font-semibold">Zero Logic Gap</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
