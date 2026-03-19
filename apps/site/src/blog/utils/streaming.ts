import { StreamingItem } from '@/hooks/use_streaming';

// Format: "author: content" (with optional timestamp)
// Timestamp format: YYYY-mm-dd HH:MM:SS
export const formatStreamingData = (items: StreamingItem[]): string => {
  if (!items || items.length === 0) {
    return '';
  }
  // Reverse to show oldest first (bb-msg-history appends to bottom)
  return [...items]
    .reverse()
    .map(item => {
      const time = item.createdAt
        ? new Date(item.createdAt)
            .toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })
            .replace(/\//g, '-')
        : '';
      return time ? `[${time}] ${item.author}: ${item.content}` : `${item.author}: ${item.content}`;
    })
    .join('\n');
};
