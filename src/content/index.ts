import type { ComponentType } from "react";
import * as atom from "./atom-dan-elektron";
import * as devais from "./devais-semikonduktor";
import * as cvd from "./cvd-dan-ald";
import * as doping from "./doping";
import * as ketebalan from "./ketebalan-dan-morfologi";
import * as proyek from "./proyek-akhir";
import * as struktur from "./struktur-listrik-optik";
import * as etching from "./etching";
import * as fotolitografi from "./fotolitografi";
import * as oksidasi from "./oksidasi-dan-doping";
import * as wafer from "./wafer-dan-cleanroom";
import * as larutan from "./metode-larutan";
import * as pvd from "./pvd";
import * as pengantarFilm from "./pengantar-thin-film";
import * as pertumbuhan from "./pertumbuhan-film";
import * as sambungan from "./sambungan-pn";
import * as vakum from "./teknologi-vakum";
import * as transport from "./transport-muatan";
import * as kristal from "./ikatan-dan-kristal";
import * as pembawa from "./pembawa-muatan";
import * as kuantum from "./kuantum-secukupnya";
import * as pita from "./pita-energi";

export type ChapterContent = {
  objectives: string[];
  Body: ComponentType;
};

/** Written chapters, keyed by slug. Chapters not listed here show a "being written" page. */
export const chapterContent: Record<string, ChapterContent | undefined> = {
  "atom-dan-elektron": atom,
  "ikatan-dan-kristal": kristal,
  "kuantum-secukupnya": kuantum,
  "pita-energi": pita,
  "pembawa-muatan": pembawa,
  doping,
  "transport-muatan": transport,
  "sambungan-pn": sambungan,
  "devais-semikonduktor": devais,
  "pengantar-thin-film": pengantarFilm,
  "teknologi-vakum": vakum,
  "pertumbuhan-film": pertumbuhan,
  pvd,
  "cvd-dan-ald": cvd,
  "metode-larutan": larutan,
  "wafer-dan-cleanroom": wafer,
  "oksidasi-dan-doping": oksidasi,
  fotolitografi,
  etching,
  "ketebalan-dan-morfologi": ketebalan,
  "struktur-listrik-optik": struktur,
  "proyek-akhir": proyek,
};
