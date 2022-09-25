import { style } from "@vanilla-extract/css";
import { constants, vars } from "../vars.css";

export const empty = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  fontSize: "1.5rem",
  alignItems: "center",
  justifyContent: "center",
  color: vars.colors.text.dimmed,
  background: vars.colors.section,
});

export const button = style({
  "@media": {
    [`screen and (max-width: ${constants.mobileWidth})`]: {
      width: "100%",
      display: "block",
    },
  },
});
