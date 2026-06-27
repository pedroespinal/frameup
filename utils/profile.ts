import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GearProfile {
  cameraId?: string;
  cameraBrand?: string;
  cameraModel?: string;
  sensorType?: string;
  lensIds: string[];
  updatedAt: number;
}

const PROFILE_KEY    = 'frameup_gear_profile';
const ONBOARDING_KEY = 'frameup_onboarding_done';

export const getGearProfile = async (): Promise<GearProfile | null> => {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveGearProfile = async (profile: Omit<GearProfile, 'updatedAt'>): Promise<void> => {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify({ ...profile, updatedAt: Date.now() }));
};

export const clearGearProfile = async (): Promise<void> => {
  await AsyncStorage.removeItem(PROFILE_KEY);
};

export const isOnboardingDone = async (): Promise<boolean> => {
  try {
    const val = await AsyncStorage.getItem(ONBOARDING_KEY);
    return val === 'true';
  } catch {
    return false;
  }
};

export const markOnboardingDone = async (): Promise<void> => {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
};
