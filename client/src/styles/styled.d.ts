import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    fontSize: string;
    colors: {
      main: string;
      secondary: string;
      error: string;
    };
  }
}
