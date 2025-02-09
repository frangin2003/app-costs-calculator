export const KNOWN_COSTS = {
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
    { name: 'Replit Hacker Plan', cost: 7, type: 'Hosting', costType: 'Monthly', qtyType: 'NA', qty: 1 },
    { name: 'Replit Pro Plan', cost: 20, type: 'Hosting', costType: 'Monthly', qtyType: 'NA', qty: 1 }
  ],
  'Authentication': [
    { name: 'Google Firebase SMS 2FA', cost: 0.06, type: 'API', costType: 'Pay as you go', qtyType: 'SMS', qty: 1 },
    { name: 'Google Firebase Email Auth', cost: 0, type: 'API', costType: 'Free', qtyType: 'NA', qty: 1 },
    { name: 'Google Firebase Phone Auth', cost: 0, type: 'API', costType: 'Free', qtyType: 'NA', qty: 1 }
  ]
}

export const API_LINKS = [
  { name: 'Google TTS API', url: 'https://cloud.google.com/text-to-speech/pricing' },
  { name: 'Google STT API', url: 'https://cloud.google.com/speech-to-text/pricing' },
  { name: 'Groq API', url: 'https://groq.com/pricing/' },
  { name: 'OpenAI API', url: 'https://platform.openai.com/docs/pricing' },
  { name: 'Anthropic API', url: 'https://www.anthropic.com/pricing#anthropic-api' },
  { name: 'Google Gemini API', url: 'https://ai.google.dev/pricing#2_0flash' },
  { name: 'Vercel Plans', url: 'https://vercel.com/pricing' },
  { name: 'Replit Plans', url: 'https://replit.com/pricing' }
]

export const COST_TYPES = ['Pay as you go', 'Monthly', 'Yearly']
export const SERVICE_TYPES = ['API', 'Hosting', 'Database', 'Storage', 'CDN', 'Authentication']
export const QTY_TYPES = ['character', 'token', 'request', 'GB', 'CPU', 'NA'] 