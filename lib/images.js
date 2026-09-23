/**
 * Every image in the site points here, so you can replace the whole photo set
 * from one file.
 *
 * Right now these are sample photos from picsum.photos (stable, free, no key).
 * To use your own: drop files into /public/images/ and change the value to
 * "/images/football-turf.jpg". Nothing else in the code needs to change.
 *
 * Suggested searches when you shoot or buy real photos:
 *   hero            — floodlit football turf, low angle, mowing stripes visible
 *   services.*      — crew laying turf, laser screed, line marking, LED mast
 *   projects.*      — finished courts from above / three-quarter angle
 *   testimonials.*  — headshots of the person quoted
 */

const sample = (seed, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const images = {
  hero: sample("gs-football-turf", 1920, 1200),
  heroInset: sample("gs-turf-closeup", 800, 1000),

  about: {
    story: sample("gs-about-crew", 1200, 1400),
    sustainability: sample("gs-drainage", 1200, 800),
    team: sample("gs-team", 1200, 800)
  },

  services: {
    design: sample("gs-cad-design", 900, 700),
    "civil-works": sample("gs-civil-base", 900, 700),
    manufacture: sample("gs-turf-factory", 900, 700),
    installation: sample("gs-installation", 900, 700),
    "fencing-lighting": sample("gs-floodlight", 900, 700),
    maintenance: sample("gs-maintenance-machine", 900, 700)
  },

  projects: {
    yupia: sample("gs-stadium-yupia", 1000, 750),
    rajsamand: sample("gs-hockey-field", 1000, 750),
    mangalam: sample("gs-school-courts", 1000, 750),
    georges: sample("gs-mussoorie", 1000, 750),
    amity: sample("gs-athletic-track", 1000, 750),
    conscient: sample("gs-padel-court", 1000, 750)
  },

  people: {
    gupta: sample("gs-person-1", 400, 400),
    bedi: sample("gs-person-2", 400, 400),
    vasu: sample("gs-person-3", 400, 400),
    varghese: sample("gs-person-4", 400, 400),
    kedia: sample("gs-person-5", 400, 400),
    dalal: sample("gs-person-6", 400, 400)
  },

  contact: {
    office: sample("gs-office-map", 1000, 700)
  },

  surfaces: {
    turf: sample("gs-surface-turf", 800, 600),
    track: sample("gs-surface-track", 800, 600),
    tiles: sample("gs-surface-tiles", 800, 600),
    vinyl: sample("gs-surface-vinyl", 800, 600)
  }
};

export default images;
