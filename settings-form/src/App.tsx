import { useState, type FormEvent } from 'react'
import './App.css'

type Settings = {
  name: string
  email: string
  password: string
  confirmPassword: string
  notifications: boolean
}

const initialSettings: Settings = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  notifications: true,
}

function App() {
  const [settings, setSettings] = useState(initialSettings)
  const [passwordError, setPasswordError] = useState('')
  const [saved, setSaved] = useState(false)

  function updateSetting<Key extends keyof Settings>(
    key: Key,
    value: Settings[Key],
  ) {
    setSettings((currentSettings) => ({ ...currentSettings, [key]: value }))
    setSaved(false)

    if (key === 'password' || key === 'confirmPassword') {
      setPasswordError('')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (settings.password !== settings.confirmPassword) {
      setPasswordError('Your passwords do not match. Please try again.')
      setSaved(false)
      return
    }

    setPasswordError('')
    setSaved(true)
  }

  const initials = settings.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="Forma home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>forma</span>
        </a>
        <div className="topbar-meta">
          <span className="workspace-label">PERSONAL WORKSPACE</span>
          <span className="topbar-avatar" aria-hidden="true">
            {initials || 'MM'}
          </span>
        </div>
      </header>

      <div className="page-heading" id="main-content">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Settings</h1>
          <p className="page-description">
            Manage your personal details and preferences.
          </p>
        </div>
        <div className="secure-note">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2.5 4 5v4.3c0 3.8 2.6 6.7 6 8.2 3.4-1.5 6-4.4 6-8.2V5l-6-2.5Z" />
            <path d="m7.5 10 1.7 1.7 3.4-3.5" />
          </svg>
          <span>Your account is secure</span>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar" aria-label="Settings navigation">
          <div className="profile-summary">
            <span className="profile-avatar" aria-hidden="true">
              {initials || 'MM'}
            </span>
            <div className="profile-copy">
              <span className="profile-name">{settings.name || 'Your name'}</span>
              <span className="profile-email">
                {settings.email || 'Add your email'}
              </span>
            </div>
          </div>

          <p className="nav-heading">ACCOUNT</p>
          <nav>
            <a className="nav-link active" href="#profile">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="6.3" r="3" />
                <path d="M4.5 17v-1.5a5.5 5.5 0 0 1 11 0V17Z" />
              </svg>
              <span>Personal information</span>
            </a>
            <a className="nav-link" href="#security">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <rect x="4" y="8.5" width="12" height="9" rx="2" />
                <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
              </svg>
              <span>Password &amp; security</span>
            </a>
            <a className="nav-link" href="#notifications">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M15.5 7.5a5.5 5.5 0 0 0-11 0c0 6-2 6-2 7.5h15c0-1.5-2-1.5-2-7.5ZM8 17h4" />
              </svg>
              <span>Notifications</span>
            </a>
          </nav>

          <div className="sidebar-foot">
            <span className="online-dot" />
            All changes are saved securely
          </div>
        </aside>

        <section className="settings-card" aria-labelledby="form-title">
          <div className="card-heading" id="profile">
            <div>
              <h2 id="form-title">Personal information</h2>
              <p>Update the details associated with your account.</p>
            </div>
            <span className="section-index">01</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input
                    autoComplete="name"
                    id="name"
                    name="name"
                    onChange={(event) => updateSetting('name', event.target.value)}
                    placeholder="e.g. Madhu Mohan"
                    required
                    type="text"
                    value={settings.name}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    autoComplete="email"
                    id="email"
                    name="email"
                    onChange={(event) => updateSetting('email', event.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={settings.email}
                  />
                </div>
              </div>
            </div>

            <div className="section-divider" />

            <div className="form-section" id="security">
              <div className="card-heading section-heading">
                <div>
                  <h2>Password &amp; security</h2>
                  <p>Choose a strong password to keep your account safe.</p>
                </div>
                <span className="section-index">02</span>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="password">New password</label>
                  <input
                    autoComplete="new-password"
                    id="password"
                    minLength={8}
                    name="password"
                    onChange={(event) =>
                      updateSetting('password', event.target.value)
                    }
                    placeholder="At least 8 characters"
                    required
                    type="password"
                    value={settings.password}
                    aria-describedby="password-hint"
                  />
                  <span className="field-hint" id="password-hint">
                    Use at least 8 characters.
                  </span>
                </div>
                <div className="field">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input
                    aria-describedby={
                      passwordError ? 'password-error' : undefined
                    }
                    aria-invalid={Boolean(passwordError)}
                    autoComplete="new-password"
                    id="confirm-password"
                    minLength={8}
                    name="confirmPassword"
                    onChange={(event) =>
                      updateSetting('confirmPassword', event.target.value)
                    }
                    placeholder="Re-enter your password"
                    required
                    type="password"
                    value={settings.confirmPassword}
                  />
                  {passwordError && (
                    <span className="field-error" id="password-error">
                      {passwordError}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="section-divider" />

            <div className="form-section notifications-section" id="notifications">
              <div className="notification-copy">
                <span className="notification-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="M15.5 7.5a5.5 5.5 0 0 0-11 0c0 6-2 6-2 7.5h15c0-1.5-2-1.5-2-7.5ZM8 17h4" />
                  </svg>
                </span>
                <span>
                  <span className="notification-title">Product updates</span>
                  <span className="notification-description">
                    Receive occasional news and tips in your inbox.
                  </span>
                </span>
              </div>
              <label className="toggle">
                <input
                  checked={settings.notifications}
                  name="notifications"
                  onChange={(event) =>
                    updateSetting('notifications', event.target.checked)
                  }
                  type="checkbox"
                />
                <span className="toggle-track" aria-hidden="true">
                  <span className="toggle-thumb" />
                </span>
                <span className="sr-only">Receive product updates</span>
              </label>
            </div>

            <div className="form-footer">
              <p className="save-status" aria-live="polite">
                {saved
                  ? 'Settings saved for this demo. No data was sent to a server.'
                  : 'Your information is only used for this demo.'}
              </p>
              <button className="save-button" type="submit">
                <span>Save changes</span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h12m-5-5 5 5-5 5" />
                </svg>
              </button>
            </div>
          </form>
        </section>
      </div>

      <footer className="page-footer">
        <span>FORMA</span>
        <span>Thoughtful tools for your everyday work.</span>
      </footer>
    </main>
  )
}

export default App
