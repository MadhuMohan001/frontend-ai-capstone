import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('settings form', () => {
  it('saves valid settings and confirms that the demo is local-only', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Madhu Mohan' },
    })
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'madhu@example.com' },
    })
    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'securepass123' },
    })
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'securepass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

    expect(
      screen.getByText(/settings saved for this demo/i),
    ).toBeInTheDocument()
  })

  it('shows an error when the passwords do not match', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Madhu Mohan' },
    })
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'madhu@example.com' },
    })
    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'securepass123' },
    })
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'differentpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }))

    expect(
      screen.getByText('Your passwords do not match. Please try again.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })
})
