import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  if (!active) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">NT</div>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Experience...</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="progress-percent">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
