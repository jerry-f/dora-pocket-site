import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;

    const onChange = () => setReduced(Boolean(media.matches));
    onChange();

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

type Rarity = "R" | "SR" | "SSR";

type GadgetBase = {
  id: string;
  name: string;
  description: string;
  utility: number;
  fun: number;
  rarity: Rarity;
  colorClass: string;
  icon: ReactNode;
};

type GadgetInstance = GadgetBase & {
  instanceId: string;
  drawnAt: number;
};

const GADGETS: GadgetBase[] = [
  {
    id: "g1",
    name: "任意门",
    description:
      "想去哪里就去哪里：打开门的瞬间，你的通勤、旅行、逃离截止日期都会变得轻松。注意：请先确认目的地安全。",
    utility: 96,
    fun: 88,
    rarity: "SSR",
    colorClass: "bg-pink-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M5 3h14v18H5z" />
        <path d="M9 7h6" opacity="0.35" />
        <circle cx="16" cy="12" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "g2",
    name: "竹蜻蜓",
    description:
      "戴在头上即可飞行。上班路上顺手绕一圈云朵。友情提示：头发会很有风。",
    utility: 72,
    fun: 98,
    rarity: "SR",
    colorClass: "bg-lime-400",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-black"
        aria-hidden="true"
      >
        <path d="M3 12h18" strokeWidth="3" />
        <path d="M12 12v9" />
        <path d="M9 21h6" />
        <path d="M12 3v4" />
      </svg>
    ),
  },
  {
    id: "g3",
    name: "记忆面包",
    description:
      "把内容印在面包上吃下去就能记住。适合背单词、背面试题、背“这次一定早睡”。",
    utility: 63,
    fun: 84,
    rarity: "R",
    colorClass: "bg-amber-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M7 6h10a4 4 0 0 1 4 4v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a4 4 0 0 1 4-4z" />
        <path d="M9 11h6" opacity="0.5" />
        <path d="M9 15h5" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "g4",
    name: "时间包袱皮",
    description:
      "红面让物体变新，蓝面让物体变旧。修复旧物、复原手办、让过期的周末“重新开始”。",
    utility: 88,
    fun: 76,
    rarity: "SR",
    colorClass: "bg-red-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M12 3v18" strokeDasharray="4 2" />
        <path d="M3 12h18" strokeDasharray="4 2" />
      </svg>
    ),
  },
  {
    id: "g5",
    name: "如果电话亭",
    description:
      "对着电话说出一个“如果……”，世界就会照着改写。慎用：你可能会写出一个更长的待办清单。",
    utility: 99,
    fun: 99,
    rarity: "SSR",
    colorClass: "bg-emerald-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <rect x="6" y="2" width="12" height="20" rx="1" />
        <path d="M8 6h8" opacity="0.4" />
        <path d="M9 10h6" opacity="0.4" />
        <path d="M9 14h6" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "g6",
    name: "缩小灯",
    description: "照一下就能缩小。适合整理收纳、塞进行李箱、以及把烦恼压缩成一句话。",
    utility: 82,
    fun: 80,
    rarity: "SR",
    colorClass: "bg-sky-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M7 7h10v10H7z" />
        <path d="M12 2v5" />
        <path d="M12 17v5" />
        <path d="M2 12h5" />
        <path d="M17 12h5" />
      </svg>
    ),
  },
  {
    id: "g7",
    name: "翻译魔芋",
    description: "吃一口就能听懂所有语言。也能让“需求”变得更清晰（理论上）。",
    utility: 74,
    fun: 70,
    rarity: "R",
    colorClass: "bg-violet-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M4 6h16" />
        <path d="M7 10h10" />
        <path d="M10 14h4" />
        <path d="M6 18h12" opacity="0.45" />
      </svg>
    ),
  },
  {
    id: "g8",
    name: "穿透环",
    description: "把环贴在墙上就能穿过去。适合搬家、取快递、以及偷偷拥抱未知的可能性。",
    utility: 86,
    fun: 78,
    rarity: "SR",
    colorClass: "bg-orange-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="7" />
        <path d="M12 5v14" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "g9",
    name: "空气炮",
    description: "按一下就能发射强力空气冲击。适合清理键盘、吹走坏心情、以及把懒惰推开一点点。",
    utility: 58,
    fun: 92,
    rarity: "R",
    colorClass: "bg-slate-800",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M4 12h10" />
        <path d="M10 8l4 4-4 4" />
        <path d="M14 12h6" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "g10",
    name: "隐身斗篷",
    description: "披上即可隐身。适合躲开尴尬、躲开加班、以及在不打扰别人时看一眼天空。",
    utility: 79,
    fun: 73,
    rarity: "SR",
    colorClass: "bg-indigo-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <path d="M7 4c2 2 3 3 5 3s3-1 5-3" />
        <path d="M6 5l-2 15c6 2 12 2 18 0L18 5" />
      </svg>
    ),
  },
  {
    id: "g11",
    name: "换装相机",
    description:
      "拍一下就能换装。适合开会前 10 秒、约会前 10 秒、以及给自己一点点仪式感。",
    utility: 67,
    fun: 83,
    rarity: "R",
    colorClass: "bg-fuchsia-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M8 7l2-3h4l2 3" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    id: "g12",
    name: "时光机（迷你版）",
    description:
      "把一个下午折叠成一张车票。回到你最想“重新写一遍”的那一分钟——然后更温柔地继续。",
    utility: 93,
    fun: 84,
    rarity: "SSR",
    colorClass: "bg-cyan-500",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-12 w-12 text-white"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
        <path d="M4 12h2" />
        <path d="M18 12h2" />
      </svg>
    ),
  },
];

function RarityBadge({ rarity }: { rarity: Rarity }) {
  const cls =
    rarity === "SSR"
      ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white border-fuchsia-800"
      : rarity === "SR"
        ? "bg-yellow-300 text-yellow-950 border-yellow-600"
        : "bg-slate-200 text-slate-800 border-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border-2 px-2 py-0.5 text-xs font-black tracking-wide ${cls}`}
      aria-label={`稀有度：${rarity}`}
    >
      {rarity}
    </span>
  );
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-black">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full border-2 border-black bg-white">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function TwoLineText({ text }: { text: string }) {
  return (
    <p
      className="text-xs font-semibold leading-relaxed text-slate-600"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {text}
    </p>
  );
}

function GadgetCard({ gadget, onClick }: { gadget: GadgetInstance; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-full w-full flex-col rounded-2xl border-2 border-black bg-white p-4 text-left shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,163,255,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/70 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
    >
      <div
        className={`mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border-2 border-black ${gadget.colorClass} transition-transform group-hover:rotate-2`}
      >
        {gadget.icon}
      </div>

      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-black leading-tight tracking-tight text-slate-900">
          {gadget.name}
        </h3>
        <RarityBadge rarity={gadget.rarity} />
      </div>

      <TwoLineText text={gadget.description} />
    </button>
  );
}

function Header() {
  return (
    <header className="pointer-events-none fixed left-0 top-0 z-40 w-full px-5 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-4 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-sky-400 text-black">
            口
          </span>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-tight">哆啦口袋实验室</div>
            <div className="text-xs font-semibold text-slate-500">点击抽取未来道具 · 查看规格说明</div>
          </div>
        </div>

        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 px-3 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-xs font-black tracking-wide text-black">口袋在线</span>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();

  const [isShaking, setIsShaking] = useState(false);
  const [inventory, setInventory] = useState<GadgetInstance[]>([]);
  const [showTip, setShowTip] = useState(true);
  const [activeGadget, setActiveGadget] = useState<GadgetInstance | null>(null);

  const drawGadgets = useCallback(
    (count: number) => {
      const now = Date.now();
      const result: GadgetInstance[] = [];

      for (let i = 0; i < count; i += 1) {
        const base = GADGETS[Math.floor(Math.random() * GADGETS.length)]!;
        result.push({
          ...base,
          instanceId: `${base.id}-${now}-${i}-${Math.random().toString(16).slice(2)}`,
          drawnAt: now,
        });
      }

      return result;
    },
    []
  );

  const drawCount = useMemo(() => 3, []);

  const openPocket = useCallback(() => {
    if (isShaking) return;

    setShowTip(false);
    setIsShaking(true);

    if (reducedMotion) {
      document.documentElement.setAttribute("data-force-motion", "true");
    }

    // 有些设备支持震动；减少动态效果时不触发
    if (!reducedMotion && navigator.vibrate) {
      navigator.vibrate([30, 30, 30]);
    }

    // 动画时长：至少 2 秒以上 (2000ms ~ 3000ms)
    const animationDuration = Math.floor(Math.random() * 1001) + 2000;

    window.setTimeout(() => {
      const newItems = drawGadgets(drawCount);
      setInventory((prev) => [...newItems, ...prev]);
      setIsShaking(false);

      if (reducedMotion) {
        document.documentElement.removeAttribute("data-force-motion");
      }

      // 默认弹出本次第一件道具的说明
      window.setTimeout(
        () => setActiveGadget(newItems[0] ?? null),
        reducedMotion ? 0 : 160
      );
    }, animationDuration);
  }, [drawCount, drawGadgets, isShaking, reducedMotion]);

  const clearPocket = useCallback(() => {
    setInventory([]);
    setActiveGadget(null);
    setShowTip(true);
  }, []);

  return (
    <div className="pocket-page min-h-screen text-slate-900 selection:bg-yellow-300 selection:text-black">
      <Header />

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-14 pt-28">
        {/* 顶部主视觉 */}
        <section className="relative mb-12 flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="pocket-title text-4xl font-black tracking-tight sm:text-6xl">
              哆啦A梦的口袋 · 抽取器
            </h1>
            <p className="mt-3 max-w-[36rem] text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">
              不用图片也能有童年味道：用原创图形做一个“口袋交互”。点击口袋，随机弹出未来道具，并查看它的“规格说明”。
            </p>
          </div>

          <div className="relative">
            {/* 口袋按钮 */}
            <button
              type="button"
              onClick={openPocket}
              className={
                "relative z-10 flex h-72 w-72 select-none flex-col items-center justify-center rounded-full border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,163,255,1)] transition-transform duration-200 hover:-translate-y-2 hover:shadow-[22px_22px_0px_0px_rgba(0,163,255,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/70 active:translate-y-1 active:shadow-[6px_6px_0px_0px_rgba(0,163,255,1)] " +
                (isShaking ? "pocket-shake" : "")
              }
              aria-label="打开口袋，抽取道具"
            >
              {/* 红色项圈 */}
              <div className="absolute top-[26%] h-9 w-full border-y-4 border-black bg-red-500" />

              {/* 铃铛 */}
              <div className="absolute top-[34%] grid h-16 w-16 place-items-center rounded-full border-4 border-black bg-yellow-300 shadow-inner">
                <div className="h-2 w-10 rounded-full bg-black/20" />
                <div className="absolute top-9 h-4 w-4 rounded-full bg-black" />
              </div>

              {/* 口袋开口 */}
              <div className="absolute top-[50%] flex h-32 w-56 -translate-y-1/2 items-start justify-center overflow-hidden rounded-b-full border-4 border-t-0 border-black bg-white pt-5">
                <div className="text-xs font-black tracking-[0.35em] text-slate-300">
                  轻触打开
                </div>
              </div>

              {/* 口袋提示 */}
              <div className="mt-44 text-center">
                <div className="text-sm font-black">摇一摇 · 抽 {drawCount} 件</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  {reducedMotion ? "已启用减少动态效果" : "会有轻微晃动与粒子"}
                </div>
              </div>
            </button>

            {/* 简易粒子：减少动态效果时不显示 */}
            {!reducedMotion && isShaking ? (
              <>
                <div className="pointer-events-none absolute -left-2 -top-3 h-4 w-4 rounded-full border-2 border-black bg-yellow-300 pocket-pop" />
                <div className="pointer-events-none absolute -right-2 top-8 h-3 w-3 rounded-full border-2 border-black bg-sky-400 pocket-pop" />
                <div className="pointer-events-none absolute right-10 -bottom-2 h-6 w-6 rounded-full border-2 border-black bg-red-500 pocket-pop" />
              </>
            ) : null}

            {showTip && inventory.length === 0 ? (
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 border-black bg-black px-4 py-2 text-sm font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                点击口袋开始抽取
              </div>
            ) : null}
          </div>
        </section>

        {/* 道具列表 */}
        <section className="flex-1">
          <div className="mb-6 flex items-end justify-between gap-4 border-b-4 border-black pb-2">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                已获取道具（{inventory.length}）
              </h2>
              <p className="mt-1 text-xs font-semibold text-slate-600">
                点击任意道具，查看“规格说明”。
              </p>
            </div>

            <button
              type="button"
              onClick={clearPocket}
              className="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/70 active:translate-y-0"
              disabled={inventory.length === 0}
            >
              清空口袋
            </button>
          </div>

          {inventory.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border-4 border-dashed border-slate-300 bg-white/60 py-14 text-center">
              <div className="max-w-md">
                <div className="text-xl font-black text-slate-400">口袋空空如也</div>
                <div className="mt-2 text-sm font-semibold text-slate-500">
                  先点击上面的口袋，抽取你的第一件未来道具。
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {inventory.map((gadget, idx) => (
                <div
                  key={gadget.instanceId}
                  className={
                    "" +
                    (!reducedMotion
                      ? "data-[show=true]:animate-in data-[show=true]:fade-in data-[show=true]:slide-in-from-bottom-4"
                      : "")
                  }
                  data-show="true"
                  style={!reducedMotion ? { animationDelay: `${idx * 40}ms` } : undefined}
                >
                  <GadgetCard gadget={gadget} onClick={() => setActiveGadget(gadget)} />
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t-2 border-slate-200 py-8 text-center">
          <p className="text-sm font-semibold text-slate-500">
            本站为非官方原创互动页面，灵感致敬《哆啦A梦》的“口袋”设定，不使用任何官方图片/Logo。
          </p>
        </footer>
      </main>

      <Dialog
        open={Boolean(activeGadget)}
        onOpenChange={(open) => (!open ? setActiveGadget(null) : null)}
      >
        <DialogContent className="max-w-lg rounded-2xl border-4 border-black p-0 shadow-[12px_12px_0px_0px_rgba(255,71,87,1)]">
          {activeGadget ? (
            <div className="p-6">
              <DialogHeader>
                <div
                  className={`mb-5 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-black ${activeGadget.colorClass}`}
                >
                  <div className={reducedMotion ? "" : "pocket-float"}>{activeGadget.icon}</div>
                </div>

                <DialogTitle className="flex items-center justify-between gap-3 text-2xl font-black tracking-tight">
                  <span>{activeGadget.name}</span>
                  <RarityBadge rarity={activeGadget.rarity} />
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                  {activeGadget.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <ProgressBar label="实用指数" value={activeGadget.utility} color="bg-sky-500" />
                <ProgressBar label="趣味指数" value={activeGadget.fun} color="bg-yellow-300" />
              </div>

              <div className="mt-6 rounded-xl border-2 border-black bg-white px-4 py-3">
                <div className="text-xs font-black text-slate-700">口袋记录</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  抽取时间：{new Date(activeGadget.drawnAt).toLocaleString("zh-CN")}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveGadget(null)}
                className="mt-6 w-full rounded-xl border-2 border-black bg-black py-3 text-sm font-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/70 active:translate-y-0"
              >
                收入口袋
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
