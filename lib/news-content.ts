export type NewsEditorial = {
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedLinks?: { label: string; href: string }[];
};

export const newsEditorial: Record<string, NewsEditorial> = {
  "basketball-registration-2026": {
    intro: "EPYAL Basketball serves boys and girls from Kindergarten through 12th grade with recreational divisions and selected travel opportunities. Families can use the new Registration Center to understand the program before continuing into Sports Connect.",
    sections: [
      {
        heading: "2026–27 program overview",
        paragraphs: [
          "The current EPYAL basketball information lists programs for boys and girls from Kindergarten through 12th grade, with exact divisions dependent on participation each season.",
          "Recreational basketball provides the broadest age pathway. Selected grades may also offer travel basketball when participation and team formation support it."
        ]
      },
      {
        heading: "How registration works",
        paragraphs: [
          "EPYAL’s public website shows registration status and program information, while Sports Connect remains the secure registration system for parent accounts, participant information, waivers and payment.",
          "Families who already have an EPYAL Sports Connect account can log in to see available programs. New families create an account so the platform can determine which programs are available for their children."
        ]
      },
      {
        heading: "Questions before registering",
        paragraphs: [
          "Use the Basketball program page for director contacts, division information and current registration status. Because availability can change as teams fill, Sports Connect remains the final source for active program listings."
        ]
      }
    ],
    relatedLinks: [
      { label: "Basketball Program", href: "/sports/basketball" },
      { label: "Registration Center", href: "/registration" },
      { label: "Parent Guide", href: "/parents" }
    ]
  },
  "cheer-tradition": {
    intro: "EPYAL Cheerleading has been part of the East Penn sports community for generations, combining football cheer, basketball cheer, competition opportunities and community events.",
    sections: [
      {
        heading: "More than game day",
        paragraphs: [
          "The current Cheer program highlights activities beyond regular games and practices, including the Sports Parade, Pink Out, township events, high school cheer experiences, competition and end-of-season celebrations.",
          "Those experiences help make Cheer one of EPYAL’s most visible community programs."
        ]
      },
      {
        heading: "Football and basketball seasons",
        paragraphs: [
          "EPYAL publishes separate seasonal information for Football Cheer and Basketball Cheer. Football Cheer is structured around grade-based squads, while Basketball Cheer is offered as a winter-season program with its own capacity and coaching structure.",
          "Families should use the Cheer program page and Sports Connect for current registration availability because dates, squad sizes and requirements can change from season to season."
        ]
      },
      {
        heading: "Coaching and safety",
        paragraphs: [
          "The current Cheer page states that coaching applicants must complete required background checks and receive EPYAL board approval. Families interested in coaching are encouraged to start early because approvals follow the league’s meeting and review process."
        ]
      }
    ],
    relatedLinks: [
      { label: "Cheerleading Program", href: "/sports/cheer" },
      { label: "Coaches & Volunteers", href: "/coaches" },
      { label: "Safety & Clearances", href: "/safety" }
    ]
  },
  "smurf-bowl": {
    intro: "The East Penn Panthers’ 2025 Smurf Bowl championship is one example of the community, coaching and player development that make youth football meaningful beyond the final score.",
    sections: [
      {
        heading: "A Panthers milestone",
        paragraphs: [
          "EPYAL’s legacy website recognized the East Penn Smurfs as 2025 Liberty Conference Smurf Bowl Champions. Moments like that reflect the work of young athletes, volunteer coaches and families across an entire season.",
          "The new website gives achievements like these a permanent home instead of allowing them to disappear in a social-media feed."
        ]
      },
      {
        heading: "Building the next season",
        paragraphs: [
          "EPYAL Tackle Football serves players across Smurf, Pee Wee, Pony and Midget levels. The program publishes age-based eligibility and Capital Football Association weight guidelines on its current football page.",
          "Families can use the Football program page for current directors, age information, registration status and links into Sports Connect."
        ]
      }
    ],
    relatedLinks: [
      { label: "Tackle Football Program", href: "/sports/football" },
      { label: "Football Registration", href: "/registration" },
      { label: "League News", href: "/news" }
    ]
  }
};
