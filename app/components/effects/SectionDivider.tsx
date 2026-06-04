export default function SectionDivider() {
  return (
    <div
      className="
        relative

        h-[250px]

        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]
        "
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[500px]
          h-[1px]

          bg-gradient-to-r
          from-transparent
          via-violet-300/30
          to-transparent
        "
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-3
          h-3

          rounded-full

          bg-violet-300

          shadow-[0_0_30px_rgba(196,181,253,1)]
        "
      />
    </div>
  );
}