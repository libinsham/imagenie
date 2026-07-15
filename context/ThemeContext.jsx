/**
 * The real implementation lives in components/shared/ThemeProvider.jsx
 * (it needs to sit alongside the other page-chrome providers there).
 * This re-export exists purely so imports can consistently come from
 * context/ if that's the convention the rest of the app follows.
 */
export { ThemeProvider, useTheme } from "@/components/shared/ThemeProvider";
