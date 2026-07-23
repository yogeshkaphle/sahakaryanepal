import type { ImageMetadata } from 'astro';

// Field photos wired into the site. Every caption is the organization's OWN
// printed caption from the annual reports (translated), per
// docs/photo-provenance-map.md — no captions are invented here. Provenance
// tail = project · funder · report year, following the site's what·where·
// project·year discipline. Source: Report A (FY 2076/77).
//
// Project match is by evidence (banner text + donor + municipality), not the
// page block the photo printed under:
//   - "Hariharpurgadhi pickle enterprise" names Hariharpurgadhi — SSEJV is the
//     only FCA project in Hariharpurgadhi RM.
//   - the 708x502 banner reads "Economic & Social Development" + FCA logo.
//   - the 693x460 banner reads "Local Project Advisory Committee (LPAC)" + FCA.
//   - SSEJV summary: "Agriculture extension, food security, livelihood and
//     cooperative strengthening in Hariharpurgadhi & Marin RM, FCA + Finland."
// The other FCA livelihood project (SCRTSL) is ruled out: different
// municipalities (Pipalmadi/Mahendrajhyadi/Kalpabrikshya), pre-COVID 2017–19.

import mushroom from '../assets/photos/ar-2076_p17_660x440.png';
import pickle from '../assets/photos/ar-2076_p17_660x439.png';
import coopTraining from '../assets/photos/ar-2076_p17_693x482.png';
import coopPolicy from '../assets/photos/ar-2076_p17_708x502.png';
import lpac from '../assets/photos/ar-2076_p18_693x460.png';
import covidRelief from '../assets/photos/ar-2076_p18_699x466.png';

export interface FieldPhoto {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

const PROV = 'SSEJV · FCA · FY 2076/77';

const ssejvPhotos: FieldPhoto[] = [
  {
    src: mushroom,
    alt: 'Mushroom-growing enterprise site with stacked grow-bags, Sindhuli, 2019–20.',
    caption: `Mushroom enterprise · ${PROV}`,
  },
  {
    src: pickle,
    alt: 'Jars of pickle at a Hariharpurgadhi pickle enterprise, Sindhuli, 2019–20.',
    caption: `Hariharpurgadhi pickle enterprise · ${PROV}`,
  },
  {
    src: coopTraining,
    alt: 'Cooperative members at an indoor capacity-development training session, Sindhuli, 2019–20.',
    caption: `Cooperative group capacity development training · ${PROV}`,
  },
  {
    src: coopPolicy,
    alt: 'Participants holding a banner at a cooperative policy and plan formulation program, Sindhuli, 2019–20.',
    caption: `Cooperative policy & plan formulation program · ${PROV}`,
  },
  {
    src: lpac,
    alt: 'Local project advisory committee meeting around a table, Sindhuli, 2019–20.',
    caption: `Local project advisory committee meeting · ${PROV}`,
  },
  {
    src: covidRelief,
    alt: 'Food relief packages laid out for distribution to COVID-affected households, Sindhuli, 2020.',
    caption: `Food distribution to COVID-affected households · ${PROV}`,
  },
];

// Per-project galleries, keyed by project slug (collection id).
export const projectPhotos: Record<string, FieldPhoto[]> = {
  'ssejv-ethnic-minority-justice': ssejvPhotos,
};

// Home proof strip — activity/enterprise shots only (no named-portrait
// close-ups): mushroom enterprise, pickle enterprise, cooperative meeting.
export const homeProofStrip: FieldPhoto[] = [ssejvPhotos[0], ssejvPhotos[1], ssejvPhotos[4]];
