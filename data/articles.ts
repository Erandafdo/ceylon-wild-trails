export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  coverImage: string;
  summary: string;
  publishedDate: string;
  content: string[];
}

export const articles: Article[] = [
  {
    id: "art_001",
    title: "How to Hike Safely in Sri Lanka’s Rainy Season",
    slug: "rainy-season-hiking-safety",
    author: "Thimin",
    coverImage: "/images/rain-hike.jpg",
    summary:
      "Sri Lanka’s weather can flip fast. Here’s how to prep for mud, leeches, and low visibility while staying safe.",
    publishedDate: "2025-10-27",
    content: [
      "Sri Lanka’s mountains get slippery fast in monsoon. Shoes with real grip are not optional.",
      "Always tell someone where you’re going and your expected return time. No signal in most valleys.",
      "Pack a light poncho, not a heavy jacket. You want water resistance but you also want to breathe."
    ]
  },
  {
    id: "art_002",
    title: "Essential Gear Checklist for Beginner Hikers (Sri Lanka Edition)",
    slug: "beginner-hiking-gear-sri-lanka",
    author: "Ceylon Wild Trails",
    coverImage: "/images/hiking-gear.jpg",
    summary:
      "Don’t overpack, but don’t be stupid. Here’s the simple gear that actually matters in Sri Lankan terrain.",
    publishedDate: "2025-10-20",
    content: [
      "1. 1.5L water minimum, even for ‘short’ hikes. Dehydration hits fast in humidity.",
      "2. Leech socks for wet forest trails like Knuckles after rain.",
      "3. A trash bag. If you love the trail, don’t leave plastic behind. Simple."
    ]
  },
  {
    id: "art_003",
    title: "මාතලාගල පතන",
    slug: "beginner-hiking-gear-sri-lanka",
    author: "Eranda Fernando",
    coverImage: "/images/mathalagala.jpg",
    summary:
      "ශ්‍රී ලංකාවේ මධ්‍යම කඳුකරයේ පිහිටි, යුනෙස්කෝ ලෝක උරුමයක් වන නකල්ස් (Knuckles) හෙවත් දුම්බර කඳු වැටිය, අපූර්ව ජෛව විවිධත්වයකින් සහ නෙත්කළු භූ දර්ශනවලින් අනූන ප්‍රදේශයකි. මෙම කඳු වැටියේ සැඟවී ඇති, එතරම් ප්‍රසිද්ධියට පත් නොවූ එහෙත් අතිශය චමත්කාරජනක ස්ථානයක් ලෙස මාතලාගල පතන හැඳින්විය හැකිය.",
    publishedDate: "2025-10-20",
    content: [
      "පිහිටීම සහ ළඟා වීම",
      "මාතලාගල පතන, මාතලේ දිස්ත්‍රික්කයේ, රත්තොට ප්‍රාදේශීය ලේකම් කොට්ඨාසයට අයත් වේ.",
      "නකල්ස් කඳු වැටියේ ජනප්‍රිය සංචාරක ආකර්ෂණයක් වන රිවර්ස්ටන් (Riverston) සහ පිටවල පතන ප්‍රදේශයට ඉතා ආසන්නව මෙය පිහිටා ඇත."
    ]
  }
];
