export default function OrbitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div
        className="
          absolute

          w-[900px]
          h-[900px]

          border

          border-violet-400/10

          rounded-full

          right-[-250px]
          top-1/2

          -translate-y-1/2
        "
      />

      <div
        className="
          absolute

          w-5
          h-5

          rounded-full

          bg-white

          right-[180px]
          top-[32%]

          shadow-[0_0_40px_white]
        "
      />

    </div>
  );
}