import { useState } from 'react'
import { WeightItem } from './global'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function App() {
  const [weights, setWeights] = useState<WeightItem[]>([])
  const [currentWeight, setCurrentWeight] = useState<string>('0')

  return (
    <div className='flex flex-col items-center justify-center max-w-screen-md p-5 mx-auto'>
      <h1 className='my-4 text-2xl font-bold text-pink-600'>Weight Tracker</h1>
      <div className='relative w-40 h-40 mb-10 border border-pink-600 rounded-full border-3'>
        <div className='absolute top-[50%] translate-y-[-50%] left-0 right-0 text-center text-2xl font-bold text-pink-600'>{currentWeight} Kg.</div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <input type='number' className='px-3 py-2 border border-pink-600 outline-none' value={currentWeight} onChange={(e) => {
          setCurrentWeight(() => e.target.value)
        }} />
        <button className='px-3 py-2 text-white bg-pink-600 border border-pink-600 outline-none' onClick={() => {
          setWeights((o) => ([...o, { weight: currentWeight, date: new Date().toLocaleString() }]))
          setCurrentWeight(() => '0')
        }}>Add</button>
      </form>
      <div className='py-3 my-3'>
        <ResponsiveContainer minWidth={400} minHeight={400}>
          <LineChart data={weights} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {weights.length > 0 ?
        <div className='flex flex-col w-full mt-3 divide-y'>
          <h2 className='my-3 text-2xl font-bold text-center'>Show last 7 items</h2>
          <div className='flex justify-around w-full px-3 py-2'>
            <div>Weight (Kg.)</div>
            <div>Time</div>
          </div>
          {weights.slice(Math.max(weights.length - 7, 0)).sort((a, b) => {
            if (Date.parse(a.date) - Date.parse(b.date) < 0) return 1
            else if (Date.parse(a.date) - Date.parse(b.date) === 0) return 0
            else return -1
          }).map((w, i) => (
            <div className='flex justify-around w-full px-3 py-2' key={i}>
              <div>{w.weight} Kg.</div>
              <div>{w.date}</div>
            </div>
          ))}
        </div>
        : null}
    </div>
  )
}

export default App
