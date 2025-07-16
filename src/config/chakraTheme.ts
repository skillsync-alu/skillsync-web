import { extendTheme } from "@chakra-ui/react";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark", // Default to dark mode
  useSystemColorMode: true, // Respect system preference
};

export const chakraTheme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "var(--body_bg)",
        color: "var(--text_color)",
      },
    },
  },
  semanticTokens: {
    colors: {
      brand: {
        default: "var(--main_color)",
        _dark: "var(--main_color)",
      },
      cardBg: {
        default: "var(--card_bg)",
        _dark: "var(--card_bg)",
      },
      cardBgWeak: {
        default: "var(--card_bg_weak)",
        _dark: "var(--card_bg_weak)",
      },
      text: {
        default: "var(--text_color)",
        _dark: "var(--text_color)",
      },
      textWeak: {
        default: "var(--text_color_weak)",
        _dark: "var(--text_color_weak)",
      },
      lines: {
        default: "var(--lines_color)",
        _dark: "var(--lines_color)",
      },
      red: {
        default: "var(--red)",
        _dark: "var(--red)",
      },
      redWeak: {
        default: "var(--red_weak)",
        _dark: "var(--red_weak)",
      },
      green: {
        default: "var(--green)",
        _dark: "var(--green)",
      },
      greenWeak: {
        default: "var(--green_weak)",
        _dark: "var(--green_weak)",
      },
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
});
