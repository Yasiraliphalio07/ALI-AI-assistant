import axios from 'axios';
import { SearchResult } from '@/types';

const SEARCHAPI_KEY = process.env.SEARCHAPI_API_KEY;

export async function search(query: string): Promise<SearchResult[]> {
  if (!SEARCHAPI_KEY) {
    console.error('SEARCHAPI_API_KEY is not set');
    return [];
  }

  try {
    const response = await axios.get('https://www.searchapi.io/api/v1/search', {
      params: {
        api_key: SEARCHAPI_KEY,
        engine: 'google',
        q: query,
        num: 10,
      },
    });

    const results = response.data.organic_results || [];
    return results.map((result: any) => ({
      title: result.title,
      url: result.link,
      snippet: result.snippet,
      source: new URL(result.link).hostname,
    }));
  } catch (error) {
    console.error('SearchAPI error:', error);
    return [];
  }
}
