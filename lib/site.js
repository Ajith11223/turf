import { images } from "./images.js";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" }
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
  { value: 200, suffix: "+", label: "Projects handed over" },
  { value: 500, suffix: "+", label: "Locations we have built in" },
  { value: 10, suffix: " years", label: "Years of Experience" },
  { value: 24, suffix: " hr", label: "Maintenance Support" }
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
    slug: "artificial-football-turf",
    title: "Artificial Football Turf",
    body: "High-quality artificial football turf solutions designed for regular play, training and competitive sports environments.",
    image: images.services["artificial-football-turf"]
  },
  {
    slug: "box-cricket-arenas",
    title: "Box Cricket Arenas",
    body: "Complete box cricket arena development with suitable playing surfaces, protective netting and supporting infrastructure.",
    image: images.services["box-cricket-arenas"]
  },
  {
    slug: "basketball-courts",
    title: "Basketball Courts",
    body: "Durable basketball court solutions with appropriate sports flooring, court markings and functional layouts.",
    image: images.services["basketball-courts"]
  },
  {
    slug: "pickleball-courts",
    title: "Pickleball Courts",
    body: "Modern pickleball court construction designed for recreational play, clubs and sports facilities.",
    image: images.services["pickleball-courts"]
  },
  {
    slug: "volleyball-courts",
    title: "Volleyball Courts",
    body: "Functional volleyball courts with suitable playing surfaces, court markings and supporting infrastructure.",
    image: images.services["volleyball-courts"]
  },
  {
    slug: "badminton-courts",
    title: "Badminton Courts",
    body: "Quality-focused badminton court solutions with appropriate flooring and layouts for training and competitive play.",
    image: images.services["badminton-courts"]
  },
  {
    slug: "tennis-courts",
    title: "Tennis Courts",
    body: "Complete tennis court construction solutions with suitable playing surfaces, accurate markings and supporting facilities.",
    image: images.services["tennis-courts"]
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
