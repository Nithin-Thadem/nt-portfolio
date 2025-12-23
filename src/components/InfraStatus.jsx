import { useState, useEffect } from "react";

const InfraStatus = () => {
  const [status, setStatus] = useState({
    deployment: "operational",
    lastDeploy: null,
    uptime: "99.9%",
  });

  useEffect(() => {
    // Simulate fetching deployment status
    // In production, this would fetch from your monitoring API
    const fetchStatus = async () => {
      try {
        // You can replace this with actual API calls to your monitoring system
        setStatus({
          deployment: "operational",
          lastDeploy: new Date().toISOString(),
          uptime: "99.9%",
        });
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };

    fetchStatus();
  }, []);

  const statusColors = {
    operational: "bg-green-500",
    degraded: "bg-yellow-500",
    outage: "bg-red-500",
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a
        href="https://github.com/Nithin-Thadem/nt-portfolio/actions"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:border-white/30 transition-all group"
      >
        <span
          className={`w-2 h-2 rounded-full ${statusColors[status.deployment]} animate-pulse`}
        />
        <span className="text-white-50 text-xs font-mono">
          {status.deployment === "operational" ? "All Systems Operational" : status.deployment}
        </span>
        <span className="text-white/30 text-xs">|</span>
        <span className="text-white-50 text-xs font-mono">{status.uptime} uptime</span>
        <svg
          className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
};

export default InfraStatus;
