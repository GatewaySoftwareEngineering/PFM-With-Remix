import { Link, useLocation } from '@remix-run/react'
import React from 'react'
import { seedTransactions } from '../seeders/transaction.seeder'

export const links = () => [
  {
    rel: 'preload',
    href: '/assets/icons/dollar-sign.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
  {
    rel: 'preload',
    href: '/assets/icons/menu.png',
    as: 'image',
    type: 'image/png',
  },
  {
    rel: 'preload',
    href: '/assets/icons/close.png',
    as: 'image',
    type: 'image/png',
  },
]

const navLinks = [
  {
    label: 'Overview',
    to: '/',
  },
  { label: 'Transaction History', to: '/transaction-history' },
]

export default function Index() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(undefined)

  const location = useLocation()

  React.useEffect(() => {
    seedTransactions()

    window.onresize = () => {
      setIsSideBarOpen(undefined)
    }
  }, [])

  return (
    <div className="page">
      <div
        className={`sidebar ${isSideBarOpen ? 'mobile-sidebar' : ''}`}
        style={
          isSideBarOpen !== undefined
            ? {
                display: isSideBarOpen ? 'flex' : 'none',
              }
            : undefined
        }
      >
        <div className="logo">
          <img
            src="/assets/icons/dollar-sign.svg"
            alt="dollar-sign"
            className="dollar-sign-icon"
          />
          <h4>Finance Manager</h4>
          {isSideBarOpen && (
            <img
              src="/assets/icons/close.png"
              alt="close"
              className="close-sidebar-icon"
              onClick={() => setIsSideBarOpen((prev) => !prev)}
            />
          )}
        </div>
        <nav>
          <ul>
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className={
                    location.pathname === link.to
                      ? 'current-nav-link'
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="main">
        <div className="top-bar">
          <img
            src="/assets/icons/menu.png"
            alt="menu"
            className="top-bar-menu-icon"
            onClick={() => setIsSideBarOpen((prev) => !prev)}
          />
          <h4>Overview</h4>
        </div>
        <p>Let&apos;s get this done!</p>
      </div>
    </div>
  )
}
