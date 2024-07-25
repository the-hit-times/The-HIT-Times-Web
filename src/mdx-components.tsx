import type { MDXComponents } from "mdx/types";
import "./app/globals.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
