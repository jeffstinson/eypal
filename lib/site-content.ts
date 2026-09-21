export type RegistrationState = "open" | "soon" | "closed" | "waitlist";

export type Sport = {
  slug: string;
  name: string;
  short: string;
  season: string;
  ages: string;
  status: RegistrationState;
  statusLabel: string;
  directors: string;
  email: string;
  registrationUrl: string;
  summary: string;
  registrationSummary: string;
  highlights: { title: string; text: string }[];
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
};

export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
};

export type Sponsor = {
  name: string;
  tier: "Premier" | "Sport" | "Community";
  url?: string;
  sport?: string;
};

export const sports: Sport[] = [
  {
    slug: "baseball",
    name: "Baseball",
    short: "BB",
    season: "Spring & Fall",
    ages: "Youth through Teeners",
    status: "closed",
    statusLabel: "Registration Closed",
    directors: "Kyle Trovinger & Jason Clapper",
    email: "baseball@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741249",
    summary: "A long-running East Penn program built around fundamentals, player development, sportsmanship and Little League tradition.",
    registrationSummary: "Fall registration is currently closed. Sports Connect will display the next available program when registration reopens.",
    highlights: [
      { title: "Player Development", text: "Age-appropriate divisions help players build skills and confidence as they progress." },
      { title: "Little League Roots", text: "EPYAL baseball carries decades of local baseball tradition and organized youth competition." },
      { title: "Spring & Fall", text: "Multiple seasonal opportunities give families more ways to stay involved." }
    ]
  },
  {
    slug: "softball",
    name: "Softball",
    short: "SB",
    season: "Spring & Fall",
    ages: "Youth Fastpitch",
    status: "closed",
    statusLabel: "Registration Closed",
    directors: "Lisa Clapper & Dave Budzyn",
    email: "softball@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2013780",
    summary: "Girls fastpitch softball focused on teamwork, confidence, fundamentals and a positive competitive environment.",
    registrationSummary: "Fall registration is currently closed. Check Sports Connect for the next available softball program.",
    highlights: [
      { title: "Fastpitch Fundamentals", text: "Players develop throwing, fielding, hitting, base running and game awareness." },
      { title: "Team Culture", text: "Coaches emphasize sportsmanship, effort and confidence alongside competition." },
      { title: "Seasonal Play", text: "Spring and fall opportunities keep players connected to the game." }
    ]
  },
  {
    slug: "basketball",
    name: "Basketball",
    short: "BK",
    season: "Winter",
    ages: "Kindergarten–12th Grade",
    status: "soon",
    statusLabel: "Check Availability",
    directors: "Dan White & Matt Snyder",
    email: "basketball@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741306",
    summary: "Recreational and travel basketball serving boys and girls from Kindergarten through high school.",
    registrationSummary: "The 2026–27 registration window is active during the fall. Sports Connect has the current program availability and deadlines.",
    highlights: [
      { title: "Recreational Basketball", text: "Age-based divisions combine instruction, practices and game play." },
      { title: "Travel Opportunities", text: "Selected age groups may offer additional regional competition." },
      { title: "K–12 Pathway", text: "Programs span introductory youth basketball through older recreational divisions." }
    ]
  },
  {
    slug: "football",
    name: "Tackle Football",
    short: "FB",
    season: "Fall",
    ages: "Ages 5–13",
    status: "closed",
    statusLabel: "Registration Closed",
    directors: "Rocky Magaro & Ian Worrall",
    email: "football@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741307",
    summary: "East Penn Panthers tackle football develops fundamentals, discipline, teamwork and community pride through age-based CFA competition.",
    registrationSummary: "2026 tackle football registration is closed. Families with questions should contact the football directors.",
    highlights: [
      { title: "Age-Based Levels", text: "Smurf, Pee Wee, Pony and Midget divisions provide an appropriate progression." },
      { title: "Panthers Tradition", text: "Players represent East Penn with a strong focus on effort, sportsmanship and team identity." },
      { title: "Volunteer Coaches", text: "Community coaches help teach both the game and the habits that make good teammates." }
    ]
  },
  {
    slug: "cheer",
    name: "Cheerleading",
    short: "CH",
    season: "Football & Basketball",
    ages: "Grades 1–8",
    status: "soon",
    statusLabel: "Seasonal Registration",
    directors: "Brandi McKenney & Crystal Katlic",
    email: "cheer@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741310",
    summary: "Football cheer, basketball cheer, competition opportunities and community events backed by generations of East Penn tradition.",
    registrationSummary: "Football Cheer is closed for the current season. Basketball Cheer registration is seasonal and subject to capacity.",
    highlights: [
      { title: "Football Cheer", text: "Squads support Panthers football throughout the fall season." },
      { title: "Basketball Cheer", text: "Seasonal squads bring EPYAL spirit into the winter program." },
      { title: "Competition & Community", text: "Cheer includes competition opportunities, Pink Out and community events." }
    ]
  },
  {
    slug: "field-hockey",
    name: "Field Hockey",
    short: "FH",
    season: "Fall",
    ages: "Youth Program",
    status: "closed",
    statusLabel: "Season In Progress",
    directors: "Liz Horrick & Kristin Becker",
    email: "fieldhockey@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=1326003",
    summary: "A local youth field hockey program introducing players to fundamentals, teamwork and organized competition.",
    registrationSummary: "Current fall registration is not advertised as open. Contact the directors or check Sports Connect for current availability.",
    highlights: [
      { title: "Learn the Game", text: "Players build stick skills, positioning, passing and game awareness." },
      { title: "Local Community", text: "A convenient East Penn option for families interested in youth field hockey." },
      { title: "Fall Season", text: "The program centers on the fall youth sports calendar." }
    ]
  },
  {
    slug: "flag-football",
    name: "Flag Football",
    short: "FF",
    season: "Summer",
    ages: "Ages 5–17",
    status: "soon",
    statusLabel: "2027 Coming Soon",
    directors: "Jared Bornman & Ken Field",
    email: "flagfootball@epyal.com",
    registrationUrl: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741308",
    summary: "Summer flag football with age-based divisions, tournament play and an accessible path into the game.",
    registrationSummary: "Summer 2027 information is coming soon.",
    highlights: [
      { title: "Ages 5–17", text: "Divisions run from Pee Wee through Pro." },
      { title: "Summer Competition", text: "A fast-paced seasonal option outside the traditional fall tackle schedule." },
      { title: "Volunteer Driven", text: "Coaches and families help make the program possible each summer." }
    ]
  }
];

export const news: NewsItem[] = [
  {
    slug: "basketball-registration-2026",
    title: "2026–27 Basketball Registration",
    date: "September 2026",
    category: "Registration",
    excerpt: "Families can review the current basketball program information and continue into Sports Connect for live availability."
  },
  {
    slug: "cheer-tradition",
    title: "Celebrating Generations of East Penn Cheer",
    date: "2026 Season",
    category: "League",
    excerpt: "Football, basketball, competition and community events continue a proud Panthers cheer tradition."
  },
  {
    slug: "smurf-bowl",
    title: "Panthers Championship Tradition",
    date: "League Highlight",
    category: "Football",
    excerpt: "A look at the athletes, coaches and families who help build the East Penn football program."
  }
];

export const events: EventItem[] = [
  { title: "Public Board Meeting", date: "October 7, 2026", time: "8:00 PM", location: "Sheaffer Field — Upstairs", category: "Board" },
  { title: "Cheer Competition Pin Making", date: "October 22, 2026", time: "6:30 PM", location: "Sheaffer Field — Upstairs", category: "Cheer" },
  { title: "Field Hockey Fundraiser", date: "October 23, 2026", time: "5:00 PM", location: "Sheaffer Field — Upstairs", category: "Fundraising" },
  { title: "Public Board Meeting", date: "November 4, 2026", time: "8:00 PM", location: "Sheaffer Field — Upstairs", category: "Board" }
];

export const leadership = [
  { role: "President", name: "Steve Chernov", email: "" },
  { role: "Vice President", name: "Barry Donbaugh", email: "" },
  { role: "Secretary", name: "Alicia Worrall", email: "" },
  { role: "Treasurer", name: "Rob Maxwell", email: "treasurer@epyal.com" },
  { role: "Baseball Directors", name: "Kyle Trovinger & Jason Clapper", email: "baseball@epyal.com" },
  { role: "Basketball Directors", name: "Dan White & Matt Snyder", email: "basketball@epyal.com" },
  { role: "Football Directors", name: "Rocky Magaro & Ian Worrall", email: "football@epyal.com" },
  { role: "Cheer Directors", name: "Brandi McKenney & Crystal Katlic", email: "cheer@epyal.com" },
  { role: "Softball Directors", name: "Lisa Clapper & Dave Budzyn", email: "softball@epyal.com" },
  { role: "Field Hockey Directors", name: "Liz Horrick & Kristin Becker", email: "fieldhockey@epyal.com" },
  { role: "Flag Football Directors", name: "Jared Bornman & Ken Field", email: "flagfootball@epyal.com" },
  { role: "Fundraising Director", name: "James Edrington", email: "fundraising@epyal.com" }
];

export const sponsors: Sponsor[] = [
  { name: "Premier Partner Opportunity", tier: "Premier" },
  { name: "Sport Partner Opportunity", tier: "Sport" },
  { name: "Community Partner Opportunity", tier: "Community" },
  { name: "Community Partner Opportunity", tier: "Community" }
];

export const sportsConnectRoot = "https://tshq.bluesombrero.com/Default.aspx?tabid=1326003";
