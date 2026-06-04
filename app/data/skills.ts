export const skills = [
  {
    id: "python",
    name: "Python",
    x: 52,
    y: 18,
    level: "Experto",
    frequency: "7.245 GHz",
    description:
      "Automatización, Backend, APIs y herramientas de ciberseguridad.",
    tags: [
      "Backend",
      "Automatización",
      "APIs",
      "Ciberseguridad",
    ],
  },

  {
    id: "fastapi",
    name: "FastAPI",
    x: 72,
    y: 34,
    level: "Avanzado",
    frequency: "5.812 GHz",
    description:
      "Desarrollo de APIs modernas y sistemas escalables.",
    tags: [
      "Backend",
      "REST",
      "Arquitectura",
    ],
  },

  {
    id: "cybersecurity",
    name: "Cybersecurity",
    x: 30,
    y: 40,
    level: "Avanzado",
    frequency: "9.101 GHz",
    description:
      "Seguridad ofensiva, análisis de vulnerabilidades y buenas prácticas.",
    tags: [
      "OWASP",
      "Pentesting",
      "Security",
    ],
  },

  {
    id: "javascript",
    name: "JavaScript",
    x: 52,
    y: 52,
    level: "Avanzado",
    frequency: "6.550 GHz",
    description:
      "Frontend moderno y experiencias interactivas.",
    tags: [
      "Frontend",
      "React",
      "Next.js",
    ],
  },

  {
    id: "docker",
    name: "Docker",
    x: 82,
    y: 46,
    level: "Intermedio",
    frequency: "4.220 GHz",
    description:
      "Contenedores y despliegue de aplicaciones.",
    tags: [
      "Containers",
      "DevOps",
      "Deploy",
    ],
  },

  {
    id: "postgresql",
    name: "PostgreSQL",
    x: 62,
    y: 72,
    level: "Avanzado",
    frequency: "5.975 GHz",
    description:
      "Diseño de bases de datos robustas y escalables.",
    tags: [
      "SQL",
      "Data",
      "Backend",
    ],
  },

  {
    id: "linux",
    name: "Linux",
    x: 82,
    y: 72,
    level: "Intermedio",
    frequency: "4.110 GHz",
    description:
      "Administración de sistemas y servidores.",
    tags: [
      "Servers",
      "CLI",
      "Infraestructura",
    ],
  },

  {
    id: "automation",
    name: "Automation",
    x: 52,
    y: 84,
    level: "Avanzado",
    frequency: "8.500 GHz",
    description:
      "Bots, scripts y automatización de procesos.",
    tags: [
      "Python",
      "Bots",
      "Workflows",
    ],
  },
];

export const connections = [
  ["python", "fastapi"],
  ["python", "javascript"],
  ["javascript", "postgresql"],
  ["javascript", "docker"],
  ["fastapi", "postgresql"],
  ["postgresql", "linux"],
  ["javascript", "automation"],
  ["cybersecurity", "python"],
];