import { useState, useMemo, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Search, Trash2 } from 'lucide-react'

const COST_TYPES = ['Pay as you go', 'Monthly', 'Yearly']
const SERVICE_TYPES = ['API', 'Hosting', 'Database', 'Storage', 'CDN', 'Authentication']
const QTY_TYPES = ['character', 'token', 'request', 'GB', 'CPU', 'NA']

const initialCosts = []

const KNOWN_COSTS = {
  'LLM': [
    // OpenAI Models - Core
    { name: 'OpenAI gpt-4o (input)', currency: '$USD', cost: 2.5, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'OpenAI gpt-4o (output)', currency: '$USD', cost: 10, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'OpenAI o1 (input)', currency: '$USD', cost: 15, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'OpenAI o1 (output)', currency: '$USD', cost: 60, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'OpenAI o3-mini (input)', currency: '$USD', cost: 0.15, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },   
    { name: 'OpenAI o3-mini (output)', currency: '$USD', cost: 0.6, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },

    // Claude Models
    { name: 'Claude 3 Opus (input)', currency: '$USD', cost: 15, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Claude 3 Opus (output)', currency: '$USD', cost: 75, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Claude 3.5 Sonnet (input)', currency: '$USD', cost: 3, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Claude 3.5 Sonnet (output)', currency: '$USD', cost: 15, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Claude 3.5 Haiku (input)', currency: '$USD', cost: 0.8, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Claude 3.5 Haiku (output)', currency: '$USD', cost: 4, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },

    // Groq Models
    { name: 'Groq DeepSeek R1 Distill Llama 70B (input)', currency: '$USD', cost: 0.75, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq DeepSeek R1 Distill Llama 70B (output)', currency: '$USD', cost: 0.99, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Llama 3.3 70B Versatile 128k (input)', currency: '$USD', cost: 3, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Llama 3.3 70B Versatile 128k (output)', currency: '$USD', cost: 15, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Whisper V3 Large 189x', currency: '$USD', cost: 0.111, type: 'API', costType: 'Pay as you go', qtyType: 'hour', qty: 1 },
    { name: 'Groq Whisper Large V3 Turbo 216x', currency: '$USD', cost: 0.04, type: 'API', costType: 'Pay as you go', qtyType: 'hour', qty: 1 },
    { name: 'Groq Distil-Whisper 250x', currency: '$USD', cost: 0.02, type: 'API', costType: 'Pay as you go', qtyType: 'hour', qty: 1 },
    { name: 'Groq Llama 3.2 11B Vision 8k (input)', currency: '$USD', cost: 0.18, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Llama 3.2 11B Vision 8k (output)', currency: '$USD', cost: 0.18, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Llama 3.2 90B Vision 8k (input)', currency: '$USD', cost: 0.9, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Groq Llama 3.2 90B Vision 8k (output)', currency: '$USD', cost: 0.9, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },

    // Gemini Models
    { name: 'Gemini 2.0 Flash (input)', currency: '$USD', cost: 0.1, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Gemini 2.0 Flash (output)', currency: '$USD', cost: 0.4, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Gemini 2.0 Flash-Lite (input)', currency: '$USD', cost: 0.075, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
    { name: 'Gemini 2.0 Flash-Lite (output)', currency: '$USD', cost: 0.3, type: 'API', costType: 'Pay as you go', qtyType: 'token', qty: 1000000 },
  ],
  'Text-to-Speech': [
    { name: 'OpenAI Whisper', currency: '$USD', cost: 0.006, type: 'API', costType: 'Pay as you go', qtyType: 'minute', qty: 1 },
    { name: 'OpenAI TTS', currency: '$USD', cost: 15, type: 'API', costType: 'Pay as you go', qtyType: 'character', qty: 1000000 },
    { name: 'OpenAI TTS HD', currency: '$USD', cost: 30, type: 'API', costType: 'Pay as you go', qtyType: 'character', qty: 1000000 },
    { name: 'Google TTS Standard', cost: 4, type: 'API', costType: 'Pay as you go', qtyType: 'character', qty: 1000000 },
    { name: 'Google TTS Wavenet', cost: 16, type: 'API', costType: 'Pay as you go', qtyType: 'character', qty: 1000000 },
    { name: 'Google TTS Neural2', cost: 16, type: 'API', costType: 'Pay as you go', qtyType: 'character', qty: 1000000 },
    { name: 'Google STT V2', cost: 0.016, type: 'API', costType: 'Pay as you go', qtyType: 'minute', qty: 1 },
  ],
  'Image Generation': [
    { name: 'OpenAI DALL·E 3 HD (1024*1024)', currency: '$USD', cost: .08, type: 'API', costType: 'Pay as you go', qtyType: 'image', qty: 1 },
    { name: 'OpenAI DALL·E 3 HD (1024*1792)', currency: '$USD', cost: .12, type: 'API', costType: 'Pay as you go', qtyType: 'image', qty: 1 },
  ],
  'Hosting': [
    { name: 'Replit Hacker Plan', cost: 7, type: 'Hosting', costType: 'Monthly', qtyType: 'NA' },
    { name: 'Replit Pro Plan', cost: 20, type: 'Hosting', costType: 'Monthly', qtyType: 'NA' }
  ],
  
  'Authentication': [
    { name: 'Google Firebase SMS 2FA', cost: 0.06, type: 'API', costType: 'Pay as you go', qtyType: 'SMS' },
    { name: 'Google Firebase Email Auth', cost: 0, type: 'API', costType: 'Free', qtyType: 'NA' },
    { name: 'Google Firebase Phone Auth', cost: 0, type: 'API', costType: 'Free', qtyType: 'NA' }
  ]
}

const API_LINKS = [
  { name: 'Google TTS API', url: 'https://cloud.google.com/text-to-speech/pricing' },
  { name: 'Google STT API', url: 'https://cloud.google.com/speech-to-text/pricing' },
  { name: 'Groq API', url: 'https://groq.com/pricing/' },
  { name: 'OpenAI API', url: 'https://platform.openai.com/docs/pricing' },
  { name: 'Anthropic API', url: 'https://www.anthropic.com/pricing#anthropic-api' },
  { name: 'Google Gemini API', url: 'https://ai.google.dev/pricing#2_0flash' },
  { name: 'Vercel Plans', url: 'https://vercel.com/pricing' },
  { name: 'Replit Plans', url: 'https://replit.com/pricing' }
];

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
                        <div className="grid grid-cols-5 gap-4 pr-4">
                          <span className="truncate">{item.type}</span>
                          <span className="font-medium truncate">{item.name}</span>
                          <span className="truncate">{item.costType}</span>
                          <span className="truncate">${item.cost}</span>
                          <span className="truncate">{item.qtyType}</span>
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
              <TableHead>Qty per user</TableHead>
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
                <TableCell>{cost.qtyPerUser}</TableCell>
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