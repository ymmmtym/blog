import React, { useState, useEffect } from 'react';
import './index.scss';

function MigrationNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem('migration-notice-seen');
    if (!hasSeenNotice) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('migration-notice-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="migration-notice">
      <div className="migration-notice-content">
        <span>
          ⚠️ このブログ記事は&nbsp;
          <a href="https://yumenomatayume.net" target="_blank" rel="noopener noreferrer">
            yumenomatayume.net
          </a>
          &nbsp;のブログページへ移行しました。
          2026/3/31 に本サイトは閉鎖し、新しいサイトにリダイレクトされます。
        </span>
        <button type="button" className="close-btn" onClick={handleClose}>×</button>
      </div>
    </div>
  );
}

export default MigrationNotice;
