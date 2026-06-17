import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light/dark mode"
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-accent"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
