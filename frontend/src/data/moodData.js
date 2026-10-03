// Initial Mood Tracker Mock Data & Emotion Types

export const moodTypes = [
  { id: "great", label: "Great", emoji: "😄", color: "bg-emerald-500", textColor: "text-emerald-600", score: 9 },
  { id: "good", label: "Good", emoji: "🙂", color: "bg-teal-500", textColor: "text-teal-600", score: 7 },
  { id: "okay", label: "Okay", emoji: "😐", color: "bg-amber-500", textColor: "text-amber-600", score: 5 },
  { id: "down", label: "Down", emoji: "😔", color: "bg-indigo-500", textColor: "text-indigo-600", score: 3 },
  { id: "stressed", label: "Stressed", emoji: "😤", color: "bg-rose-500", textColor: "text-rose-600", score: 2 },
  { id: "exhausted", label: "Exhausted", emoji: "😴", color: "bg-slate-500", textColor: "text-slate-600", score: 4 },
];

export const availableTags = [
  "#Meditation",
  "#Exercise",
  "#Sleep",
  "#Work",
  "#Study",
  "#Therapy",
  "#Socializing",
  "#Family",
  "#Nature",
  "#Journaling",
];

export const initialMoodLogs = [
  {
    id: "m1",
    mood: "great",
    score: 9,
    emoji: "😄",
    note: "Completed a 30-minute morning walk and meditation. Feeling energized and focused for the day ahead!",
    tags: ["#Meditation", "#Exercise", "#Nature"],
    created_at: "2026-08-09T08:30:00Z",
    formattedDate: "Today, 8:30 AM",
  },
  {
    id: "m2",
    mood: "good",
    score: 7,
    emoji: "🙂",
    note: "Had a great peer support chat session. Felt heard and reassured about my upcoming exam prep.",
    tags: ["#Therapy", "#Socializing"],
    created_at: "2026-08-08T19:15:00Z",
    formattedDate: "Yesterday, 7:15 PM",
  },
  {
    id: "m3",
    mood: "stressed",
    score: 3,
    emoji: "😤",
    note: "Tough workday with tight project deadlines. Need to focus on deep breathing tonight.",
    tags: ["#Work", "#Study"],
    created_at: "2026-08-07T17:45:00Z",
    formattedDate: "Aug 7, 5:45 PM",
  },
  {
    id: "m4",
    mood: "okay",
    score: 5,
    emoji: "😐",
    note: "Quiet day. Stayed home, read a couple of chapters of a mindfulness book.",
    tags: ["#Journaling", "#Sleep"],
    created_at: "2026-08-06T14:20:00Z",
    formattedDate: "Aug 6, 2:20 PM",
  },
  {
    id: "m5",
    mood: "great",
    score: 9,
    emoji: "😄",
    note: "Spent quality time outdoors with family. Sleep quality was exceptional last night.",
    tags: ["#Family", "#Nature", "#Sleep"],
    created_at: "2026-08-05T20:10:00Z",
    formattedDate: "Aug 5, 8:10 PM",
  },
  {
    id: "m6",
    mood: "good",
    score: 7,
    emoji: "🙂",
    note: "Consistent streak of positive habits. Journaled 3 things I'm grateful for today.",
    tags: ["#Journaling", "#Meditation"],
    created_at: "2026-08-04T10:00:00Z",
    formattedDate: "Aug 4, 10:00 AM",
  },
  {
    id: "m7",
    mood: "down",
    score: 4,
    emoji: "😔",
    note: "Felt a bit lonely in the evening. Reached out to a community peer room which helped.",
    tags: ["#Socializing", "#Therapy"],
    created_at: "2026-08-03T21:00:00Z",
    formattedDate: "Aug 3, 9:00 PM",
  },
];

export const moodTrendChartData = {
  labels: ["Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 7", "Aug 8", "Aug 9"],
  datasets: [
    {
      label: "Mood Wellness Score (1 - 10)",
      data: [4, 7, 9, 5, 3, 7, 9],
      borderColor: "#0d9488", // Teal 600
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(13, 148, 136, 0.4)");
        gradient.addColorStop(1, "rgba(13, 148, 136, 0.0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#0d9488",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },
  ],
};

export const moodDistributionData = {
  labels: ["Great", "Good", "Okay", "Down", "Stressed"],
  datasets: [
    {
      data: [35, 30, 15, 10, 10],
      backgroundColor: [
        "#10b981", // Emerald
        "#14b8a6", // Teal
        "#f59e0b", // Amber
        "#6366f1", // Indigo
        "#f43f5e", // Rose
      ],
      borderWidth: 2,
      borderColor: "#ffffff",
    },
  ],
};
