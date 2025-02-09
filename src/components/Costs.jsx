import { useState, useMemo, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup } from './ui/command'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

import { KNOWN_COSTS, API_LINKS } from '../data/costs'

const Costs = () => {
  // Load initial costs from localStorage or use empty array
  const [costs, setCosts] = useState(() => {
    const savedCosts = localStorage.getItem('selectedCosts')
    return savedCosts ? JSON.parse(savedCosts) : []
  })
  const [selectAll, setSelectAll] = useState(false)
  const [search, setSearch] = useState('')

  // Save costs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedCosts', JSON.stringify(costs))
  }, [costs])

  // Memoize the filtered results
  const filteredItems = useMemo(() => {
    console.log('Filtering with:', search); // Debug log
    
    if (!search.trim()) return KNOWN_COSTS;

    const searchLower = search.toLowerCase().trim();
    return Object.entries(KNOWN_COSTS).reduce((acc, [category, items]) => {
      const matchingItems = items.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower)
      );

      if (matchingItems.length > 0) {
        acc[category] = matchingItems;
      }

      return acc;
    }, {});
  }, [search]); // Only recalculate when search changes

  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    setCosts(costs.map(cost => ({ ...cost, selected: checked })))
  }

  const handleSelectRow = (id, checked) => {
    setCosts(costs.map(cost => 
      cost.id === id ? { ...cost, selected: checked } : cost
    ))
  }

  const handleDeleteCost = (id) => {
    setCosts(costs.filter(cost => cost.id !== id))
  }

  const addCost = (cost) => {
    const newCost = {
      ...cost,
      id: Date.now(), // Use timestamp for unique ID
      selected: true,
      qtyPerUser: 1000
    }
    setCosts([...costs, newCost])
    setSearch('')
  }

  return (
    <div className="p-4">
      {/* Add pills container */}
      <div className="flex flex-wrap gap-2 mb-4">
        {API_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="space-y-4">
        <div className="mb-6">
          <Command className="rounded-lg border-2 border-border shadow-md">
            <CommandInput 
              placeholder="Search and add costs..."
              value={search}
              onValueChange={setSearch}
              className="h-11"
            />
            <CommandList className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted border-t border-border">
              {Object.keys(filteredItems).length === 0 ? (
                <CommandEmpty>No costs found.</CommandEmpty>
              ) : (
                Object.entries(filteredItems).map(([category, items]) => (
                  <CommandGroup key={category} heading={category} className="text-primary border-b border-border last:border-0">
                    {items.map(item => (
                      <div
                        key={item.name}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm"
                        onClick={() => {
                          addCost(item)
                          setSearch('')
                        }}
                      >
                        <div className="grid grid-cols-7 gap-2 pr-2">
                          <span className="truncate col-span-1">{item.type}</span>
                          <span className="font-medium truncate col-span-2">{item.name}</span>
                          <span className="truncate">{item.costType}</span>
                          <span className="truncate">${item.cost}</span>
                          <span className="truncate col-span-1">{item.qtyType}</span>
                          <span className="truncate">{item.qty}</span>                          
                        </div>
                      </div>

                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>
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
              <TableHead>Qty</TableHead>
              <TableHead className="w-[52px]"></TableHead>
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
                <TableCell>{cost.qty}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCost(cost.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Costs 