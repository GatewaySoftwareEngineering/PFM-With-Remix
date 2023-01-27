import React from 'react'
import { seedTransactions } from '../seeders/transaction.seeder'

export const links = () => [
  {
    rel: 'preload',
    href: '/assets/icons/dollar-sign.svg',
    as: 'image',
    type: 'image/svg+xml',
  },
]

export default function Index() {
  React.useEffect(() => {
    seedTransactions()
  }, [])

  return (
    <div className="page">
      <div className="sidebar">
        <div className="logo">
          <img src="/assets/icons/dollar-sign.svg" alt="dollar-sign" />
          <h4>Finance Manager</h4>
        </div>
      </div>
      <div>
        <p>Let&apos;s get this done!</p>
      </div>
    </div>
  )
}
