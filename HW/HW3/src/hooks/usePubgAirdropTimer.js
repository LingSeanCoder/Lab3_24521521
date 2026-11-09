import { useState, useEffect } from 'react';

export function usePubgAirdropTimer(targetEpochMs) {
  // Hàm tính toán thời gian còn lại dựa trên mốc tuyệt đối
  const calculateRemaining = () => Math.max(0, targetEpochMs - Date.now());
  
  const [remainingMs, setRemainingMs] = useState(calculateRemaining);

  useEffect(() => {
    const updateTimer = () => {
      setRemainingMs(calculateRemaining());
    };

    // Cập nhật ngay lần đầu
    updateTimer();

    // Cập nhật liên tục mỗi 200ms
    const intervalId = setInterval(updateTimer, 200);

    // Lắng nghe sự kiện visibilitychange để đồng bộ lại khi tab được active
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [targetEpochMs]);

  return remainingMs;
}