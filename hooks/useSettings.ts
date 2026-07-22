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

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      const data = await response.json();
      setSettings((prev) => ({ ...prev, ...newSettings }));
      return data;
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { settings, fetchSettings, updateSettings, isLoading };
}
