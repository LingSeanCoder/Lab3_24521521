import { useState, useEffect } from 'react';

export function useDrumKeyboard(padMap, onTriggerPad, isEnabled = true) {
  // Dùng Set để quản lý trạng thái nhiều phím được nhấn cùng lúc (hợp âm trống)
  const [activeKeys, setActiveKeys] = useState(new Set());

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      // 1. Chặn spam phím (OS Auto-repeat)
      if (e.repeat) return;

      // 2. Bỏ qua nếu user đang focus vào form (Input Focus Isolation)
      const targetTag = e.target.tagName.toUpperCase();
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) return;

      // 3. Bắt buộc dùng Physical Key Codes (e.code) để tránh lỗi bộ gõ
      if (padMap[e.code]) {
        e.preventDefault(); // Ngăn hành vi mặc định của trình duyệt
        
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.add(e.code);
          return next;
        });

        if (onTriggerPad) {
          onTriggerPad(padMap[e.code]);
        }
      }
    };

    const handleKeyUp = (e) => {
      const targetTag = e.target.tagName.toUpperCase();
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) return;

      if (padMap[e.code]) {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(e.code);
          return next;
        });
      }
    };

    // Gắn listener
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup function chống rò rỉ bộ nhớ
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [padMap, onTriggerPad, isEnabled]);

  return activeKeys;
}