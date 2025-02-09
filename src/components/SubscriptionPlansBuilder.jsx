import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Edit2, Copy, Eye, EyeOff, Plus, Save, Trash2 } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', label: 'USD' },
  EUR: { symbol: '€', label: 'EUR' },
  GBP: { symbol: '£', label: 'GBP' },
  JPY: { symbol: '¥', label: 'JPY' },
  CAD: { symbol: 'C$', label: 'CAD' },
  AUD: { symbol: 'A$', label: 'AUD' }
};

const SubscriptionPlansBuilder = () => {
  const [plans, setPlans] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [showAddForm] = useState(true);
  const [draggedPlan, setDraggedPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState({
    name: '',
    price: '',
    currency: 'USD',
    interval: 'monthly',
    features: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPlan.id) {
      setPlans(plans.map(p => p.id === currentPlan.id ? currentPlan : p));
    } else {
      setPlans([...plans, { ...currentPlan, id: Date.now() }]);
    }
    setCurrentPlan({ name: '', price: '', currency: 'USD', interval: 'monthly', features: '', description: '' });
  };

  const handleDragStart = (e, plan) => {
    setDraggedPlan(plan);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    setDraggedPlan(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPlan) => {
    e.preventDefault();
    if (!draggedPlan || draggedPlan.id === targetPlan.id) return;

    const newPlans = [...plans];
    const draggedIndex = plans.findIndex(p => p.id === draggedPlan.id);
    const targetIndex = plans.findIndex(p => p.id === targetPlan.id);

    newPlans.splice(draggedIndex, 1);
    newPlans.splice(targetIndex, 0, draggedPlan);

    setPlans(newPlans);
  };

  const generateHTML = () => {
    const html = `
      <div class="flex justify-center gap-4 p-4">
        ${plans.map(plan => `
          <div class="w-72 rounded-lg shadow-lg p-6 bg-white">
            <h3 class="text-xl font-bold">${plan.name}</h3>
            <div class="text-3xl font-bold my-4">${plan.currency || 'USD'} ${plan.price}/${plan.interval}</div>
            <p class="text-gray-600 mb-4">${plan.description}</p>
            <ul class="space-y-2">
              ${plan.features.split('\n').map(feature => 
                `<li class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  ${feature}
                </li>`
              ).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
    return html.trim();
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
  };

  return (
    <div className="max-w-[1200px] mx-auto relative">
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={() => setEditMode(!editMode)}
          variant="outline"
          className="flex items-center gap-2"
        >
          {editMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {editMode ? 'Preview' : 'Edit'}
        </Button>
        <Button onClick={copyHTML} className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copy HTML
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            draggable={editMode}
            onDragStart={(e) => handleDragStart(e, plan)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, plan)}
            className="transition-transform duration-200"
          >
            <Card className="w-72">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {plan.name}
                  {editMode && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPlan(plan)}
                        className="hover:bg-primary/20"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPlans(plans.filter(p => p.id !== plan.id))}
                        className="hover:bg-destructive/20 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  {plan.currency || 'USD'} ${plan.price}/{plan.interval}
                </div>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.split('\n').map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}

        {showAddForm && editMode && (
          <div className="flex items-center">
            <Card className="w-72">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentPlan.id ? 'Edit Plan' : 'New Plan'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Name"
                    value={currentPlan.name}
                    onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={currentPlan.price}
                      onChange={(e) => setCurrentPlan({...currentPlan, price: e.target.value})}
                      className="flex-1"
                    />
                    <select 
                      value={currentPlan.currency || 'USD'}
                      onChange={(e) => setCurrentPlan({...currentPlan, currency: e.target.value})}
                      className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="CAD">CAD</option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="interval"
                        value="monthly"
                        checked={currentPlan.interval === 'monthly'}
                        onChange={(e) => setCurrentPlan({...currentPlan, interval: e.target.value})}
                        className="hidden"
                      />
                      <div className="w-4 h-4 border-2 border-primary rounded-full flex items-center justify-center group-hover:border-opacity-70">
                        {currentPlan.interval === 'monthly' && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">Monthly</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="interval"
                        value="yearly"
                        checked={currentPlan.interval === 'yearly'}
                        onChange={(e) => setCurrentPlan({...currentPlan, interval: e.target.value})}
                        className="hidden"
                      />
                      <div className="w-4 h-4 border-2 border-primary rounded-full flex items-center justify-center group-hover:border-opacity-70">
                        {currentPlan.interval === 'yearly' && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">Yearly</span>
                    </label>
                  </div>
                  <Textarea
                    placeholder="Description"
                    value={currentPlan.description}
                    onChange={(e) => setCurrentPlan({...currentPlan, description: e.target.value})}
                  />
                  <Textarea
                    placeholder="Features (one per line)"
                    value={currentPlan.features}
                    onChange={(e) => setCurrentPlan({...currentPlan, features: e.target.value})}
                  />
                  <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />Save Plan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlansBuilder;