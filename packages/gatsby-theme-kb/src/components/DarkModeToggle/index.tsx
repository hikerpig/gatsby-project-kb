import React from 'react'
import useDarkMode from 'use-dark-mode'

import './dark-mode-toggle.css'

const DarkModeToggle = () => {
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode(false)
  const hint = isDark ? 'Activate light mode' : 'Activate dark mode'

  return (
    <label
      className="dark-mode-toggle"
      aria-label={hint}
      title={hint}
    >
      <input type="checkbox" checked={!isDark} onChange={toggleDarkMode} />
      <div />
      <span className="dark-mode-toggle__hint">{hint}</span>
    </label>
  )
}

export default DarkModeToggle
