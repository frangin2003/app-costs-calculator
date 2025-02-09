import { Button } from "./ui/button"

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'costs', label: 'Costs' },
    { id: 'plans', label: 'Plan Editor' },
    { id: 'tokens', label: 'Token Visualisation' }
  ]

  return (
    <div className="inline-flex items-center gap-2 bg-muted p-1 rounded-lg">
      {tabs.map(tab => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          onClick={() => setActiveTab(tab.id)}
          className="min-w-32"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

export default Tabs
