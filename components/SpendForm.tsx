'use client'

import { Tool } from '@/lib/auditEngine'

const TOOLS = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'github_copilot', label: 'GitHub Copilot' },
  { value: 'claude', label: 'Claude' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'anthropic_api', label: 'Anthropic API' },
  { value: 'openai_api', label: 'OpenAI API' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'windsurf', label: 'Windsurf' },
]

const PLANS: Record<string, string[]> = {
  cursor: ['hobby', 'pro', 'business', 'enterprise'],
  github_copilot: ['individual', 'business', 'enterprise'],
  claude: ['free', 'pro', 'max', 'team', 'enterprise'],
  chatgpt: ['plus', 'team', 'enterprise'],
  anthropic_api: ['api'],
  openai_api: ['api'],
  gemini: ['pro', 'ultra', 'api'],
  windsurf: ['free', 'pro', 'teams'],
}

const USE_CASES = ['coding', 'writing', 'data', 'research', 'mixed']

type Props = {
  tools: Tool[]
  teamSize: number
  useCase: string
  onUpdateTool: (index: number, field: keyof Tool, value: string | number) => void
  onAddTool: () => void
  onRemoveTool: (index: number) => void
  onTeamSizeChange: (size: number) => void
  onUseCaseChange: (useCase: string) => void
  onSubmit: () => void
}

export default function SpendForm({
  tools, teamSize, useCase,
  onUpdateTool, onAddTool, onRemoveTool,
  onTeamSizeChange, onUseCaseChange, onSubmit
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Team info */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team size
          </label>
          <input
            type="number"
            min={1}
            value={teamSize}
            onChange={e => onTeamSizeChange(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary use case
          </label>
          <select
            value={useCase}
            onChange={e => onUseCaseChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            {USE_CASES.map(u => (
              <option key={u} value={u}>
                {u.charAt(0).toUpperCase() + u.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tools list */}
      <h2 className="text-sm font-medium text-gray-700 mb-3">Your AI tools</h2>
      <div className="space-y-3 mb-6">
        {tools.map((tool, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg">

            {/* Tool name */}
            <div className="col-span-4">
              <select
                value={tool.name}
                onChange={e => onUpdateTool(i, 'name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                {TOOLS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Plan */}
            <div className="col-span-3">
              <select
                value={tool.plan}
                onChange={e => onUpdateTool(i, 'plan', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                {(PLANS[tool.name] || ['pro']).map(p => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Seats */}
            <div className="col-span-2">
              <input
                type="number"
                min={1}
                value={tool.seats}
                onChange={e => onUpdateTool(i, 'seats', Number(e.target.value))}
                placeholder="Seats"
                className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Monthly spend */}
            <div className="col-span-2">
              <input
                type="number"
                min={0}
                value={tool.monthlySpend}
                onChange={e => onUpdateTool(i, 'monthlySpend', Number(e.target.value))}
                placeholder="$/mo"
                className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Remove */}
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => onRemoveTool(i)}
                className="text-gray-400 hover:text-red-500 text-lg font-bold"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add tool button */}
      <button
        onClick={onAddTool}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 mb-8"
      >
        + Add another tool
      </button>

      {/* Submit */}
      <button
        onClick={onSubmit}
        className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors"
      >
        Run my audit →
      </button>
    </div>
  )
}