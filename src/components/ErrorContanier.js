import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function ErrorContainer({ message }) {
  return (
    <div className="error-container" aria-live="polite">
      <span className="error-icon"><FontAwesomeIcon icon={faExclamationTriangle} /></span>
      <span className="error-text">{message}</span>
    </div>
  );
}
