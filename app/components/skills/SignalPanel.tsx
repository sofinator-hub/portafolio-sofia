type Skill = {
  name: string;
  level: string;
  frequency: string;
  description: string;
  tags: string[];
};

interface SignalPanelProps {
  skill: Skill | null;
}

export default function SignalPanel({
  skill,
}: SignalPanelProps) {
  if (!skill) return null;

  return (
    <div
      className="
        absolute
        top-8
        right-8

        w-[320px]

        rounded-3xl

        border
        border-white/10

        bg-black/50
        backdrop-blur-xl

        p-6

        z-20
      "
    >
      <p className="text-white/40 text-xs tracking-[0.2em] mb-6">
        SEÑAL ANALIZADA
      </p>

      <h3 className="text-3xl font-bold mb-2">
        {skill.name}
      </h3>

      <p className="text-violet-300 mb-4">
        Nivel: {skill.level}
      </p>

      <p className="text-white/60 text-sm leading-relaxed mb-6">
        {skill.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="
              px-3
              py-1

              rounded-full

              border
              border-white/10

              text-xs
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}