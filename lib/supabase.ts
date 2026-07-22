import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);

export async function saveMessage(
  userId: string,
  conversationId: string,
  content: string,
  role: 'user' | 'assistant'
) {
  try {
    const { data, error } = await supabaseServer
      .from('messages')
      .insert([
        {
          user_id: userId,
          conversation_id: conversationId,
          content,
          role,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
}

export async function getConversationHistory(
  userId: string,
  conversationId: string
) {
  try {
    const { data, error } = await supabaseServer
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching conversation:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return [];
  }
}
