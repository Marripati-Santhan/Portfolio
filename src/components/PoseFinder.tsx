import { useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/ui";

type Pose = { name: string; sanskrit: string; steps: string[] };
type Area = { label: string; keywords: string[]; poses: Pose[]; breath: string };

const areas: Record<string, Area> = {
  upperBack: {
    label: "Upper Back",
    keywords: ["upper back", "posture", "between shoulder", "thoracic"],
    breath: "Box breathing — 4s inhale, 4s hold, 4s exhale, 4s hold.",
    poses: [
      { name: "Cat–Cow", sanskrit: "Marjaryasana–Bitilasana", steps: ["Come to hands and knees.", "Inhale, drop belly and lift gaze (Cow).", "Exhale, round spine toward the ceiling (Cat)."] },
      { name: "Sphinx Pose", sanskrit: "Salamba Bhujangasana", steps: ["Lie on your belly, elbows under shoulders.", "Press forearms down and lift the chest gently.", "Keep shoulders away from ears; breathe slowly."] },
      { name: "Thread the Needle", sanskrit: "Parsva Balasana", steps: ["From all fours, slide right arm under left.", "Rest right shoulder and temple on the mat.", "Hold, then switch sides."] },
    ],
  },
  lowerBack: {
    label: "Lower Back",
    keywords: ["lower back", "back", "spine", "lumbar", "waist"],
    breath: "Diaphragmatic breathing — hand on belly, slow 5-count breaths.",
    poses: [
      { name: "Child's Pose", sanskrit: "Balasana", steps: ["Kneel and sit back on your heels.", "Fold forward, arms extended or by your sides.", "Rest forehead down and breathe into your lower back."] },
      { name: "Cat–Cow", sanskrit: "Marjaryasana–Bitilasana", steps: ["Start on hands and knees, wrists under shoulders.", "Inhale into Cow, exhale into Cat.", "Move slowly with each breath."] },
      { name: "Supine Twist", sanskrit: "Supta Matsyendrasana", steps: ["Lie on your back, hug right knee in.", "Let it fall across to the left, arms wide.", "Keep both shoulders down; switch sides."] },
    ],
  },
  neck: {
    label: "Neck",
    keywords: ["neck", "cervical", "stiff neck"],
    breath: "Alternate nostril breathing (Nadi Shodhana) for 3 minutes.",
    poses: [
      { name: "Seated Neck Release", sanskrit: "Greeva Sanchalana", steps: ["Sit tall with relaxed shoulders.", "Tilt right ear toward right shoulder.", "Hold, return to centre, repeat on the left."] },
      { name: "Thread the Needle", sanskrit: "Parsva Balasana", steps: ["From all fours, thread one arm under the other.", "Rest shoulder and side of head down.", "Breathe into the side of the neck."] },
      { name: "Supported Fish", sanskrit: "Matsyasana (supported)", steps: ["Place a folded blanket under your upper back.", "Lie back and let the head rest gently.", "Open the chest and soften the throat."] },
    ],
  },
  shoulders: {
    label: "Shoulders",
    keywords: ["shoulder", "shoulders", "rotator", "arm"],
    breath: "Ujjayi breath — slow ocean-sounding breaths through the nose.",
    poses: [
      { name: "Eagle Arms", sanskrit: "Garudasana (arms)", steps: ["Cross right arm under left at the elbows.", "Bring palms together and lift elbows.", "Hold, then switch arms."] },
      { name: "Puppy Pose", sanskrit: "Uttana Shishosana", steps: ["From all fours, walk hands forward.", "Keep hips over knees, melt chest down.", "Let forehead rest and shoulders open."] },
      { name: "Cow Face Arms", sanskrit: "Gomukhasana (arms)", steps: ["Reach right arm up and bend it behind.", "Reach left arm behind from below.", "Clasp fingers or use a strap; switch."] },
    ],
  },
  knees: {
    label: "Knees",
    keywords: ["knee", "knees", "joint"],
    breath: "Relaxing 4-7-8 breathing — inhale 4, hold 7, exhale 8.",
    poses: [
      { name: "Legs Up the Wall", sanskrit: "Viparita Karani", steps: ["Sit sideways next to a wall.", "Swing legs up the wall and lie back.", "Relax with knees soft — reduces swelling."] },
      { name: "Bridge Pose", sanskrit: "Setu Bandhasana", steps: ["Lie on your back, knees bent hip-width.", "Press feet down and lift hips.", "Keep knees tracking over ankles."] },
      { name: "Mountain Pose", sanskrit: "Tadasana", steps: ["Stand tall, feet hip-width apart.", "Gently engage thigh muscles to support knees.", "Avoid locking the knees; breathe evenly."] },
    ],
  },
  hips: {
    label: "Hips",
    keywords: ["hip", "hips", "groin", "pelvis", "glute"],
    breath: "Bhramari (humming bee) breath for 5 rounds.",
    poses: [
      { name: "Butterfly Pose", sanskrit: "Baddha Konasana", steps: ["Sit with soles of the feet together.", "Hold your feet and sit tall.", "Let knees fall open naturally."] },
      { name: "Low Lunge", sanskrit: "Anjaneyasana", steps: ["Step right foot forward, lower left knee.", "Sink hips forward gently.", "Lift the chest; switch sides."] },
      { name: "Reclined Figure Four", sanskrit: "Supta Kapotasana", steps: ["Lie on your back, cross right ankle over left knee.", "Draw left thigh toward your chest.", "Hold and switch sides."] },
    ],
  },
};

const durations = {
  acute: { label: "Less than a week", rounds: "2 rounds", hold: "15–20 sec", tip: "Keep movements very gentle. Stop immediately if you feel sharp pain." },
  sub: { label: "1–4 weeks", rounds: "3 rounds", hold: "30 sec", tip: "Practise once a day and gradually deepen the stretch as comfort allows." },
  chronic: { label: "More than a month", rounds: "Daily routine", hold: "45–60 sec", tip: "Build a consistent daily practice. If pain persists, consult a physiotherapist." },
} as const;
type DurKey = keyof typeof durations;

function detectArea(text: string): string | null {
  const t = text.toLowerCase();
  // check multi-word / specific keywords first
  const order = ["upperBack", "neck", "shoulders", "knees", "hips", "lowerBack"];
  for (const key of order) if (areas[key].keywords.some((k) => t.includes(k))) return key;
  return null;
}

function detectDuration(text: string): DurKey | null {
  const t = text.toLowerCase();
  if (/(today|yesterday|since morning|few days|couple of days)/.test(t)) return "acute";
  if (/(long time|years?|chronic|always)/.test(t) && !/\d/.test(t)) return "chronic";
  const m = t.match(/(\d+|a|an|one|two|three|four|five|six)\s*(day|week|month|year)/);
  if (!m) return null;
  const words: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const n = Number.isNaN(Number(m[1])) ? (words[m[1]] ?? 1) : Number(m[1]);
  const mult = { day: 1, week: 7, month: 30, year: 365 }[m[2] as "day"];
  const days = n * mult;
  return days < 7 ? "acute" : days <= 30 ? "sub" : "chronic";
}

const examples = [
  "My lower back hurts for 2 weeks",
  "Stiff neck since yesterday",
  "Knee pain for 3 months",
  "Tight hips from sitting, 5 days",
];

export default function PoseFinder() {
  const [prompt, setPrompt] = useState("");
  const [area, setArea] = useState<string>("lowerBack");
  const [dur, setDur] = useState<DurKey>("sub");
  const [shown, setShown] = useState(false);
  const [note, setNote] = useState("");

  const run = (text: string) => {
    const a = detectArea(text);
    const d = detectDuration(text);
    if (!a) {
      setNote("I couldn't spot a body area — try mentioning back, neck, shoulders, knees or hips.");
      return;
    }
    setArea(a);
    setDur(d ?? "sub");
    setNote(d ? "" : "No duration mentioned — showing a 1–4 week plan.");
    setShown(true);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(prompt);
  };

  const plan = areas[area];
  const d = durations[dur];

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent">
      <div className="flex items-center gap-2 border-b border-emerald-400/15 px-5 py-3">
        <Icon name="lotus" className="h-4 w-4 text-emerald-300" />
        <span className="font-display text-sm font-semibold text-emerald-200">Live demo · Pose Finder</span>
        <span className="ml-auto font-mono text-[10px] text-haze-500">Sans Yoga Sanctuary</span>
      </div>

      <div className="p-5">
        <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your pain & how long… e.g. lower back for 2 weeks"
            className="flex-1 rounded-xl border border-white/10 bg-night-950/70 px-4 py-3 text-[14px] text-haze-100 outline-none placeholder:text-haze-500 focus:border-emerald-400/60"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-semibold text-night-950 transition-transform hover:-translate-y-0.5"
          >
            <Icon name="spark" className="h-4 w-4" /> Find poses
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setPrompt(ex);
                run(ex);
              }}
              className="rounded-full border border-white/10 px-3 py-1 text-[11.5px] text-haze-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-200"
            >
              {ex}
            </button>
          ))}
        </div>

        {note && <p className="mt-3 text-[12px] text-amber-300">{note}</p>}

        {shown && (
          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-[11px] text-emerald-200">
                📍 {plan.label}
              </span>
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 font-mono text-[11px] text-cyan-200">
                ⏱ {d.label}
              </span>
              <span className="rounded-full bg-violet-400/15 px-3 py-1 font-mono text-[11px] text-violet-200">
                {d.rounds} · hold {d.hold}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {plan.poses.map((p, i) => (
                <div
                  key={p.name}
                  className="animate-pop rounded-xl border border-white/8 bg-night-900/80 p-4"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-400/15 font-mono text-[11px] text-emerald-300">
                      {i + 1}
                    </span>
                    <h4 className="font-display text-[14px] font-semibold text-haze-100">{p.name}</h4>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-emerald-300/70 italic">{p.sanskrit}</p>
                  <ol className="mt-3 space-y-1.5">
                    {p.steps.map((s) => (
                      <li key={s} className="flex gap-1.5 text-[12px] leading-snug text-haze-400">
                        <span className="text-emerald-400">›</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-[12px] text-haze-300">
                <span className="font-semibold text-cyan-300">🧘 Meditation: </span>
                {plan.breath}
              </div>
              <div className={cn("rounded-xl border p-3.5 text-[12px]", dur === "chronic" ? "border-amber-400/25 bg-amber-400/[0.06] text-amber-200" : "border-white/8 bg-white/[0.02] text-haze-300")}>
                <span className="font-semibold">💡 Tip: </span>
                {d.tip}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
