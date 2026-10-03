// Mock Data for Peer Support Charts, Active Listeners & Community Feed

export const peerSupportStats = {
  activeListeners: 42,
  totalPeersHelped: 1420,
  avgResponseTimeMs: "2.4 mins",
  satisfactionRate: "98.6%",
  weeklySupportHours: 380,
};

export const weeklyActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Support Sessions Completed",
      data: [45, 62, 58, 74, 90, 82, 68],
      borderColor: "#0d9488", // Teal 600
      backgroundColor: "rgba(13, 148, 136, 0.15)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#0d9488",
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: "New Peer Requests",
      data: [50, 70, 65, 80, 105, 95, 75],
      borderColor: "#6366f1", // Indigo 500
      backgroundColor: "rgba(99, 102, 241, 0.08)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#6366f1",
      pointRadius: 4,
    },
  ],
};

export const topicBreakdownData = {
  labels: [
    "Anxiety & Panic",
    "Work & Exam Stress",
    "Depression & Low Mood",
    "Sleep & Mindfulness",
    "Relationships",
  ],
  datasets: [
    {
      data: [35, 28, 18, 12, 7],
      backgroundColor: [
        "#0d9488", // Teal
        "#6366f1", // Indigo
        "#8b5cf6", // Violet
        "#ec4899", // Pink
        "#f59e0b", // Amber
      ],
      borderWidth: 2,
      borderColor: "#ffffff",
      hoverOffset: 6,
    },
  ],
};

export const activeListenersRoster = [
  {
    id: "p1",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    role: "Certified Empathy Listener",
    specialities: ["Anxiety", "Exam Stress", "Mindfulness"],
    rating: 4.95,
    sessionsCompleted: 142,
    status: "online",
    badge: "Top Supporter",
    bio: "Passionate about mental health advocacy. Here to listen without judgment whenever you need a safe space.",
  },
  {
    id: "p2",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    role: "Peer Counselor",
    specialities: ["Work Burnout", "Career Stress", "Depression"],
    rating: 4.9,
    sessionsCompleted: 98,
    status: "online",
    badge: "Verified Peer",
    bio: "Navigated career burnout myself. Let's talk about balancing life, goals, and emotional well-being.",
  },
  {
    id: "p3",
    name: "Aisha Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    role: "Mindfulness Coach",
    specialities: ["Sleep Hygiene", "Meditation", "Self-Esteem"],
    rating: 5.0,
    sessionsCompleted: 210,
    status: "online",
    badge: "Community Mentor",
    bio: "Guided breathing, soothing conversations, and practical coping tools for late night thoughts.",
  },
  {
    id: "p4",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    role: "Student Life Supporter",
    specialities: ["Social Anxiety", "Academic Pressure", "Loneliness"],
    rating: 4.88,
    sessionsCompleted: 76,
    status: "busy",
    badge: "Verified Peer",
    bio: "University student passionate about helping fellow peers tackle stress, deadlines, and social pressures.",
  },
];

export const supportRequestsFeed = [
  {
    id: "req1",
    userAlias: "AnxiousBird_22",
    avatarBg: "bg-teal-500",
    category: "Exam Stress",
    timeAgo: "10 mins ago",
    text: "Having a panic episode right before my final presentation tomorrow. Need someone to help ground me.",
    offersCount: 4,
    hugsCount: 12,
    encouragementsCount: 8,
    urgent: true,
  },
  {
    id: "req2",
    userAlias: "CalmSeeker",
    avatarBg: "bg-indigo-500",
    category: "Work & Life",
    timeAgo: "25 mins ago",
    text: "Feeling overwhelmed by workload and burnout. Would appreciate an anonymous listening ear to vent.",
    offersCount: 2,
    hugsCount: 7,
    encouragementsCount: 5,
    urgent: false,
  },
  {
    id: "req3",
    userAlias: "SilentEcho",
    avatarBg: "bg-violet-500",
    category: "Sleep & Anxiety",
    timeAgo: "1 hour ago",
    text: "Can't quiet my thoughts tonight. Anyone up for a quick calming conversation or mindfulness check-in?",
    offersCount: 6,
    hugsCount: 18,
    encouragementsCount: 14,
    urgent: false,
  },
];

export const virtualPeerCircles = [
  {
    id: "circle1",
    title: "Late Night Anxiety & Grounding Circle",
    time: "Tonight at 10:00 PM EST",
    host: "Aisha Patel",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    participants: 14,
    maxCapacity: 20,
    tags: ["Grounding", "Meditation", "Audio Room"],
  },
  {
    id: "circle2",
    title: "Student Stress & Academic Survival",
    time: "Tomorrow at 6:00 PM EST",
    host: "Liam O'Connor",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    participants: 9,
    maxCapacity: 15,
    tags: ["Students", "Exam Prep", "Text Chat"],
  },
  {
    id: "circle3",
    title: "Weekly Mindfulness & Wins Celebration",
    time: "Friday at 7:30 PM EST",
    host: "Elena Rostova",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    participants: 18,
    maxCapacity: 25,
    tags: ["Positivity", "Gratitude", "Open Mic"],
  },
];
