import React, { useState } from 'react';
import { CRATES } from '../data';
import { usePubgAirdropTimer } from '../hooks/usePubgAirdropTimer';

// Tách CrateCard để gọi Hook đúng chuẩn React (không gọi hook trong vòng lặp map)
function CrateCard({ crate, isClaiming, onClaim }) {
  const remainingMs = usePubgAirdropTimer(crate.dropEpochMs);
  const isDropActive = remainingMs === 0;

  return (
    <article className="crate-card">
      <h3>{crate.title}</h3>
      <p>Giá: {new Intl.NumberFormat('vi-VN').format(crate.priceVnd)} đ</p>
      <p>Tồn kho: {crate.remainingStock}</p>
      <p>
        Trạng thái: {isDropActive ? 'Đang mở bán' : `Còn ${(remainingMs / 1000).toFixed(1)}s`}
      </p>
      <button 
        type="button" 
        onClick={() => onClaim(crate.id)} 
        disabled={isClaiming || !isDropActive || crate.remainingStock <= 0}
      >
        {isClaiming ? 'Đang xử lý...' : (crate.remainingStock <= 0 ? 'Hết hàng' : 'Claim')}
      </button>
    </article>
  );
}

export default function AirdropArena() {
  const [crates, setCrates] = useState(CRATES);
  const [isClaiming, setIsClaiming] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClaim = (id) => {
    if (isClaiming) return;
    
    setIsClaiming(true);
    setErrorMsg('');

    // Lưu lại trạng thái cũ để rollback nếu cần
    const previousCrates = [...crates];

    // Optimistic Update: Giảm stock ngay lập tức
    setCrates((prevCrates) =>
      prevCrates.map((crate) =>
        crate.id === id && crate.remainingStock > 0
          ? { ...crate, remainingStock: crate.remainingStock - 1 }
          : crate
      )
    );

    // Giả lập API call
    setTimeout(() => {
      const isError = Math.random() < 0.3; // 30% tỉ lệ lỗi 409
      
      if (isError) {
        // Rollback: Khôi phục lại mảng crates ban đầu
        setCrates(previousCrates);
        setErrorMsg('409 Conflict: Looted Out (Hết hàng)');
      }
      
      setIsClaiming(false);
    }, 1000);
  };

  return (
    <section className="airdrop-arena" aria-labelledby="airdrop-title">
      <h2 id="airdrop-title">Airdrop Arena</h2>
      
      {errorMsg && <p className="error-text" role="alert" style={{ color: 'red' }}>{errorMsg}</p>}
      
      {/* Zero Div-Soup: Sử dụng section thay vì div làm wrapper */}
      <section className="crates-container">
        {crates.map((crate) => (
          <CrateCard 
            key={crate.id} 
            crate={crate} 
            isClaiming={isClaiming} 
            onClaim={handleClaim} 
          />
        ))}
      </section>
    </section>
  );
}