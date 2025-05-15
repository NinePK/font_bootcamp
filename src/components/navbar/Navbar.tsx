import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      setIsDark(true)
    }
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-[#7E57C2] dark:text-[#CE93D8]">
        VolunteerHub
      </h1>
      <button
        onClick={toggleDark}
        className="p-2 rounded-full bg-[#D1C4E9] dark:bg-[#4527A0] focus:outline-none"
        aria-label="Toggle dark mode"
      >
        {isDark ? '🌞' : '🌙'}
      </button>
    </header>
  )
}

export default Navbar
