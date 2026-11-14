import type { ImageMetadata } from "astro";
import yabber from "../assets/products/yabber.png";
import mvpplease from "../assets/products/mvpplease.png";
import moodDude from "../assets/products/mood-dude.png";
import tinyLandlord from "../assets/products/tiny-landlord.png";
import bounceCourt from "../assets/products/bounce-court.png";
import cuteShooter from "../assets/products/cute-shooter.png";
import dancyFingers from "../assets/products/dancy-fingers.png";
import trappyFlump from "../assets/products/trappy-flump.png";

type Product = {
  name: string;
  icon: ImageMetadata;
  /**
   * A main project: large and sharp, in one of the places around the logo.
   * Every other product is small and blurred, further back.
   * Up to four can be main; they take the places in the order listed here:
   * top left, top right, bottom left, right.
   */
  main?: boolean;
  /** The shape it drifts as; see src/components/Cubes.astro. A cube if left out. */
  kind?: "cube" | "slab" | "chat" | "devices" | "dude";
  /** The colour behind an icon that has transparent parts (cubes only). */
  bg?: string;
};

// What drifts behind the logo. To make a project main, add `main: true`;
// to stop, remove it. Nothing else needs to change.
export const products: Product[] = [
  { name: "Yabber", icon: yabber, main: true, kind: "chat" },
  { name: "mvpplease", icon: mvpplease, main: true, kind: "devices" },
  { name: "Mood Dude", icon: moodDude, main: true, kind: "dude" },
  { name: "Tiny Landlord", icon: tinyLandlord },
  { name: "Bounce Court", icon: bounceCourt },
  { name: "Cute Shooter", icon: cuteShooter, bg: "#74b9f5" },
  { name: "Dancy Fingers", icon: dancyFingers },
  { name: "Trappy Flump", icon: trappyFlump, bg: "#4aa3f0" },
];
