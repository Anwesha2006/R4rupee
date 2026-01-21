'use client'

import { CreditCard, Plus, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Wallet() {
  const [showBalance, setShowBalance] = useState(true)

  const accounts = [
    { id: 1, name: 'Checking Account', type: 'Bank', balance: 3240.5, last4: '4242' },
    { id: 2, name: 'Savings Account', type: 'Bank', balance: 15000, last4: '1234' },
    { id: 3, name: 'Credit Card', type: 'Card', balance: 2500, last4: '5678' },
  ]

  const cards = [
    { id: 1, name: 'Visa Platinum', last4: '4242', expiry: '12/25' },
    { id: 2, name: 'SBI Cashback Card', last4: '5678', expiry: '08/26' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground mt-2">
            Manage your accounts and payment methods.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold">
          <Plus size={20} />
          Add Account
        </button>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-accent to-accent/80 rounded-lg p-8 text-accent-foreground">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg opacity-90">Total Balance</p>
            <div className="flex items-center gap-3 mt-4">
              <h2 className="text-4xl font-bold">
                {showBalance ? '$20,240.50' : '••••••'}
              </h2>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Last updated</p>
            <p className="text-lg font-semibold">Today</p>
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Bank Accounts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold">{account.name}</h3>
              <p className="text-sm text-muted-foreground">{account.type}</p>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold text-accent">
                  ${account.balance.toFixed(2)}
                </p>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                •••• {account.last4}
              </p>

              <button className="w-full mt-4 py-2 border rounded-lg">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-card border border-border rounded-lg p-6 flex justify-between items-center mb-3"
          >
            <div className="flex items-center gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <CreditCard size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">{card.name}</h3>
                <p className="text-sm text-muted-foreground">
                  •••• {card.last4} • Expires {card.expiry}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-lg">Edit</button>
              <button className="px-4 py-2 border border-destructive text-destructive rounded-lg">
                Remove
              </button>
            </div>
          </div>
        ))}

        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-accent rounded-lg text-accent font-semibold">
          <Plus size={20} />
          Add Payment Method
        </button>
      </div>

      {/* Connected Apps */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Connected Apps</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground mb-4">
            No apps connected yet. Connect an app to sync your transactions automatically.
          </p>
          <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold">
            Browse Apps
          </button>
        </div>
      </div>
    </div>
  )
}
