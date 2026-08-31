import { AspectRatioOption, StyleOption } from "@workspace/types";

export const ASPECT_RATIOS: AspectRatioOption[] = [
  {
    id: "1:1",
    label: "Square",
    ratioText: "1:1",
    width: 1024,
    height: 1024,
    iconAspect: "aspect-square",
  },
  {
    id: "16:9",
    label: "Landscape",
    ratioText: "16:9",
    width: 1344,
    height: 768,
    iconAspect: "aspect-[16/9]",
  },
  {
    id: "9:16",
    label: "Portrait",
    ratioText: "9:16",
    width: 768,
    height: 1344,
    iconAspect: "aspect-[9/16]",
  },
  {
    id: "4:3",
    label: "Classic",
    ratioText: "4:3",
    width: 1152,
    height: 864,
    iconAspect: "aspect-[4/3]",
  },
  {
    id: "21:9",
    label: "Ultrawide",
    ratioText: "21:9",
    width: 1536,
    height: 640,
    iconAspect: "aspect-[21/9]",
  },
];
export const DEAFULT_ASPECT_RATIO = "1:1";

export const STYLES: StyleOption[] = [
  {
    id: "auto",
    name: "Auto",
    category: "Auto",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.24 25 / 55%), oklch(0.75 0.22 85 / 50%), oklch(0.68 0.22 200 / 50%), oklch(0.65 0.24 300 / 55%))",
    promptSuffix: "",
  },
  {
    id: "realistic",
    name: "Realistic",
    category: "Realism",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.22 45 / 55%), oklch(0.78 0.2 70 / 50%), oklch(0.68 0.22 25 / 55%))",
    promptSuffix:
      ", highly detailed, 8k resolution, photorealistic, cinematic lighting, sharp focus, professional DSLR photo",
  },
  {
    id: "anime",
    name: "Anime & Manga",
    category: "Artistic",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.24 340 / 55%), oklch(0.65 0.25 310 / 50%), oklch(0.62 0.25 275 / 55%))",
    promptSuffix:
      ", anime art style, vibrant colors, detailed lineart, dramatic lighting, 4k resolution",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    category: "Sci-Fi",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.23 195 / 55%), oklch(0.62 0.25 250 / 50%), oklch(0.65 0.26 320 / 55%))",
    promptSuffix:
      ", cyberpunk futuristic city, neon lights, rainy reflection, ultra-detailed, octane render, volumetric lighting",
  },
  {
    id: "cinematic",
    name: "Cinematic Dark",
    category: "Film",
    gradient:
      "linear-gradient(135deg, oklch(0.5 0.2 250 / 55%), oklch(0.4 0.22 285 / 50%), oklch(0.3 0.2 330 / 55%))",
    promptSuffix:
      ", cinematic movie scene, 35mm film grain, moody atmosphere, depth of field, anamorphic lens flair, masterpiece",
  },
  {
    id: "3d-render",
    name: "3D Blender",
    category: "Digital",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.23 150 / 55%), oklch(0.68 0.22 175 / 50%), oklch(0.7 0.22 205 / 55%))",
    promptSuffix:
      ", 3D render, Pixar style, smooth textures, ray tracing ambient occlusion, vibrant lighting, ultra clean",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    category: "Traditional",
    gradient:
      "linear-gradient(135deg, oklch(0.76 0.22 85 / 55%), oklch(0.7 0.23 60 / 50%), oklch(0.64 0.23 35 / 55%))",
    promptSuffix:
      ", classic oil painting on canvas, visible impasto brushstrokes, rich color palette, museum masterpiece, impressionism",
  },
  {
    id: "fantasy",
    name: "Fantasy Concept",
    category: "Concept",
    gradient:
      "linear-gradient(135deg, oklch(0.66 0.25 300 / 55%), oklch(0.62 0.25 330 / 50%), oklch(0.68 0.23 270 / 55%))",
    promptSuffix:
      ", epic fantasy landscape, magical aura, ethereal lighting, concept art, unreal engine 5",
  },
  {
    id: "minimalist",
    name: "Minimalist Vector",
    category: "Design",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.2 15 / 55%), oklch(0.8 0.2 55 / 50%), oklch(0.78 0.2 95 / 55%))",
    promptSuffix:
      ", minimalist vector art, flat design, clean geometry, pastel color palette, aesthetic poster design",
  },
];

export const DEFAULT_CFG = 7.5;
export const MIN_CFG = 1;
export const MAX_CFG = 20;

export const DEFAULT_STEPS = 1;
export const MIN_STEPS = 1;
export const MAX_STEPS = 30;

export const STYLE_ENUM = STYLES.map((item) => item.id);
export const DEFAULT_STYLE = "auto";

export const FORMATS = ["PNG", "JPG", "WEBP"];
export const DEFAULT_FORMAT = "PNG";

export const MODELS = [
  "@cf/black-forest-labs/flux-1-schnell",
  "@cf/black-forest-labs/flux-2-klein-9b",
  "@cf/stabilityai/stable-diffusion-xl-base-1.0",
  "@cf/bytedance/stable-diffusion-xl-lightning",
  "@cf/lykon/dreamshaper-8-lcm",
];
export const DEFAULT_MODEL = "@cf/black-forest-labs/flux-1-schnell";

export const SAMPLE_PROMPTS = [
  "A majestic cybernetic owl perched on a neon streetlight in futuristic Tokyo, rain reflections, volumetric fog, 8k DSLR quality",
  "An ancient mystical library inside a hollow giant redwood tree, glowing runes on leather books, ethereal sunlight rays through leaves",
  "A retro-futuristic astronaut lounging on a synthwave beach with pink sand and a double sunset over turquoise geometric ocean waves",
  "A cozy glass greenhouse filled with bioluminescent alien flora on a snowy mountain peak at dusk, warm interior glow",
  "A hyperdetailed portrait of a Victorian time-traveler holding an intricate brass pocket clock emitting golden particle dust",
  "A surreal floating island with crystal waterfalls spilling into infinite cloudscape, golden hour lighting, fantasy concept art",
  "A lone samurai standing beneath a massive ancient cherry tree during a moonlit snowfall, drifting petals, misty mountains in the distance",
  "A futuristic underground city built inside a colossal cavern, glowing trains, suspended gardens, towering holographic architecture",
  "A tiny seaside village carved into towering cliffs, warm lanterns glowing through the evening mist, fishing boats drifting below",
  "A celestial whale swimming through a galaxy of stars above a quiet desert observatory, cosmic dust and shimmering constellations",
  "An enchanted medieval market at midnight, floating lanterns, magical creatures, colorful potion stalls, cobblestone streets after rain",
  "A futuristic botanical laboratory on Mars, enormous glass domes filled with exotic plants, red desert stretching toward the horizon",
  "A mysterious black cat sitting on the roof of an old European cathedral during a thunderstorm, lightning illuminating the city below",
  "An ancient temple hidden deep within a tropical rainforest, giant stone statues covered in moss, sunbeams piercing through dense foliage",
  "A tiny robot gardener tending glowing flowers in a peaceful miniature greenhouse, morning sunlight, delicate mechanical details",
  "A grand steampunk airship flying above a sprawling Victorian city at sunset, brass machinery, smoke trails, dramatic clouds",
  "A magical winter village beneath enormous northern lights, snow-covered rooftops, warm fireplaces, frozen river reflecting the sky",
  "A dreamlike underwater palace surrounded by luminous jellyfish, coral gardens, ancient statues, rays of sunlight filtering through the ocean",
  "A mysterious astronaut discovering a forgotten alien temple on a distant moon, enormous planetary rings visible across the sky",
  "A peaceful Japanese-inspired mountain village surrounded by autumn forests, misty waterfalls, wooden bridges, warm morning sunlight",
  "A colossal ancient tree growing through the center of a futuristic megacity, skyscrapers wrapped around its branches, glowing leaves at night",
  "A wandering wizard crossing a vast desert toward a floating crystal fortress, swirling sandstorms and distant lightning",
  "A vintage 1950s diner on an alien planet, strange creatures sitting at the counter, glowing moons visible through the windows",
  "A surreal train traveling across a massive bridge above an endless ocean, storm clouds on one side and a golden sunset on the other",
  "A majestic white stag standing in an enchanted forest filled with floating fireflies, moonlight filtering through ancient trees",
];

export const ENHANCERS = [
  "ultra-detailed, crisp textures, refined details, cinematic lighting, natural depth of field",
  "dramatic rim lighting, volumetric light rays, atmospheric perspective, rich tonal contrast",
  "highly detailed textures, realistic materials, subtle imperfections, natural lighting",
  "professional composition, balanced framing, strong visual hierarchy, cinematic depth",
  "soft ambient lighting, realistic shadows, global illumination, subtle reflections",
  "sharp subject detail, smooth tonal transitions, realistic depth of field, clean focus",
  "moody atmosphere, dramatic contrast, volumetric fog, sophisticated color grading",
  "intricate surface details, physically accurate materials, realistic reflections, soft shadows",
  "cinematic composition, dynamic perspective, controlled highlights, rich shadows",
  "photorealistic rendering, natural skin and material textures, realistic lighting, fine details",
  "beautiful atmospheric depth, subtle bloom, volumetric lighting, realistic light scattering",
  "high-fidelity details, polished textures, realistic proportions, professional visual quality",
  "studio-quality lighting, precise focus, subtle shadows, clean composition, realistic materials",
  "epic scale, atmospheric perspective, dramatic illumination, detailed environment, cinematic depth",
  "refined color grading, realistic contrast, soft highlights, detailed shadows, polished finish",
  "complex lighting interaction, realistic ambient occlusion, detailed surfaces, natural reflections",
  "immersive atmosphere, layered depth, cinematic framing, realistic textures, nuanced lighting",
  "crisp fine details, dimensional lighting, realistic shadows, subtle texture variation",
  "premium visual quality, sophisticated composition, natural lighting, highly refined details",
  "masterful framing, atmospheric lighting, realistic textures, dimensional depth, polished rendering",
];

export const INSPIRATION_GALLERY = [
  {
    id: "insp-1",
    title: "Cyberpunk Tokyo Alley",
    prompt:
      "Futuristic Tokyo alley illuminated by neon magenta signs, wet cobblestone reflections, atmospheric fog, 8k octane render",
    styleId: "cyberpunk",
    aspectRatio: "16:9" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    author: "@cyber_dreamer",
  },
  {
    id: "insp-2",
    title: "Ethereal Forest Spirit",
    prompt:
      "Luminous spirit deer in an enchanted misty forest with glowing blue mushrooms and floating lotus blossoms",
    styleId: "fantasy",
    aspectRatio: "1:1" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    author: "@mythic_ai",
  },
  {
    id: "insp-3",
    title: "Cinematic Portrait",
    prompt:
      "Close up portrait of a warrior with intricate gold leaf tattoos, dramatic side lighting, shallow depth of field, 35mm film",
    styleId: "photorealistic",
    aspectRatio: "9:16" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    author: "@lens_master",
  },
  {
    id: "insp-4",
    title: "Minimalist Sunset Dune",
    prompt:
      "Minimalist desert sand dunes under a giant pastel sun, smooth gradient sky, clean geometry, serene vibe",
    styleId: "minimalist",
    aspectRatio: "16:9" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    author: "@pastel_art",
  },
  {
    id: "insp-5",
    title: "Cyberpunk Tokyo Alley",
    prompt:
      "Futuristic Tokyo alley illuminated by neon magenta signs, wet cobblestone reflections, atmospheric fog, 8k octane render",
    styleId: "cyberpunk",
    aspectRatio: "16:9" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    author: "@cyber_dreamer",
  },
  {
    id: "insp-6",
    title: "Ethereal Forest Spirit",
    prompt:
      "Luminous spirit deer in an enchanted misty forest with glowing blue mushrooms and floating lotus blossoms",
    styleId: "fantasy",
    aspectRatio: "1:1" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    author: "@mythic_ai",
  },
  {
    id: "insp-7",
    title: "Cinematic Portrait",
    prompt:
      "Close up portrait of a warrior with intricate gold leaf tattoos, dramatic side lighting, shallow depth of field, 35mm film",
    styleId: "photorealistic",
    aspectRatio: "9:16" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    author: "@lens_master",
  },
  {
    id: "insp-8",
    title: "Minimalist Sunset Dune",
    prompt:
      "Minimalist desert sand dunes under a giant pastel sun, smooth gradient sky, clean geometry, serene vibe",
    styleId: "minimalist",
    aspectRatio: "16:9" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    author: "@pastel_art",
  },
];

export const STEP_MESSAGES = [
  "Warming up model...",
  "Encoding text prompt into latent space...",
  "Synthesizing image...",
  "Applying style filters & lighting maps...",
  "Enhancing high-res details & upscaling...",
  "Finalizing output render...",
];
