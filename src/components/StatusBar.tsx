"use client";

import { useState, useEffect } from "react";

export default function StatusBar() {
  const [stats, setStats] = useState({ status: "ACTIVE", system_status: "Sistem Aktif" });

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(() => {});
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className={`status-dot ${stats.status === 'ACTIVE' ? '' : 'bg-yellow-500'}`}></div>
      <div>
        <div className="status-text">{stats.system_status}</div>
      </div>
    </div>
  );
}
