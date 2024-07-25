import type { MDXComponents } from "mdx/types";
import WeeklyPortion from './components/WeeklyPortion/weeklyPortion'; // Adjusted path
import "./app/globals.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    WeeklyPortion,
  };
}
