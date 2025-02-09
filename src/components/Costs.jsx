import { useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const COST_TYPES = ['Pay as you go', 'Monthly', 'Yearly']
const SERVICE_TYPES = ['API', 'Hosting', 'Database', 'Storage', 'CDN', 'Authentication']
const QTY_TYPES = ['character', 'token', 'request', 'GB', 'CPU', 'NA']

const initialCosts = [
  {
    id: 1,
    selected: false,
    type: 'API',
    name: 'Google TTS',
    costType: 'Pay as you go',
    cost: 0.0002,
    qtyType: 'character',
    qtyPerUser: 10000
  },
  {
    id: 2,
    selected: false,
    type: 'API',
    name: 'Groq Llama 70b',
    costType: 'Pay as you go',
    cost: 0.001,
    qtyType: 'token',
    qtyPerUser: 10000
  },
  {
    id: 3,
    selected: false,
    type: 'Hosting',
    name: 'Replit 4 CPU',
    costType: 'Monthly',
    cost: 25,
    qtyType: 'NA',
    qtyPerUser: 1
  }
]

const Costs = () => {
  const [costs, setCosts] = useState(initialCosts)
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    setCosts(costs.map(cost => ({ ...cost, selected: checked })))
  }

  const handleSelectRow = (id, checked) => {
    setCosts(costs.map(cost => 
      cost.id === id ? { ...cost, selected: checked } : cost
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Costs</h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Cost
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b-2 border-muted hover:bg-transparent">
            <TableHead className="w-[52px] p-0">
              <div className="flex items-center justify-center h-full">
                <Checkbox 
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="translate-y-0"
                />
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cost Type</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Qty Type</TableHead>
            <TableHead>Qty per user</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {costs.map(cost => (
            <TableRow key={cost.id}>
              <TableCell className="w-[52px] p-0">
                <div className="flex items-center justify-center h-full">
                  <Checkbox 
                    checked={cost.selected}
                    onCheckedChange={(checked) => handleSelectRow(cost.id, checked)}
                    className="translate-y-0"
                  />
                </div>
              </TableCell>
              <TableCell>{cost.type}</TableCell>
              <TableCell>{cost.name}</TableCell>
              <TableCell>{cost.costType}</TableCell>
              <TableCell>${cost.cost}</TableCell>
              <TableCell>{cost.qtyType}</TableCell>
              <TableCell>{cost.qtyPerUser}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Costs 