'use client'

import { useState } from 'react'
import { ArrowUp, ArrowDown, Wallet, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [balance] = useState(5240.5)
  const [income] = useState(3500)
  const [expenses] = useState(1250.75)
  const [savings] = useState(1989.75)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<Wallet size={24} />}
          accent
        />
        <StatCard
          title="This Month Income"
          value={`$${income.toFixed(2)}`}
          icon={<ArrowUp size={24} />}
          accent
        />
        <StatCard
          title="This Month Expenses"
          value={`$${expenses.toFixed(2)}`}
          icon={<ArrowDown size={24} />}
          destructive
        />
        <StatCard
          title="This Month Savings"
          value={`$${savings.toFixed(2)}`}
          icon={<TrendingUp size={24} />}
          accent
        />
      </div>

      {/* Transactions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

        {[
          { name: 'Salary Deposit', amount: 3500, type: 'income', date: 'Today' },
          { name: 'Grocery Store', amount: -125.5, type: 'expense', date: 'Yesterday' },
          { name: 'Electricity Bill', amount: -89.99, type: 'expense', date: '2 days ago' },
          { name: 'Freelance Project', amount: 500, type: 'income', date: '3 days ago' },
          { name: 'Restaurant', amount: -45.75, type: 'expense', date: '4 days ago' },
        ].map((txn, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-4 rounded-lg bg-muted mb-2"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'income'
                    ? 'bg-accent bg-opacity-10'
                    : 'bg-destructive bg-opacity-10'
                }`}
              >
                {txn.type === 'income' ? (
                  <ArrowUp className="text-accent" size={20} />
                ) : (
                  <ArrowDown className="text-destructive" size={20} />
                )}
              </div>

              <div>
                <p className="font-medium">{txn.name}</p>
                <p className="text-sm text-muted-foreground">{txn.date}</p>
              </div>
            </div>

            <p
              className={`font-semibold ${
                txn.type === 'income' ? 'text-accent' : 'text-destructive'
              }`}
            >
              {txn.type === 'income' ? '+' : ''}${Math.abs(txn.amount).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-accent text-accent-foreground py-3 rounded-lg font-semibold">
          Add Transaction
        </button>
        <button className="bg-muted py-3 rounded-lg font-semibold">
          View Reports
        </button>
        <button className="bg-muted py-3 rounded-lg font-semibold">
          Set Budget
        </button>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, accent, destructive }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3
            className={`text-2xl font-bold mt-2 ${
              accent
                ? 'text-accent'
                : destructive
                ? 'text-destructive'
                : 'text-foreground'
            }`}
          >
            {value}
          </h3>
        </div>
        <div className="bg-accent bg-opacity-10 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  )
}
