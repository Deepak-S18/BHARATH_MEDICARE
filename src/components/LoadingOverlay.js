export default function LoadingOverlay({ message = 'Please wait...' }) {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
}
