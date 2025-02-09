import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'

const Dashboard = () => {
  // We'll need to access the global state here later
  const selectedCosts = [
    { type: 'API', name: 'Google TTS', cost: 0.0002, qtyPerUser: 10000 },
    { type: 'Hosting', name: 'Replit 4 CPU', cost: 25, qtyPerUser: 1 }
  ]

  const plans = [
    { name: 'Basic', price: 10, interval: 'monthly', users: 100 },
    { name: 'Pro', price: 20, interval: 'monthly', users: 500 }
  ]

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
                    <TableCell>{plan.users}</TableCell>
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
                <TableHead>Cost per Unit</TableHead>
                <TableHead>Qty per User</TableHead>
                <TableHead>Cost per User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCosts.map((cost) => (
                <TableRow key={cost.name}>
                  <TableCell>{cost.type}</TableCell>
                  <TableCell>{cost.name}</TableCell>
                  <TableCell>${cost.cost}</TableCell>
                  <TableCell>{cost.qtyPerUser}</TableCell>
                  <TableCell>${(cost.cost * cost.qtyPerUser).toFixed(4)}</TableCell>
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