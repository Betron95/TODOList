import { createMuiTheme } from "@material-ui/core";

export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#DB7093',
    },
    secondary: {
      main: '#DB7093',
    },
  },
  overrides: {
    MuiTab: {
      root: {
        color: "palevioletred",
        "&$selected": {
          color: "palevioletred",
          "&:hover": {
            color: "palevioletred"
          }
        }
      },
      textColorPrimary: {
        color: 'gray',
        '&$selected': {
          color: 'palevioletred',
        }
      },
    }
  }
});