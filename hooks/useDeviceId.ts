import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

const DEVICE_ID_KEY = 'inout.deviceId';

export function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function loadOrCreate() {
      const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
      if (existing) {
        if (!cancelled) setDeviceId(existing);
        return;
      }

      const fresh = Crypto.randomUUID();
      await SecureStore.setItemAsync(DEVICE_ID_KEY, fresh);
      if (!cancelled) setDeviceId(fresh);
    }

    loadOrCreate();

    return () => {
      cancelled = true;
    };
  }, []);

  return deviceId;
}
