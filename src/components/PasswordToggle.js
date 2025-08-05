import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function PasswordToggle({ isVisible, onToggle }) {
  return (
    <button
      type="button"
      className="password-toggle"
      onClick={onToggle}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
      <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} size="sm" />
    </button>
  );
}
