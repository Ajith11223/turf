import { images } from "./images.js";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" }
];

export const contact = {
  address:
    "Unit 424, 4th Floor, Rosewood City, Eros City Square, Sector 49, Gurugram, Haryana 122018",
  phones: ["+91 99586 77005", "+91 70007 85268"],
  email: "hello@gallantsports.test",
  hours: "Mon–Sat, 9:30am – 6:30pm IST",
  mapUrl: "https://maps.google.com/?q=Eros+City+Square+Gurugram"
};

export const stats = [
  { value: 800, suffix: "+", label: "Projects handed over" },
  { value: 21, suffix: "", label: "States we have built in" },
  { value: 12, suffix: "hr", label: "Daily play the surfaces take" },
  { value: 8, suffix: "yr", label: "Typical surface warranty" }
];

export const surfaces = [
  {
    name: "Football turf",
    spec: "40–60 mm monofilament, FIFA Quality tested",
    image: images.surfaces.turf
  },
  {
    name: "Athletic track",
    spec: "13 mm full-PU or prefabricated, World Athletics class",
    image: images.surfaces.track
  },
  {
    name: "Interlocking tiles",
    spec: "Modular PP, outdoor multi-sport, 8-year warranty",
    image: images.surfaces.tiles
  },
  {
    name: "Indoor vinyl",
    spec: "4.5–7 mm PVC for badminton, basketball and volleyball",
    image: images.surfaces.vinyl
  }
];

export const services = [
  {
    slug: "design",
    title: "Design",
    lead: "CAD drawings before a single truck arrives.",
    body: "Every court starts as a measured drawing: layout, run-off margins, line markings for each sport that will share the surface, colour build-up and drainage falls. You approve the drawing, then we build exactly that.",
    detail:
      "A survey team measures the plot, checks levels and existing drainage, and marks the run-off you will actually need around each playing area.\nYou get a CAD layout with colour build-up, inlaid line markings for every sport that will share the surface, and a 3D view so non-technical committees can see what they are approving.\nNothing moves to site until that drawing is signed. Changes after signing are priced openly rather than absorbed into a vague line item.",
    faqs: [
      { q: "How long does the drawing take?", a: "Seven to ten working days from the site visit for a single court, two to three weeks for a multi-sport complex." },
      { q: "Can we mark more than one sport on one surface?", a: "Yes. We usually overlay up to three, using a colour hierarchy so the primary sport stays readable." }
    ],
    deliverables: ["Site survey", "CAD layout + 3D view", "Material spec", "Bill of quantities"],
    image: images.services.design
  },
  {
    slug: "civil-works",
    title: "Civil works",
    lead: "The base decides how the surface ages.",
    body: "Sub-base, compaction, kerbs, perforated drainage and a laser-levelled concrete or bitumen deck. Get this wrong and no surface on top will save it, so we do it ourselves rather than inherit someone else's slab.",
    detail:
      "Excavation, sub-base, compaction testing, kerbs and a laser-levelled deck. We record compaction results at each layer so there is a paper trail if the surface ever settles.\nPerforated drainage runs under the whole playing area and ties into a harvesting pit where the site allows it, which is what gets a pitch back in play within an hour of heavy rain.\nWe do this ourselves rather than inherit a slab someone else poured, because a base defect shows up two years later and by then nobody owns it.",
    faqs: [
      { q: "Can you build on an existing slab?", a: "Sometimes. We core-test it first and tell you honestly whether it is worth keeping." },
      { q: "What about monsoon?", a: "Base work pauses in heavy rain. We plan the schedule around the local season rather than promising through it." }
    ],
    deliverables: ["Excavation & compaction", "Drainage network", "Laser-screed deck", "Kerb & edge detail"],
    image: images.services["civil-works"]
  },
  {
    slug: "manufacture",
    title: "Manufacture",
    lead: "Yarn to roll, under one roof.",
    body: "Turf, shock pads, interlocking tiles and vinyl are produced on our own lines with our partners, so the warranty comes from the people who made the product and the people who laid it.",
    detail:
      "Yarn extrusion, tufting, coating and quality testing happen on our own lines and those of our manufacturing partners, so the warranty comes from the people who made the roll.\nEvery batch is tested for pile height, tuft withdrawal force and UV stability before it ships. Batch numbers are recorded against your project, so a replacement roll in year four still matches.",
    faqs: [
      { q: "Where is the turf made?", a: "In India and at our partner plants; we tell you the origin of each component in the quote." },
      { q: "What does the warranty cover?", a: "Fibre degradation and backing failure under normal play, typically eight years, subject to the maintenance schedule being followed." }
    ],
    deliverables: ["Turf & shock pad", "PP interlocking tiles", "PVC vinyl", "Prefabricated rubber"],
    image: images.services.manufacture
  },
  {
    slug: "installation",
    title: "Installation",
    lead: "Seamed, infilled, line-marked, handed over.",
    body: "Trained crews with the right machines: seaming, infill spreading, brushing and inlaid line marking. We photograph every stage so you can see what went under the surface after it is covered.",
    detail:
      "Rolls are laid, seamed and glued, then infilled with sand and rubber in measured passes and brushed in until the pile stands correctly.\nLine markings are inlaid, not painted, so they do not wear off in the first season.\nWe photograph every stage — base, pad, seams, infill depth — and hand the log over with the completion certificate, so you can see what is under the surface after it is covered.",
    faqs: [
      { q: "How long does installation take?", a: "A full-size football field is usually 12 to 18 days on site once the base is cured." },
      { q: "Can we play immediately?", a: "Yes, once the infill has settled — normally 48 hours after the final brushing." }
    ],
    deliverables: ["Seaming & gluing", "Infill & brushing", "Inlaid markings", "Stage-wise photo log"],
    image: images.services.installation
  },
  {
    slug: "fencing-lighting",
    title: "Fencing & lighting",
    lead: "The parts that make it playable after 6pm.",
    body: "Perimeter fencing, netting, LED masts with lux mapping for the sport you are hosting, plus goals, posts and movable accessories so the facility is ready to use on handover day.",
    detail:
      "We run a lux calculation for the sport and the level of play, then place masts so the light falls evenly and the glare stays off the goalkeeper.\nFencing height is set by what the sport does to a ball: 4 m for football, higher behind the goals, netting rather than mesh where noise matters.\nGoals, nets, posts and movable accessories are installed and handed over on the same day as the surface, so the facility is usable immediately.",
    faqs: [
      { q: "What lux level do we need?", a: "Around 200 lux for recreational play, 500 for competition, 1,000 and up if you intend to broadcast." },
      { q: "Do you handle the electrical work?", a: "Up to the panel, yes. Supply from the main board is usually the client's contractor." }
    ],
    deliverables: ["Lux design", "LED masts", "Perimeter fence & netting", "Goals, nets, posts"],
    image: images.services["fencing-lighting"]
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    lead: "Scheduled care, not emergency repair.",
    body: "Decompaction, infill top-up, deep cleaning and rejuvenation on a calendar you sign once. Facilities on a maintenance plan hold their certified performance years longer than ones that are not.",
    detail:
      "A quarterly visit with a Redexim groomer: decompaction, infill redistribution, deep cleaning and a top-up where the depth has dropped.\nWe log infill depth and surface hardness each visit, so you can see the trend rather than a pass/fail.\nFacilities on a plan hold their certified performance years longer than ones serviced only when something goes wrong, which is the whole argument for signing the calendar at handover.",
    faqs: [
      { q: "What happens if we skip a service?", a: "Infill compacts, the pile lies flat and shock absorption drops. It also affects the product warranty." },
      { q: "Do you maintain surfaces you did not install?", a: "Yes, after an inspection visit to see what state it is in." }
    ],
    deliverables: ["Quarterly service", "Infill top-up", "Deep clean & decompaction", "Repair response"],
    image: images.services.maintenance
  }
];

export const testimonials = [
  {
    quote:
      "The team turned our vision into a real facility — one full-size football field, cricket nets, basketball and badminton courts, a skating rink and a children's play area across a lakh square feet. Coordination with our civil work was handled properly and the timeline held.",
    name: "Poonam Gupta",
    role: "Principal, BGS International School",
    sport: "Multi-sport",
    avatar: images.people.gupta
  },
  {
    quote:
      "Sport is how we build character here, and the football, hockey and basketball courts have raised the standard of what we can offer. The attention to detail during the build was the part that impressed us most.",
    name: "B. S. Bedi",
    role: "Shivalik School, Chandigarh",
    sport: "Hockey",
    avatar: images.people.bedi
  },
  {
    quote:
      "Basketball, football, volleyball, kho-kho and a proper running track. Their civil team worked alongside ours without friction, and the communication through the project was clear at every stage.",
    name: "Vasu Reddy",
    role: "Atlantis School, Tirupati",
    sport: "Athletics",
    avatar: images.people.vasu
  },
  {
    quote:
      "We wanted a surface our students could use every day of the year, and that is exactly what we got. Three years in, it still plays the way it did in the first week.",
    name: "Brother Varghese",
    role: "St. George's College, Mussoorie",
    sport: "Football",
    avatar: images.people.varghese
  },
  {
    quote:
      "More partner than vendor. They understood the brief, designed a complex around it and delivered a football field with a race track plus padel, basketball and volleyball courts.",
    name: "Anil Kedia",
    role: "Sparsh Global School, Greater Noida",
    sport: "Padel",
    avatar: images.people.kedia
  },
  {
    quote:
      "The maintenance plan is the reason we signed again. Someone turns up on schedule, the infill gets topped up and we never have to chase anyone.",
    name: "Meera Dalal",
    role: "Principal, Nagarvala School, Pune",
    sport: "Basketball",
    avatar: images.people.dalal
  }
];

export const projects = [
  {
    name: "YUPIA Stadium",
    place: "Arunachal Pradesh",
    type: "FIFA-approved football field",
    area: "11,200 sq m",
    year: "2025",
    image: images.projects.yupia
  },
  {
    name: "Rajsamand Hockey Ground",
    place: "Rajasthan",
    type: "FIH Global hockey field",
    area: "7,400 sq m",
    year: "2024",
    image: images.projects.rajsamand
  },
  {
    name: "K. R. Mangalam World School",
    place: "Gurugram",
    type: "Football, tennis, basketball, indoor",
    area: "9,000 sq m",
    year: "2024",
    image: images.projects.mangalam
  },
  {
    name: "St. George's College",
    place: "Mussoorie",
    type: "Multi-sport & indoor hall",
    area: "6,100 sq m",
    year: "2023",
    image: images.projects.georges
  },
  {
    name: "Amity University",
    place: "Mohali",
    type: "400 m athletic track & courts",
    area: "14,500 sq m",
    year: "2023",
    image: images.projects.amity
  },
  {
    name: "Conscient Sports",
    place: "Gurgaon",
    type: "Padel & pickleball courts",
    area: "2,300 sq m",
    year: "2025",
    image: images.projects.conscient
  }
];

export const partners = [
  "CCGrass",
  "Domo Sports Grass",
  "Enlio",
  "Redexim",
  "Envirostik",
  "Casali",
  "Make in India"
];

export const process = [
  { step: "01", title: "Consultation", note: "Site visit, sport mix, budget band and a realistic build window." },
  { step: "02", title: "Construction", note: "Base, drainage and civil work executed by our own crews." },
  { step: "03", title: "Installation", note: "Surface laid, infilled and line-marked to the approved drawing." },
  { step: "04", title: "Maintenance", note: "A signed service calendar that keeps the surface certified." }
];
