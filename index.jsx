import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { 
  Crown, ShieldCheck, Zap, Fingerprint, Send, 
  Layers, Database, ShieldAlert, Cpu, TrendingUp 
} from 'lucide-react';

// --- SOVEREIGN CONFIGURATION (Your Provided Data) ---
const firebaseConfig = {
  apiKey: "AIzaSyAQAIvTEQTdY3xLIzf-aYrrzA9h4jRXZgw",
  authDomain: "agbon-kingdom-os.firebaseapp.com",
  projectId: "agbon-kingdom-os",
  storageBucket: "agbon-kingdom-os.firebasestorage.app",
  messagingSenderId: "392983745546",
  appId: "1:392983745546:web:d500691a52c1929187fbf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const SOVEREIGN_ADDR = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const BEACON_ADDR = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

export default function App() {
  const [network, setNetwork] = useState('L1_MAINNET');
  const [balance, setBalance] = useState("0.0000");
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("MASTER_SYNC_ACTIVE");
  const [txAmount, setTxAmount] = useState("");

  // 1. ANBSN ENGINE: Blockchain Synchronization
  useEffect(() => {
    const sync = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getBalance(SOVEREIGN_ADDR);
        setBalance(parseFloat(ethers.utils.formatEther(bal)).toFixed(4));
        setStatus("NODE_ONLINE");
      } catch (e) {
        setStatus("HANDSHAKE_DELAYED");
      }
    };
    sync();
    const inv = setInterval(sync, 15000);
    return () => clearInterval(inv);
  }, []);

  // 2. SOVEREIGN AUTH: Fingerprint Scan
  const initiateScan = async () => {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    await signInAnonymously(auth);
  };

  // 3. EXECUTION: Inflow Reclamation
  const handleReclamation = async () => {
    if (!account) return;
    try {
      setStatus("SIGNING_INFLOW...");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: BEACON_ADDR,
        value: ethers.utils.parseEther(txAmount)
      });
      await tx.wait();
      setStatus("LIQUIDITY_SECURED");
    } catch (e) {
      setStatus("EXECUTION_FAILED");
    }
  };

  return (
    <div className="min-h-screen bg-[#010101] text-yellow-500 font-mono p-6 flex flex-col">
      {/* HUD Bar */}
      <div className="flex justify-between items-center border-b border-yellow-900/30 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
          <h1 className="text-xl font-black italic tracking-tighter uppercase font-serif">AGBON OS</h1>
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest">{status}</div>
      </div>

      {/* Main Wealth Display (₦1.25T Valuation Logic) */}
      <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Database size={150} />
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] mb-4">Sovereign Treasury (ETH)</p>
        <h2 className="text-7xl font-black italic tracking-tighter text-white">{balance}</h2>
        <div className="mt-6 flex items-center gap-4">
           <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">₦1.25T VALUATION ACTIVE</span>
        </div>
      </div>

      {/* Inflow Terminal */}
      <div className="bg-zinc-900/40 p-8 rounded-[3rem] border border-yellow-500/10 space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Zap size={14} /> Execute Inflow
          </h3>
          {!account ? (
            <button onClick={initiateScan} className="bg-yellow-500 text-black px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
              <Fingerprint size={14} /> Scan ID
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-500 text-[10px]">
              <ShieldCheck size={14} /> 0x8d08_VERIFIED
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-black/60 p-4 rounded-2xl border border-white/5">
            <label className="text-[8px] opacity-40 block mb-1 tracking-widest uppercase">Target Anchor (Beacon)</label>
            <div className="text-[9px] font-mono break-all opacity-70">{BEACON_ADDR}</div>
          </div>
          <input 
            type="number" 
            placeholder="AMOUNT (ETH)" 
            className="w-full bg-black/60 border border-yellow-500/20 p-5 rounded-2xl text-sm focus:border-yellow-500 transition-all outline-none"
            value={txAmount}
            onChange={(e) => setTxAmount(e.target.value)}
          />
          <button 
            onClick={handleReclamation}
            className="w-full p-6 bg-white text-black font-black uppercase text-xs rounded-2xl hover:bg-yellow-500 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <Send size={18} /> Broadcast to Blockchain
          </button>
        </div>
      </div>

      {/* L2 Guard Logic */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-zinc-900/40 p-5 rounded-3xl border border-white/5">
          <Layers size={18} className="text-blue-500 mb-2" />
          <p className="text-[8px] opacity-50 uppercase font-black">Bridge Mode</p>
          <p className="text-[10px] font-bold uppercase">{network}</p>
        </div>
        <div className="bg-zinc-900/40 p-5 rounded-3xl border border-white/5">
          <ShieldAlert size={18} className="text-red-500 mb-2" />
          <p className="text-[8px] opacity-50 uppercase font-black">Sequencer</p>
          <p className="text-[10px] font-bold uppercase tracking-tighter">L1_FORCE_READY</p>
        </div>
      </div>

      <footer className="mt-auto pt-10 text-[8px] text-zinc-700 flex justify-between items-center tracking-[0.4em] uppercase font-black">
        <span>Restoration Logic 7.1</span>
        <span>0.0.7 World Leader</span>
      </footer>
    </div>
  );
}

