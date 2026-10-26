import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterId, PressureSource, DoorLogEntry } from '../types/story';

interface GameState {
  warningAccepted: boolean;
  completed: CharacterId[];
  pressure: Partial<Record<PressureSource, number>>;
  doorsLog: DoorLogEntry[];
  muted: boolean;
  reduceComments: boolean;
  
  // Actions
  acceptWarning: () => void;
  markCompleted: (id: CharacterId) => void;
  addPressure: (sources: Partial<Record<PressureSource, number>>) => void;
  logDoor: (entry: DoorLogEntry) => void;
  resetRunPressure: () => void;
  toggleMute: () => void;
  toggleReduceComments: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      warningAccepted: false,
      completed: [],
      pressure: {},
      doorsLog: [],
      muted: true,
      reduceComments: false,

      acceptWarning: () => set({ warningAccepted: true }),
      
      markCompleted: (id) =>
        set((state) => ({
          completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
        })),

      addPressure: (sources) =>
        set((state) => {
          const updated = { ...state.pressure };
          for (const [key, val] of Object.entries(sources)) {
            const k = key as PressureSource;
            updated[k] = (updated[k] || 0) + (val || 0);
          }
          return { pressure: updated };
        }),

      logDoor: (entry) =>
        set((state) => ({
          doorsLog: [...state.doorsLog, entry],
        })),

      resetRunPressure: () => set({ pressure: {} }),

      toggleMute: () => set((state) => ({ muted: !state.muted })),
      
      toggleReduceComments: () => set((state) => ({ reduceComments: !state.reduceComments })),
    }),
    {
      name: 'femicide_awareness_progress_v1', // LocalStorage Key
    }
  )
);
