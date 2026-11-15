"use client";

import dynamic from "next/dynamic";

function Loading({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`grid w-full place-items-center rounded-2xl bg-[#0b1020] text-sm text-white/60 ${
        tall ? "h-full" : "my-8 aspect-square sm:aspect-[16/10]"
      }`}
    >
      Memuat tampilan 3D…
    </div>
  );
}

export const AtomExplorer = dynamic(() => import("./AtomExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const CrystalExplorer = dynamic(() => import("./CrystalExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const OrbitalExplorer = dynamic(() => import("./OrbitalExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const BandFormation = dynamic(() => import("./BandFormation"), {
  ssr: false,
  loading: () => <Loading />,
});

export const CarrierExplorer = dynamic(() => import("./CarrierExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const JunctionExplorer = dynamic(() => import("./JunctionExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const MosfetExplorer = dynamic(() => import("./MosfetExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const VacuumExplorer = dynamic(() => import("./VacuumExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const GrowthExplorer = dynamic(() => import("./GrowthExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const PvdExplorer = dynamic(() => import("./PvdExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const CvdExplorer = dynamic(() => import("./CvdExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const SpinCoater = dynamic(() => import("./SpinCoater"), {
  ssr: false,
  loading: () => <Loading />,
});

export const CzochralskiExplorer = dynamic(() => import("./CzochralskiExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const ImplantExplorer = dynamic(() => import("./ImplantExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const LithoExplorer = dynamic(() => import("./LithoExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const RieExplorer = dynamic(() => import("./RieExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const AfmExplorer = dynamic(() => import("./AfmExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const XrdExplorer = dynamic(() => import("./XrdExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const ProcessFlowExplorer = dynamic(() => import("./ProcessFlowExplorer"), {
  ssr: false,
  loading: () => <Loading />,
});

export const HeroLattice = dynamic(() => import("./HeroLattice"), {
  ssr: false,
  loading: () => <Loading tall />,
});
