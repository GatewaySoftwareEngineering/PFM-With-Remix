import React from 'react'
import { seedTransactions } from '../seeders/transaction.seeder'

export default function Index() {
  React.useEffect(() => {
    seedTransactions()
  }, [])

  return (
    <div className="index-page">
      <h1>Finance Manager</h1>
      <p>Let&apos;s get this done!</p>
    </div>
  )
}
