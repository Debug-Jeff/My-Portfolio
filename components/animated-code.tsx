"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const codeSnippets = {
  python: `# Cybersecurity Scanner
import nmap
import socket

def scan_network(target):
    nm = nmap.PortScanner()
    result = nm.scan(target, '22-443')
    return result

def check_vulnerabilities(host):
    # Vulnerability assessment
    vulnerabilities = []
    # Check for open ports
    for port in [21, 22, 23, 80, 443]:
        sock = socket.socket()
        result = sock.connect_ex((host, port))
        if result == 0:
            vulnerabilities.append(f"Port {port} open")
    return vulnerabilities`,

  javascript: `// React Security Component
import React, { useState, useEffect } from 'react';
import { validateInput, sanitizeData } from './security';

const SecureForm = () => {
  const [data, setData] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const result = await validateInput(data);
      setIsValid(result.isValid);
    };
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitized = sanitizeData(data);
    // Process secure data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="secure-input"
      />
    </form>
  );
};`,

  typescript: `// Type-safe API Client
interface SecurityConfig {
  apiKey: string;
  endpoint: string;
  timeout: number;
}

class SecureApiClient {
  private config: SecurityConfig;
  
  constructor(config: SecurityConfig) {
    this.config = config;
  }

  async fetchSecureData<T>(path: string): Promise<T> {
    const response = await fetch(\`\${this.config.endpoint}\${path}\`, {
      headers: {
        'Authorization': \`Bearer \${this.config.apiKey}\`,
        'Content-Type': 'application/json',
      },
      timeout: this.config.timeout,
    });
    
    if (!response.ok) {
      throw new Error('Security validation failed');
    }
    
    return response.json();
  }
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self'">
    <title>Secure Web App</title>
</head>
<body>
    <header class="secure-header">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <h1>Secure by Design</h1>
            <p>Building applications with security in mind</p>
        </section>
    </main>
</body>
</html>`,

  sql: `-- Secure Database Queries
-- User authentication with prepared statements
PREPARE user_login AS 
SELECT user_id, username, password_hash, role
FROM users 
WHERE username = $1 AND active = true;

-- Audit log for security events
CREATE TABLE security_audit (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    action VARCHAR(100) NOT NULL,
    ip_address INET,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details JSONB
);

-- Function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
    p_user_id INTEGER,
    p_action VARCHAR,
    p_ip_address INET,
    p_details JSONB DEFAULT '{}'
) RETURNS VOID AS $$
BEGIN
    INSERT INTO security_audit (user_id, action, ip_address, details)
    VALUES (p_user_id, p_action, p_ip_address, p_details);
END;
$$ LANGUAGE plpgsql;`,
}

export default function AnimatedCode() {
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof codeSnippets>("python")
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const languages = Object.keys(codeSnippets) as (keyof typeof codeSnippets)[]

  useEffect(() => {
    const currentCode = codeSnippets[currentLanguage]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentCode.length) {
            setDisplayedCode(currentCode.slice(0, currentIndex + 1))
            setCurrentIndex(currentIndex + 1)
          } else {
            // Start deleting after a pause
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentIndex > 0) {
            setDisplayedCode(currentCode.slice(0, currentIndex - 1))
            setCurrentIndex(currentIndex - 1)
          } else {
            // Switch to next language
            setIsDeleting(false)
            const nextLanguageIndex = (languages.indexOf(currentLanguage) + 1) % languages.length
            setCurrentLanguage(languages[nextLanguageIndex])
          }
        }
      },
      isDeleting ? 20 : 50,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, isDeleting, currentLanguage, languages])

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-mono text-muted-foreground">
            {currentLanguage}.
            {currentLanguage === "javascript" || currentLanguage === "typescript"
              ? "tsx"
              : currentLanguage === "python"
                ? "py"
                : currentLanguage}
          </span>
        </div>
        <motion.div
          className="text-xs text-primary"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          {currentLanguage.toUpperCase()}
        </motion.div>
      </div>

      <pre className="text-sm font-mono text-foreground/80 whitespace-pre-wrap">
        <code>
          {displayedCode}
          <motion.span
            className="inline-block w-2 h-5 bg-primary ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          />
        </code>
      </pre>
    </div>
  )
}
