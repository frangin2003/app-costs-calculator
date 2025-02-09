import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'
import { Input } from './ui/input'

const DEFAULT_PLANS = [
  { name: 'Basic', price: 10, interval: 'monthly', users: 100 },
  { name: 'Pro', price: 20, interval: 'monthly', users: 500 }
]

const formatQty = (qtyType, qty) => {
  if (!qtyType || qtyType === 'NA') return 'N/A';
  
  if (qty >= 1000000) {
    return `${qty/1000000}M ${qtyType}s`;
  } else if (qty >= 1000) {
    return `${qty/1000}K ${qtyType}s`;
  } else {
    return `${qty} ${qtyType}${qty > 1 ? 's' : ''}`;
  }
};

const Dashboard = () => {
  const [selectedCosts, setSelectedCosts] = useState([])
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('subscriptionPlans')
    return savedPlans ? JSON.parse(savedPlans) : DEFAULT_PLANS
  })

  // Load selected costs from localStorage
  useEffect(() => {
    const savedCosts = localStorage.getItem('selectedCosts')
    if (savedCosts) {
      const costs = JSON.parse(savedCosts)
      setSelectedCosts(costs.filter(cost => cost.selected))
    }
  }, [])

  // Save selected costs to localStorage whenever they change
  useEffect(() => {
    const savedCosts = localStorage.getItem('selectedCosts')
    const allCosts = savedCosts ? JSON.parse(savedCosts) : []
    
    // Update quantities for selected costs while preserving other costs
    const updatedCosts = allCosts.map(cost => {
      const selectedCost = selectedCosts.find(sc => sc.id === cost.id)
      return selectedCost || cost
    })
    
    localStorage.setItem('selectedCosts', JSON.stringify(updatedCosts))
  }, [selectedCosts])

  // Listen for changes to plans in localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'subscriptionPlans' && e.newValue) {
        setPlans(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also check for plans on component mount
    const savedPlans = localStorage.getItem('subscriptionPlans')
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans))
    }

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('subscriptionPlans', JSON.stringify(plans))
  }, [plans])

  const handleQtyChange = (costId, newQty) => {
    setSelectedCosts(selectedCosts.map(cost =>
      cost.id === costId ? { ...cost, qtyPerUser: Number(newQty) } : cost
    ))
  }

  const handlePlanUserChange = (planName, value) => {
    setPlans(plans.map(plan =>
      plan.name === planName ? { ...plan, users: Number(value) } : plan
    ))
  }

  const calculateMRR = (plan) => {
    return plan.price * plan.users
  }

  const calculateCostsPerUser = () => {
    return selectedCosts.reduce((total, cost) => {
      return total + (cost.cost * cost.qtyPerUser)
    }, 0)
  }

  const calculateProfit = (plan) => {
    const mrr = calculateMRR(plan)
    const totalCosts = calculateCostsPerUser() * plan.users
    return mrr - totalCosts
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Selected Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${calculateCostsPerUser().toFixed(2)}
              <span className="text-sm text-muted-foreground ml-2">per user</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total MRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${plans.reduce((total, plan) => total + calculateMRR(plan), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              ${plans.reduce((total, plan) => total + calculateProfit(plan), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plans Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-muted hover:bg-transparent">
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Costs</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => {
                const mrr = calculateMRR(plan)
                const costs = calculateCostsPerUser() * plan.users
                const profit = calculateProfit(plan)
                const margin = (profit / mrr) * 100

                return (
                  <TableRow key={plan.name}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>${plan.price}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={plan.users}
                        onChange={(e) => handlePlanUserChange(plan.name, e.target.value)}
                        className="w-24"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>${mrr.toFixed(2)}</TableCell>
                    <TableCell>${costs.toFixed(2)}</TableCell>
                    <TableCell>${profit.toFixed(2)}</TableCell>
                    <TableCell>{margin.toFixed(1)}%</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selected Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-muted hover:bg-transparent">
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Cost Type</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Qty per User</TableHead>
                <TableHead>Cost per User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCosts.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell>{cost.type}</TableCell>
                  <TableCell>{cost.name}</TableCell>
                  <TableCell>{cost.costType}</TableCell>
                  <TableCell>${cost.cost}</TableCell>
                  <TableCell>{formatQty(cost.qtyType, cost.qtyPerUser)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={cost.qtyPerUser}
                      onChange={(e) => handleQtyChange(cost.id, e.target.value)}
                      className="w-24"
                      min="0"
                    />
                  </TableCell>
                  <TableCell>${(cost.cost * cost.qtyPerUser).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard 