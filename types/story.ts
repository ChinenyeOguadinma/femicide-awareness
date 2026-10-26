export type PressureSource = 'family' | 'work' | 'church' | 'police' | 'school' | 'friends' | 'online';

export type ResponseType = 'dismissed' | 'blamed' | 'redirected' | 'promised-no-action' | 'helpless';

export type CharacterId = 'ngozi' | 'chioma' | 'amaka' | 'tolu';

export type Beat = 1 | 2 | 3 | 4 | 5 | 'aftermath';

export type InterfaceType = 'phone' | 'scene' | 'doors' | 'police' | 'feed' | 'cutaway';

export interface DoorLogEntry {
  character: CharacterId;
  doorId: string;
  response: ResponseType;
}
