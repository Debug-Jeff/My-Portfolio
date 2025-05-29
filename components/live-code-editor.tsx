"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Copy, Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const initialCode = `// Interactive React Component
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Interactive Counter</h2>
      <div style={{ 
        fontSize: '2rem', 
        margin: '20px 0',
        color: count > 0 ? 'green' : count < 0 ? 'red' : 'black'
      }}>
        {count}
      </div>
      <div>
        <button onClick={decrement} style={{ margin: '0 5px' }}>
          -
        </button>
        <button onClick={reset} style={{ margin: '0 5px' }}>
          Reset
        </button>
        <button onClick={increment} style={{ margin: '0 5px' }}>
          +
        </button>
      </div>
    </div>
  );
}

// Render the component
ReactDOM.render(<Counter />, document.getElementById('output'));`

export default function LiveCodeEditor() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    try {
      // Simulate code execution
      setTimeout(() => {
        setOutput("Code executed successfully! Check the preview below.")
        setIsRunning(false)
      }, 1000)
    } catch (error) {
      setOutput(`Error: ${error}`)
      setIsRunning(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copied!",
      description: "The code has been copied to your clipboard.",
    })
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "component.jsx"
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border rounded-lg overflow-hidden shadow-lg"
    >
      <div className="code-editor-header">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm font-medium">Live Code Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={copyCode}>
            <Copy size={14} className="mr-1" />
            Copy
          </Button>
          <Button size="sm" variant="outline" onClick={downloadCode}>
            <Download size={14} className="mr-1" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={resetCode}>
            <RotateCcw size={14} className="mr-1" />
            Reset
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning}>
            <Play size={14} className="mr-1" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="code-editor-content">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-transparent text-sm font-mono resize-none outline-none"
            spellCheck={false}
          />
        </div>

        <div className="border-l border-border">
          <div className="p-4 border-b border-border bg-muted/50">
            <h4 className="font-medium">Preview</h4>
          </div>
          <div className="p-4 h-96 overflow-auto">
            {output && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-sm">
                {output}
              </div>
            )}

            {/* Simulated component preview */}
            <div className="bg-white dark:bg-gray-900 border rounded p-4">
              <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
                <h2>Interactive Counter</h2>
                <div style={{ fontSize: "2rem", margin: "20px 0", color: "black" }}>0</div>
                <div>
                  <button style={{ margin: "0 5px", padding: "5px 10px" }}>-</button>
                  <button style={{ margin: "0 5px", padding: "5px 10px" }}>Reset</button>
                  <button style={{ margin: "0 5px", padding: "5px 10px" }}>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
