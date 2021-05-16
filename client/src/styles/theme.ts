// Theme which can be extended for all style constants like typography/spacing/color pallette etc
import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  borderRadius: "8px",

  fontSize: "1rem",
  colors: {
    main: "#000",
    secondary: "#808080",
    error: "#f44336",
  },
};

export default theme;
