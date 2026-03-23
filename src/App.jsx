import { useState } from "react";

const agents = [
  { name: "Astra", role: "Controller", img: "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png"},
  { name: "Breach", role: "Initiator", img: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png"},
  { name: "Brimstone", role: "Controller", img: "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png"},
  { name: "Chamber", role: "Sentinel", img: "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png"},
  { name: "Clove", role:"Controller", img:"Agents/clove.png"},
  { name: "Cypher", role: "Sentinel", img: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png"},
  { name: "Deadlock", role:"Sentinel", img:"Agents/deadlock.webp"},
  { name: "Fade", role: "Initiator", img: "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png"},
  { name: "Gekko", role: "Initiator", img: "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png"},
  { name: "Harbor", role: "Controller", img: "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png"},
  { name: "Iso", role:"Duelist", img:"Agents/iso.png"},
  { name: "Jett", role: "Duelist", img: "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png"},
  { name: "KAY/O", role: "Initiator", img: "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png"},
  { name: "Killjoy", role: "Sentinel", img: "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png"},
  { name: "Miks", role:"Controller", img:"Agents/miks.webp"},
  { name: "Neon", role: "Duelist", img: "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png"},
  { name: "Omen", role: "Controller", img: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png"},
  { name: "Phoenix", role: "Duelist", img: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png"},
  { name: "Raze", role:"Duelist", img:"Agents/raze.png"},
  { name: "Reyna", role: "Duelist", img: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png"},
  { name: "Sage", role: "Sentinel", img: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png"},
  { name: "Skye", role: "Initiator", img: "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png"},
  { name: "Sova", role: "Initiator", img: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png"},
  { name: "Tejo", role:"Initiator", img:"Agents/tejo.png"},
  { name: "Veto", role:"Sentinel", img:"Agents/veto.webp"},
  { name: "Viper", role: "Controller", img: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png"},
  { name: "Vyse", role:"Sentinel", img:"Agents/vyse.webp"},
  { name: "Waylay", role:"Duelist", img:"Agents/waylay.webp"},
  { name: "Yoru", role: "Duelist", img: "Agents/yoru.webp"},  
];

export default function App() {

  const [eliminated, setEliminated] = useState([]);
  const [secretAgent, setSecretAgent] = useState("");
  const [reveal, setReveal] = useState(false);

  function toggleAgent(name) {
    if (eliminated.includes(name)) {
      setEliminated(eliminated.filter(a => a !== name));
    } else {
      setEliminated([...eliminated, name]);
    }
  }

  function resetBoard(){
    setEliminated([]);
    setSecretAgent("");
    setReveal(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07152a] to-[#020617] text-white p-6">

      <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">
        Valorant Guess Who
      </h1>

      <div className="flex justify-center gap-4 mb-4">

        <select
          className="bg-gray-800 p-2 rounded"
          value={secretAgent}
          onChange={(e)=>setSecretAgent(e.target.value)}
        >
          <option value="">Choose My Agent</option>
          {agents.map(a => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>

        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          onClick={resetBoard}
        >
          Reset Board
        </button>

      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(170px,1fr))"
        }}
      >

        {agents.map(agent => {

          const eliminatedCard = eliminated.includes(agent.name);

          return (
            <div
              key={agent.name}
              onClick={()=>toggleAgent(agent.name)}
              className={`
                relative
                bg-[#0f1c33]
                rounded-xl
                border border-[#243a5e]
                cursor-pointer
                overflow-hidden
                transition
                hover:scale-105
                hover:shadow-lg
                hover:shadow-red-500/30
                ${eliminatedCard ? "opacity-30 grayscale" : ""}
              `}
            >

              {eliminatedCard && (
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-red-500">
                  ✕
                </div>
              )}

              <img
                src={agent.img}
                alt={agent.name}
                className="w-full h-36 object-cover object-top"
              />

              <div className="p-3 text-center">

                <div className="font-semibold text-lg">
                  {agent.name}
                </div>

                <div className="text-gray-400 text-sm">
                  {agent.role}
                </div>

              </div>

            </div>
          )

        })}

      </div>

    </div>
  );
}