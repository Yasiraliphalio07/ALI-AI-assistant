'use client';

import { useState, useCallback } from 'react';
import { UserSettings } from '@/types';

const defaultSettings: UserSettings = {
  theme: 'dark',
  autoSearch: true,
  memoryEnabled: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    setIsLoading(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      setSettings((prev) => ({ ...prev, ...newSettings }));
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { settings, updateSettings, isLoading };
}
