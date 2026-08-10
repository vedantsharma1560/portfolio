import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Trash2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { downloadResumeDirectly } from '../utils/downloadResume';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string | React.ReactNode;
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({
  isOpen,
  onClose,
  onNavigateToContact,
  onOpenResume,
  onToggleTheme,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Vedant Sharma Shell (v2.5.0-x86_64-cloudrun)'
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to see available commands or "projects" to list works.'
    }
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: CommandLog[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `$ ${inputVal}` }
    ];

    if (cmd === 'help') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: (
          <div className="space-y-1 text-xs font-mono text-emerald-300">
            <p className="text-white font-bold mb-1">Available Terminal Commands:</p>
            <p>• <span className="text-amber-300 font-bold">about</span> - Print bio, location and core background</p>
            <p>• <span className="text-amber-300 font-bold">skills</span> - Display technical stack matrix</p>
            <p>• <span className="text-amber-300 font-bold">projects</span> - List top featured projects</p>
            <p>• <span className="text-amber-300 font-bold">contact</span> - Scroll down to contact card</p>
            <p>• <span className="text-amber-300 font-bold">resume</span> - Open interactive resume modal</p>
            <p>• <span className="text-amber-300 font-bold">theme</span> - Toggle light/dark visual theme</p>
            <p>• <span className="text-amber-300 font-bold">sudo hire</span> - Direct shortcut to hire proposal</p>
            <p>• <span className="text-amber-300 font-bold">clear</span> - Wipe terminal output buffer</p>
            <p>• <span className="text-amber-300 font-bold">exit</span> - Close terminal window</p>
          </div>
        )
      });
    } else if (cmd === 'about') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}\nLocation: ${PERSONAL_INFO.location}\nBio: ${PERSONAL_INFO.fullBio}`
      });
    } else if (cmd === 'skills') {
      const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => `${s.name} (${s.level}%)`)).join(', ');
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Technical Stack: ${allSkills}`
      });
    } else if (cmd === 'projects') {
      const projList = PROJECTS.map((p) => `• [${p.category}] ${p.title} -> ${p.demoUrl}`).join('\n');
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `Featured Projects:\n${projList}`
      });
    } else if (cmd === 'contact' || cmd === 'sudo hire') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'Navigating to contact section...'
      });
      onNavigateToContact();
      onClose();
    } else if (cmd === 'resume' || cmd === 'cv' || cmd === 'cat resume.txt') {
      downloadResumeDirectly();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'Downloading Vedant Sharma\'s resume directly...'
      });
    } else if (cmd === 'theme') {
      onToggleTheme();
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: 'Visual theme toggled.'
      });
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `command not found: "${cmd}". Type "help" for a list of valid commands.`
      });
    }

    setHistory(newLogs);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#060b08] border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl font-mono text-left my-8">
        
        {/* Terminal Titlebar */}
        <div className="bg-[#09120e] px-4 py-3 border-b border-emerald-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs text-gray-400 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              vedantsharma@cloud-run:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-gray-400 hover:text-white"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body Screen */}
        <div className="p-4 sm:p-6 h-[380px] overflow-y-auto space-y-3 text-xs sm:text-sm leading-relaxed">
          {history.map((log) => (
            <div key={log.id}>
              {log.type === 'system' && (
                <p className="text-gray-500">{log.text}</p>
              )}
              {log.type === 'input' && (
                <p className="text-emerald-400 font-bold">{log.text}</p>
              )}
              {log.type === 'output' && (
                <div className="text-gray-300 whitespace-pre-wrap">{log.text}</div>
              )}
              {log.type === 'error' && (
                <p className="text-red-400">{log.text}</p>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Prompt Line */}
        <form onSubmit={handleCommand} className="bg-[#08100c] px-4 py-3 border-t border-emerald-950/60 flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-xs">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help'..."
            className="w-full bg-transparent border-none text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none font-mono"
          />
          <button type="submit" className="p-1 text-emerald-400 hover:text-emerald-300">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
