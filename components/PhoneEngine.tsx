'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterData, Scene, Node } from '@/types/story';
import { useGameStore } from '@/store/useGameStore';
import PressureMeter from '@/components/PressureMeter';
import Link from 'next/link';

interface PhoneEngineProps {
  story: CharacterData;
}

export default function PhoneEngine({ story }: PhoneEngineProps) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [currentNodeIdx, setCurrentNodeIdx] = useState(0);
  const [displayedNodes, setDisplayedNodes] = useState<Node[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addPressure = useGameStore((state) => state.addPressure);
  const logDoor = useGameStore((state) => state.logDoor);

  const currentScene: Scene | undefined = story.scenes[currentSceneIdx];
  const currentNode: Node | undefined = currentScene?.nodes[currentNodeIdx];

  // Auto-advance through messages and narration
  useEffect(() => {
    if (!currentNode) return;

    if (currentNode.type === 'message' || currentNode.type === 'narration' || currentNode.type === 'dialogue') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setDisplayedNodes((prev) => [...prev, currentNode]);
        
        // Auto progress to next node if available
        if (currentNodeIdx < currentScene.nodes.length - 1) {
          setCurrentNodeIdx((prev) => prev + 1);
        }
      }, currentNode.type === 'message' ? (currentNode.delayMs || 1000) : 800);

      return () => clearTimeout(timer);
    } else if (currentNode.type === 'choice' || currentNode.type === 'door') {
      setIsTyping(false);
    }
  }, [currentSceneIdx, currentNodeIdx, currentNode]);

  const handleChoice = (option: { label: string; next: string; pressure?: any }) => {
    if (option.pressure) {
      addPressure(option.pressure);
    }

    // Add selected choice into stream
    setDisplayedNodes((prev) => [
      ...prev,
      { type: 'message', from: 'You', text: option.label },
    ]);

    // Find target scene or next step
    const targetSceneIdx = story.scenes.findIndex((s) => s.id === option.next);
    if (targetSceneIdx !== -1) {
      setCurrentSceneIdx(targetSceneIdx);
      setCurrentNodeIdx(0);
      setDisplayedNodes([]);
    } else if (currentNodeIdx < currentScene.nodes.length - 1) {
      setCurrentNodeIdx((prev) => prev + 1);
    }
  };

  const handleDoorSelect = (door: any) => {
    logDoor({
      character: story.id,
      doorId: door.id,
      response: door.response,
    });

    if (door.pressure) {
      addPressure({ [door.pressure]: 15 });
    }

    setDisplayedNodes((prev) => [
      ...prev,
      { type: 'narration', text: `[Knocked on door: ${door.label}]` },
      { type: 'dialogue', speaker: door.label, text: `"${door.text}"` },
    ]);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-12 flex flex-col justify-between">
      {/* Top Status & Pressure Bar */}
      <div className="sticky top-12 z-30 pt-2 pb-1 bg-slate-950/90 backdrop-blur-md">
        <PressureMeter />
      </div>

      {/* Main Interactive Screen Stream */}
      <div className="flex-1 space-y-4 px-2 py-4">
        <AnimatePresence initial={false}>
          {displayedNodes.map((node, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Message Chat Bubble */}
              {node.type === 'message' && (
                <div
                  className={`flex flex-col ${
                    node.from === 'You' ? 'items-end' : 'items-start'
                  } mb-2`}
                >
                  <span className="text-[10px] text-slate-400 mb-1 px-1 font-mono">
                    {node.from}
                  </span>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      node.from === 'You'
                        ? 'bg-rose-600 text-white rounded-br-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    {node.text}
                  </div>
                </div>
              )}

              {/* Narration Text */}
              {node.type === 'narration' && (
                <div className="my-3 px-4 py-3 bg-slate-900/50 border border-slate-800/80 rounded-xl text-center">
                  <p className="text-xs italic text-slate-400">{node.text}</p>
                </div>
              )}

              {/* Dialogue Bubble */}
              {node.type === 'dialogue' && (
                <div className="my-2 p-3.5 bg-slate-900 border-l-2 border-rose-500 rounded-r-xl">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                    {node.speaker}
                  </span>
                  <p className="text-xs text-slate-200">{node.text}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 p-3 bg-slate-900/60 w-16 rounded-full border border-slate-800"
          >
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </motion.div>
        )}

        {/* Interactive Choice Options */}
        {currentNode?.type === 'choice' && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col gap-2.5"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
              Select Response:
            </span>
            {currentNode.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(opt)}
                className="w-full text-left p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/60 rounded-xl text-xs text-slate-200 transition shadow-lg flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition">
                  →
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Interactive Doors Selection */}
        {currentNode?.type === 'door' && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 font-semibold block mb-2">
              Knock on a Door (Seek Help):
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {currentNode.doors.map((door) => (
                <button
                  key={door.id}
                  onClick={() => handleDoorSelect(door)}
                  className="p-3 bg-slate-900 border border-slate-800 hover:border-rose-500/80 rounded-xl text-left transition"
                >
                  <span className="text-xs font-semibold text-white block">
                    {door.label}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                    [{door.pressure}]
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800">
              <Link
                href={`/play/${story.id}/aftermath`}
                className="block text-center w-full py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition"
              >
                Proceed to Aftermath Feed →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
