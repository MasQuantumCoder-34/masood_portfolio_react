import React, { useEffect, useState } from 'react';

export default function LiveTerminal() {
  const [commands, setCommands] = useState([]);
  const codeSequence = [
    { cmd: '$ npm install masood-portfolio', delay: 1000 },
    { cmd: '✓ Installing dependencies...', delay: 2000 },
    { cmd: '✓ Building amazing projects...', delay: 3000 },
    { cmd: '✓ Deploying innovation...', delay: 4000 },
    { cmd: '🚀 Ready to impress recruiters!', delay: 5000 }
  ];

  useEffect(() => {
    codeSequence.forEach((item) => {
      setTimeout(() => {
        setCommands(prev => [...prev, item.cmd]);
      }, item.delay);
    });
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm shadow-2xl border border-green-500/30 overflow-hidden">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      {commands.map((cmd, idx) => (
        <div key={idx} className="text-green-400 mb-2 animate-slide-up">
          {cmd}
        </div>
      ))}
      <div className="text-green-400 animate-pulse">▊</div>
    </div>
  );
}
