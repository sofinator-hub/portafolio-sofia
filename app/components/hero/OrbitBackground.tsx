export default function OrbitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute w-[700px] h-[700px] border border-white/10 rounded-full right-[-100px] top-1/2 -translate-y-1/2" />

      <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full right-[0px] top-1/2 -translate-y-1/2 rotate-12" />

      <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full right-[80px] top-1/2 -translate-y-1/2 -rotate-12" />

      <div className="absolute w-4 h-4 bg-white rounded-full right-[250px] top-[40%] shadow-[0_0_40px_white]" />

    </div>
  );
}