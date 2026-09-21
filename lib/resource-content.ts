export type ResourceLink = {
  title: string;
  description: string;
  href: string;
  category: "Parents" | "Coaches" | "Safety" | "Policies" | "Baseball" | "Football" | "Flag Football" | "Softball" | "Cheer";
  external?: boolean;
};

export type SportEditorial = {
  intro: string;
  divisions?: { name: string; detail: string }[];
  familyNotes?: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  relatedResources?: string[];
};

export const codeOfConductUrl = "https://tshq.bluesombrero.com/Default.aspx?tabid=2754793";
export const baseballWelcomeGuideUrl = "https://tshq.bluesombrero.com/portals/21360/users/247/87/133124087/epyal-baseball-welcome-s25.pdf";
export const paClearancesUrl = "https://www.pa.gov/agencies/dhs/resources/keep-kids-safe/child-abuse-clearances";
export const littleLeagueVolunteerUrl = "https://www.littleleague.org/volunteer/";
export const cfaUrl = "https://www.cfayfl.com";

export const resources: ResourceLink[] = [
  {
    title: "EPYAL Player & Parent Code of Conduct",
    description: "League expectations for sportsmanship, respect, attendance, equipment care and parent behavior.",
    href: codeOfConductUrl,
    category: "Policies",
    external: true
  },
  {
    title: "Pennsylvania Child Abuse Clearances",
    description: "Official Commonwealth information about clearances required for adults who work or volunteer with children.",
    href: paClearancesUrl,
    category: "Safety",
    external: true
  },
  {
    title: "Little League Volunteer Information",
    description: "Official Little League overview of volunteering, applications, background checks and abuse-awareness training.",
    href: littleLeagueVolunteerUrl,
    category: "Coaches",
    external: true
  },
  {
    title: "EPYAL Baseball Parent Welcome Guide",
    description: "A detailed guide for baseball families covering what happens after registration, season expectations and parent responsibilities.",
    href: baseballWelcomeGuideUrl,
    category: "Baseball",
    external: true
  },
  {
    title: "EPYAL Baseball Resources",
    description: "Current baseball page with coaching requirements, coaching application, parent guide, injury form and donation information.",
    href: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741249",
    category: "Baseball",
    external: true
  },
  {
    title: "EPYAL Softball Volunteer Resources",
    description: "Current softball page with Pennsylvania volunteer requirements, Little League volunteer forms and Code of Conduct links.",
    href: "https://tshq.bluesombrero.com/Default.aspx?tabid=2013780",
    category: "Softball",
    external: true
  },
  {
    title: "EPYAL Flag Football Rules & Coaching Resources",
    description: "Current flag football page with rule book, volunteer openings, coaching application and Code of Conduct links.",
    href: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741308",
    category: "Flag Football",
    external: true
  },
  {
    title: "CFA Youth Football",
    description: "Capital Football Association league information and football resources.",
    href: cfaUrl,
    category: "Football",
    external: true
  },
  {
    title: "EPYAL Cheer Information",
    description: "Current cheer page with seasonal requirements, coaching information and football/basketball cheer details.",
    href: "https://tshq.bluesombrero.com/Default.aspx?tabid=2741310",
    category: "Cheer",
    external: true
  }
];

export const generalFaq = [
  {
    question: "Where do I register my child for EPYAL sports?",
    answer: "Program information and registration status are published on this website. The final parent login, participant registration, waivers and payment are completed through EPYAL’s existing Sports Connect / Blue Sombrero system."
  },
  {
    question: "Do I need a separate account for the new EPYAL website?",
    answer: "No. The public website is designed for league information and communications. Parent registration accounts continue to live in Sports Connect."
  },
  {
    question: "How do I know when registration opens?",
    answer: "Use the Registration Center, subscribe to EPYAL email updates and follow the individual sport page. Registration windows vary by sport and season."
  },
  {
    question: "Who should I contact with a sport-specific question?",
    answer: "Each sport page lists the current program directors and sport email address. The Leadership page also provides a league-wide contact directory."
  },
  {
    question: "How can I volunteer or coach?",
    answer: "Start with the Get Involved and Coaches & Volunteers pages. Coaching requirements vary by sport, and adults working with youth may need required Pennsylvania clearances and sport-specific background checks or training."
  },
  {
    question: "Where can I find field or facility information?",
    answer: "The Locations page lists EPYAL’s primary facilities and common program locations. Team schedules may also use regional away sites."
  },
  {
    question: "How do I become an EPYAL sponsor?",
    answer: "Visit the Sponsors page or contact fundraising@epyal.com. The new website is being structured to support league-wide, sport-specific and community partner visibility."
  },
  {
    question: "Where will game and team photos live?",
    answer: "EPYAL Photos is being expanded from the Cheer photography portal into a league-wide home for sport and team albums."
  }
];

export const sportEditorial: Record<string, SportEditorial> = {
  baseball: {
    intro: "EPYAL Baseball is one of the league’s longest-running programs and gives East Pennsboro families a local path from introductory youth baseball through older divisions. The program emphasizes fundamentals, sportsmanship, teamwork and the broader life lessons associated with Little League baseball.",
    divisions: [
      { name: "Junior / Player Pitch", detail: "Developing player-pitch level, generally around ages 7–8 with experience also considered." },
      { name: "9 Year Old", detail: "Age-based division for nine-year-old players." },
      { name: "Fall Majors", detail: "Generally serves players around ages 10–11." },
      { name: "12 Year Old", detail: "Age-based division for 12-year-old players." },
      { name: "Teeners", detail: "Ages 13–17 with 90-foot bases." }
    ],
    familyNotes: [
      { title: "Uniforms", text: "EPYAL’s current baseball information states that the league provides a shirt and hat. Families provide white baseball pants." },
      { title: "Fall Fees", text: "The current public Fall Baseball page lists $75 for Junior, 9 Year Old and Fall Majors, and $85 for 12 Year Old and Teeners. Always confirm the active Sports Connect listing before registering." },
      { title: "Parent Expectations", text: "The baseball welcome guide asks families to arrive on time when possible, support the whole team, respect volunteer coaches and officials, and follow the EPYAL Code of Conduct." }
    ],
    faq: [
      { question: "What happens after baseball registration closes?", answer: "Baseball leadership forms teams and communicates rosters, coach information and season details to families. The Baseball Parent Welcome Guide is a useful reference for what to expect." },
      { question: "Does EPYAL Baseball participate in tournaments?", answer: "The Baseball Parent Welcome Guide describes optional tournament-team opportunities for selected players, generally involving additional practices, travel and family expenses." },
      { question: "What equipment or uniform items does my child need?", answer: "Current public information states EPYAL provides a shirt and hat for Fall Baseball and families provide white baseball pants. Division-specific equipment needs should be confirmed with coaches." }
    ],
    relatedResources: ["EPYAL Baseball Parent Welcome Guide", "EPYAL Baseball Resources", "EPYAL Player & Parent Code of Conduct"]
  },
  softball: {
    intro: "EPYAL Girls Fastpitch Softball is built around confidence, teamwork, positive attitudes and long-term enjoyment of the sport. The program serves East Pennsboro families through organized spring and fall fastpitch opportunities.",
    familyNotes: [
      { title: "Uniforms", text: "Current program information states players receive a team jersey and socks. Families provide black softball pants and a fielder’s mask." },
      { title: "Season Rhythm", text: "For Fall 2026, the public page listed practices beginning the week of August 10, weather permitting, with games beginning in late August." },
      { title: "Volunteer Requirements", text: "The softball program links families and coaches to Pennsylvania volunteer requirements, Little League volunteer forms and the EPYAL Code of Conduct." }
    ],
    faq: [
      { question: "Is softball offered in more than one season?", answer: "EPYAL Softball operates spring and fall programs, with registration windows and exact schedules published by the program." },
      { question: "What uniform items are supplied?", answer: "The current public softball page states EPYAL provides the team jersey and socks. Families are responsible for black softball pants and a fielder’s mask." },
      { question: "Where do coaches find volunteer requirements?", answer: "Use the Coaches & Volunteers and Documents pages, which link to EPYAL’s current softball volunteer resources and official Pennsylvania clearance information." }
    ],
    relatedResources: ["EPYAL Softball Volunteer Resources", "Pennsylvania Child Abuse Clearances", "EPYAL Player & Parent Code of Conduct"]
  },
  basketball: {
    intro: "EPYAL Basketball provides winter recreational and travel opportunities for boys and girls from Kindergarten through 12th grade. The program is designed to give younger players an introduction to organized basketball while maintaining recreational and competitive options as athletes progress.",
    divisions: [
      { name: "Girls Recreational", detail: "Kindergarten, 1st/2nd, 3rd/4th, 5th/6th, 7th/8th and 9th–12th grade divisions are listed on the current program page." },
      { name: "Girls Travel", detail: "The current public page lists a 5th/6th Grade Travel option, subject to participation." },
      { name: "Boys Recreational", detail: "Kindergarten, 1st/2nd, 3rd, 4th, 5th/6th, 7th/8th and 9th–12th grade divisions are listed." },
      { name: "Boys Travel", detail: "The current public page lists 4th, 5th and 6th Grade Travel options, subject to participation." }
    ],
    familyNotes: [
      { title: "Kindergarten Format", text: "Current program information describes Kindergarten as a 60-minute Saturday morning session combining instruction and game play." },
      { title: "Program Availability", text: "Not every listed division is guaranteed each season. The program notes that levels depend on having enough registered players." },
      { title: "Winter Program", text: "Basketball is EPYAL’s primary winter indoor program, with recreational and selected travel opportunities." }
    ],
    faq: [
      { question: "Is basketball open to both boys and girls?", answer: "Yes. The current program page lists boys and girls divisions from Kindergarten through 12th grade, subject to participation at each level." },
      { question: "Are travel teams guaranteed?", answer: "No. Travel offerings depend on the season and participation. Sports Connect and program communication are the best sources for the currently available divisions." },
      { question: "What is Kindergarten basketball like?", answer: "EPYAL’s current program information describes a 60-minute Saturday morning session focused on instruction and game play." }
    ]
  },
  football: {
    intro: "EPYAL Tackle Football gives East Pennsboro youth an age-based path into organized football through the Capital Football Association. The program emphasizes fundamentals, team identity, discipline, sportsmanship and safe progression through each level.",
    divisions: [
      { name: "Smurf", detail: "Ages 5–7. The current CFA weight limit published by EPYAL is 85 pounds or less before the striper rule applies." },
      { name: "Pee Wee", detail: "Ages 7–9. Current published CFA weight limit: 110 pounds or less." },
      { name: "Pony", detail: "Ages 10–11. Current published CFA weight limit: 135 pounds or less." },
      { name: "Midget", detail: "Up to age 13. Current published CFA weight limit: 165 pounds or less." }
    ],
    familyNotes: [
      { title: "Age Date", text: "EPYAL’s current football page uses the player’s age as of April 30 of the current year for eligibility." },
      { title: "Striper Rule", text: "Players above the published weight limit may still participate under CFA’s striper rule, which restricts them to designated offensive and defensive line positions." },
      { title: "CFA Competition", text: "EPYAL participates in Capital Football Association competition. League rules and updates may affect season-specific requirements." }
    ],
    faq: [
      { question: "How is tackle football placement determined?", answer: "Age is the primary published guideline, but EPYAL notes that other factors can affect level placement." },
      { question: "Can a player participate if they exceed the standard weight limit?", answer: "The current football page describes CFA’s striper rule, which allows participation above the standard weight limit with position restrictions." },
      { question: "Where can I find CFA information?", answer: "The Documents & Policies page links to the Capital Football Association website and EPYAL’s current football page." }
    ],
    relatedResources: ["CFA Youth Football", "EPYAL Player & Parent Code of Conduct"]
  },
  cheer: {
    intro: "EPYAL Cheerleading supports football and basketball programs while also participating in community events and competition opportunities. The program has celebrated more than 75 years of East Penn cheer tradition.",
    divisions: [
      { name: "Football Cheer", detail: "Grades 1–8, organized into Smurf, Pee Wee, Pony and Midget squads." },
      { name: "Basketball Cheer", detail: "Seasonal grade-group squads, with the current public page listing a program capacity of 60 cheerleaders." }
    ],
    familyNotes: [
      { title: "Community Activities", text: "The current cheer page highlights activities such as the Sports Parade, a high school Friday night experience, the township Halloween Parade, Pink Out, competition and an end-of-season party." },
      { title: "Residency", text: "The current Football Cheer page states participants must reside in East Pennsboro Township; EPYAL is not a school-district program." },
      { title: "Coaching", text: "Cheer coaching requests require background checks and EPYAL board approval. The program recommends starting the process early because board approval occurs on a monthly meeting cycle." }
    ],
    faq: [
      { question: "Does EPYAL offer both football and basketball cheer?", answer: "Yes. The program publishes separate seasonal information for Football Cheer and Basketball Cheer." },
      { question: "Is cheer connected to the school district?", answer: "The current EPYAL Cheer page states the program is not associated with the school district and bases football-cheer eligibility on East Pennsboro Township residency." },
      { question: "How do I apply to coach cheer?", answer: "Contact the Cheer Directors. The current program information states coaches must complete background checks and receive EPYAL board approval." }
    ],
    relatedResources: ["EPYAL Cheer Information", "Pennsylvania Child Abuse Clearances"]
  },
  "field-hockey": {
    intro: "EPYAL Field Hockey gives local youth an opportunity to learn the sport close to home while building stick skills, field awareness, teamwork and confidence in a fall youth-sports setting.",
    familyNotes: [
      { title: "Fall Program", text: "Field Hockey is currently presented as a fall youth program." },
      { title: "Program Updates", text: "Because public legacy information is limited, families should use the current EPYAL registration system and contact the directors for season-specific details." },
      { title: "Local Development", text: "The program provides an entry point into field hockey for East Pennsboro families without requiring a school-based program." }
    ],
    faq: [
      { question: "When does Field Hockey register?", answer: "Registration timing can vary. Use the EPYAL Registration Center and Sports Connect for live availability." },
      { question: "Who should I contact about Field Hockey?", answer: "The current directors are listed on the Field Hockey program page and Leadership directory." },
      { question: "Where are practices and games?", answer: "Locations vary by season and schedule. Check coach communication and the Locations page once team schedules are published." }
    ]
  },
  "flag-football": {
    intro: "EPYAL Flag Football offers a summer football experience for ages 5–17, with age-based divisions that let athletes learn spacing, passing, route running, defense and team play in a non-tackle format.",
    divisions: [
      { name: "Pee Wee", detail: "Ages 5–6, based on age as of June 1." },
      { name: "Pony", detail: "Ages 7–8, based on age as of June 1." },
      { name: "Midget", detail: "Ages 9–10, based on age as of June 1." },
      { name: "Semi-Pro", detail: "Ages 11–13, based on age as of June 1." },
      { name: "Pro", detail: "Ages 14–17, based on age as of June 1." }
    ],
    familyNotes: [
      { title: "Summer Season", text: "The current program page is already pointing families toward the Summer 2027 season." },
      { title: "Tournament", text: "EPYAL’s current Flag Football page lists a tentative 2027 tournament window in July." },
      { title: "Coaching", text: "Interested coaches can use the program’s coaching application and volunteer resources linked from the current Flag Football page." }
    ],
    faq: [
      { question: "What age is used for division placement?", answer: "The current Flag Football page states division registration is based on the participant’s age as of June 1." },
      { question: "Does Flag Football have a tournament?", answer: "Yes. The current program page lists a tentative summer tournament window, with exact dates subject to change." },
      { question: "How can I coach?", answer: "Use the Coaches & Volunteers page or the current Flag Football resource page for coaching application information." }
    ],
    relatedResources: ["EPYAL Flag Football Rules & Coaching Resources", "EPYAL Player & Parent Code of Conduct"]
  }
};

export const parentGuideSections = [
  {
    title: "Before You Register",
    text: "Review the sport page for season, age or grade range, current registration status and director contact information. Then continue into Sports Connect to see the exact programs available for your child."
  },
  {
    title: "After Registration",
    text: "Program directors and coaches communicate team placement, practice schedules, game schedules and sport-specific equipment or uniform requirements after registration closes and teams are formed."
  },
  {
    title: "Sportsmanship",
    text: "EPYAL’s published Code of Conduct emphasizes respect for coaches, teammates, opponents and officials, positive support, attendance and responsible care of equipment."
  },
  {
    title: "Volunteer Expectations",
    text: "Youth sports rely on family participation. Depending on the sport, families may be asked to help with concessions, fields, events, fundraising, scorekeeping or other game-day needs."
  },
  {
    title: "Weather & Schedule Changes",
    text: "Outdoor youth sports are weather dependent. Families should watch team communication and league updates for field closures, delays or schedule changes."
  },
  {
    title: "Questions During the Season",
    text: "Start with your coach for team-specific questions and your sport directors for program-level issues. The Leadership page lists current contacts across the league."
  }
];
