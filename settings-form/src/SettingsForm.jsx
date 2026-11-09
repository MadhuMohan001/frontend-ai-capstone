import { useState } from "react";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  emailNotifications: true,
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function FormField({ id, label, type, value, onChange, placeholder, autoComplete, error, hint }) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={messageId}
      />
      {error ? (
        <p className="field-message field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field-message field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default function SettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      if (name === "password" || name === "confirmPassword") {
        delete nextErrors.password;
        delete nextErrors.confirmPassword;
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });
    setStatus("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      return;
    }

    setStatus("Your settings have been saved successfully.");
  }

  return (
    <main className="app-shell" id="main-content">
      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="Forma home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          forma
        </a>
        <div className="topbar-meta">
          <span className="workspace-label">PERSONAL WORKSPACE</span>
          <span className="topbar-avatar" aria-hidden="true">
            MM
          </span>
        </div>
      </header>

      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Settings</h1>
          <p className="page-description">Manage your personal details and preferences.</p>
        </div>
        <p className="secure-note">
          <span className="secure-indicator" aria-hidden="true">
            ✓
          </span>
          Your account is secure
        </p>
      </div>

      <section className="settings-card" aria-label="Account settings">
        <form noValidate onSubmit={handleSubmit}>
          <section className="form-section" aria-labelledby="personal-heading">
            <div className="card-heading">
              <div>
                <h2 id="personal-heading">Personal information</h2>
                <p>Update the details associated with your account.</p>
              </div>
              <span className="section-index" aria-hidden="true">
                01
              </span>
            </div>
            <div className="form-grid">
              <FormField
                id="fullName"
                label="Full name"
                type="text"
                value={values.fullName}
                onChange={handleChange}
                placeholder="e.g. Madhu Mohan"
                autoComplete="name"
                error={errors.fullName}
              />
              <FormField
                id="email"
                label="Email address"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email}
              />
            </div>
          </section>

          <section className="form-section section-divider" aria-labelledby="password-heading">
            <div className="card-heading">
              <div>
                <h2 id="password-heading">Password &amp; security</h2>
                <p>Choose a strong password to keep your account safe.</p>
              </div>
              <span className="section-index" aria-hidden="true">
                02
              </span>
            </div>
            <div className="form-grid">
              <FormField
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                error={errors.password}
                hint="Use at least 8 characters."
              />
              <FormField
                id="confirmPassword"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                error={errors.confirmPassword}
              />
            </div>
          </section>

          <section
            className="notifications-section section-divider"
            aria-labelledby="notifications-heading"
          >
            <div className="notification-copy">
              <span className="notification-icon" aria-hidden="true">
                @
              </span>
              <span>
                <span className="notification-title" id="notifications-heading">
                  Email notifications
                </span>
                <span className="notification-description">
                  Receive occasional news and tips in your inbox.
                </span>
              </span>
            </div>
            <label className="toggle">
              <span className="sr-only">Email notifications</span>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={values.emailNotifications}
                onChange={handleChange}
                aria-labelledby="notifications-heading"
              />
              <span className="toggle-track" aria-hidden="true">
                <span className="toggle-thumb" />
              </span>
            </label>
          </section>

          <div className="form-footer">
            <p className="save-status" role="status" aria-live="polite">
              {status || "Your information is only used for this demo."}
            </p>
            <button className="save-button" type="submit">
              Save changes
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </section>

      <footer className="page-footer">
        <span>FORMA</span>
        <span>Thoughtful tools for your everyday work.</span>
      </footer>
    </main>
  );
}
