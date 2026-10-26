export type PressureSource = 'family' | 'work' | 'church' | 'police' | 'school' | 'friends' | 'online';

export type ResponseType = 'dismissed' | 'blamed' | 'redirected' | 'promised-no-action' | 'helpless';

export type CharacterId = 'chioma' | 'fatima' | 'lisa' | 'tolu';

export type Beat = 1 | 2 | 3 | 4 | 5 | 'aftermath';

export type InterfaceType = 'phone' | 'scene' | 'doors' | 'police' | 'feed' | 'cutaway';

export interface ChoiceOption {
  label: string;
  next: string;
  pressure?: Partial<Record<PressureSource, number>>;
  disabledAbove?: number;
}

export interface DoorItem {
  id: string;
  label: string;
  response: ResponseType;
  text: string;
  pressure: PressureSource;
}

export type Node =
  | { type: 'message'; from: string; text: string; delayMs?: number; kind?: 'text' | 'missed-call' | 'location' | 'unknown' }
  | { type: 'narration'; text: string }
  | { type: 'dialogue'; speaker: string; text: string }
  | { type: 'choice'; options: ChoiceOption[] }
  | { type: 'door'; doors: DoorItem[] }
  | { type: 'post'; author: string; text: string; likes: number }
  | { type: 'comment'; text: string; stance: 'support' | 'blame' | 'counter' };

export interface Scene {
  id: string;
  beat: Beat;
  interface: InterfaceType;
  skippable?: boolean;
  nodes: Node[];
}

export interface CharacterData {
  id: CharacterId;
  name: string;
  age: number;
  setting: string;
  blurb: string;
  scenes: Scene[];
}

export interface DoorLogEntry {
  character: CharacterId;
  doorId: string;
  response: ResponseType;
}
