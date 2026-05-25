import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

const DEVICE_ID_KEY = 'inout.deviceId';

function generateUuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const r = (Math.random() * 16) | 0;
    const v = char === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function loadOrCreate() {
      try {
        const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
        if (existing) {
          if (!cancelled) setDeviceId(existing);
          return;
        }

        const fresh = generateUuidV4();
        try {
          await SecureStore.setItemAsync(DEVICE_ID_KEY, fresh);
        } catch (persistError) {
          console.warn(
            '[useDeviceId] Failed to persist deviceId, using in-memory value:',
            persistError,
          );
        }
        if (!cancelled) setDeviceId(fresh);
      } catch (error) {
        console.warn(
          '[useDeviceId] SecureStore unavailable, falling back to in-memory deviceId:',
          error,
        );
        if (!cancelled) setDeviceId(generateUuidV4());
      }
    }

    void loadOrCreate();

    return () => {
      cancelled = true;
    };
  }, []);

  return deviceId;
}
