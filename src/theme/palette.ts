import { PaletteMode } from '@mui/material';
import '@mui/material/styles';

export const palette = {
  mode: 'light' as PaletteMode | undefined,
  primary: {
    main: '#5DCB42',
    light: '#D4F8CB',
  },
  error: {
    main: '#F33A3D',
  },
  secondary: {
    main: '#C4C4C4',
  },
  case: {
    contrast: {
      black: '#000000',
      gray1: '#FAFAFA',
      gray2: '#F3F3F3',
      gray3: '#F2EDED',
      gray4: '#C4C4C4',
      gray5: '#898989',
      gray6: '#4D4D4D',
      gray7: '#FDFDFD',
      white: '#FFFFFF',
    },
    warning: {
      light: '#FEE6E7',
      middle: '#FF9FA3',
      high: '#F33A3D',
    },
    main: {
      green: {
        middle: '#2EA710',
      },
      yellow: {
        light: '#FFF3DC',
        middle: '#F8B42B',
        high: '#F7A90D',
      },
      orange: {
        light: '#FFE7D6',
        middle: '#F98D50',
        high: '#F7610D',
      },
      purple: {
        light: '#FFEDFF',
        middle: '#D454D1',
        high: '#C562C3',
      },
      gey: { light: '#D0F5FD', middle: '#42DAFC', high: '#2BD3F8' },
      blue: { light: '#CAD3E6', middle: '#6E82AB', high: '#3B5998' },
    },
    neutral: {
      n900: '#1F243B',
      n800: '#2B324F',
      n700: '#444C6D',
      n600: '#5A6384',
      n500: '#787F9D',
      n400: '#A3AAC2',
      n300: '#BFC4DA',
      n200: '#D9DDEC',
      n100: '#EFF1FB',
      n75: '#F6F8FD',
      n50: '#FCFCFD',
      n0: '#FFFFFF',
    },
    blue: {
      b900: '#1F3A8B',
      b800: '#1F41AF',
      b700: '#1D4ED7',
      b600: '#2563EC',
      b500: '#3B82F6',
      b400: '#61A5FA',
      b300: '#93C4FC',
      b200: '#BFDCFE',
      b100: '#DBEAFF',
      b50: '#EFF6FF',
    },
    red: {
      r900: '#7F1D1E',
      r800: '#991B1C',
      r700: '#BA1C1D',
      r600: '#DC2625',
      r500: '#F04444',
      r400: '#F87070',
      r300: '#FDA5A4',
      r200: '#FECBCA',
      r100: '#FEE2E1',
      r50: '#FEF2F2',
    },
    yellow: {
      y900: '#723F12',
      y800: '#854E0E',
      y700: '#A26208',
      y600: '#CA8A04',
      y500: '#E9B308',
      y400: '#FACC16',
      y300: '#FDE047',
      y200: '#FEF18B',
      y100: '#FEF9C2',
      y50: '#FEFBE8',
    },
    orange: {
      o900: '#7D2D12',
      o800: '#9B3413',
      o700: '#C3410D',
      o600: '#EA580B',
      o500: '#FA7317',
      o400: '#FC923C',
      o300: '#FDBA74',
      o200: '#FED8AB',
      o100: '#FFEDD5',
      o50: '#FFF6ED',
    },
    magenta: {
      m900: '#831844',
      m800: '#9D174C',
      m700: '#BE195E',
      m600: '#DC2778',
      m500: '#EB4899',
      m400: '#F572B6',
      m300: '#F9A8D3',
      m200: '#FBCFE8',
      m100: '#FDE7F4',
      m50: '#FDF2F8',
    },
    purple: {
      p900: '#701A75',
      p800: '#861990',
      p700: '#A21CAF',
      p600: '#C026D4',
      p500: '#D946EF',
      p400: '#E879F9',
      p300: '#F0ABFC',
      p200: '#F5CFFE',
      p100: '#FAE8FE',
      p50: '#FCF0FE',
    },
    cyan: {
      c900: '#164F63',
      c800: '#165E76',
      c700: '#0F7490',
      c600: '#0891B3',
      c500: '#07B6D5',
      c400: '#21D3ED',
      c300: '#66E8F8',
      c200: '#A5F3FD',
      c100: '#CFFBFE',
      c50: '#ECFEFF',
    },
    aquamarine: {
      a900: '#064D3B',
      a800: '#075F47',
      a700: '#057857',
      a600: '#05976A',
      a500: '#10B982',
      a400: '#34D399',
      a300: '#6DE7B6',
      a200: '#A7F3CF',
      a100: '#D0FAE4',
      a50: '#ECFDF5',
    },
    primary: {
      p900: '#29751A',
      p800: '#2F861D',
      p700: '#359721',
      p600: '#3AA625',
      p500: '#59B446',
      p400: '#78C269',
      p300: '#95CF8A',
      p200: '#B7DEAE',
      p100: '#D4EBCF',
      p50: '#EFF8EE',
    },

    shadow: {
      big: '0px 10px 30px rgba(0, 0, 0, 0.04)',
      small: '0px 0px 7px rgba(0, 0, 0, 0.1)',
      medium: '0px 2px 4px rgba(38, 44, 74, 0.16)',
      extraSmall: '0px 0px 3px #F2EDED',
      huge: '10px 3px 24px 10px #F0F0F0',
      hugeHover: '10px 3px 24px 10px #EDEDED',
      social: '0px 4px 10px rgba(0, 0, 0, 0.08)',
      default: '0px 4px 8px rgba(38, 44, 74, 0.08)',
      socialHover: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      container: '0px 4px 16px rgba(38, 44, 74, 0.08)',
    },
    backdrop: {
      dark: 'rgba(0, 0, 0, 0.4)',
      light: 'rgba(255, 255, 255, 0.6)',
    },
    background: '#FFFFFF',
  },
};

declare module '@mui/material/styles' {
  interface Palette {
    case: {
      main: {
        green: {
          middle: string;
        };
        yellow: {
          light: string;
          middle: string;
          high: string;
        };
        orange: {
          light: string;
          middle: string;
          high: string;
        };
        purple: {
          light: string;
          middle: string;
          high: string;
        };
        gey: { light: string; middle: string; high: string };
        blue: {
          light: string;
          middle: string;
          high: string;
        };
      };

      contrast: {
        black: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        white: string;
      };
      cyan: {
        c900: string;
        c800: string;
        c700: string;
        c600: string;
        c500: string;
        c400: string;
        c300: string;
        c200: string;
        c100: string;
        c50: string;
      };
      yellow: {
        y900: string;
        y800: string;
        y700: string;
        y600: string;
        y500: string;
        y400: string;
        y300: string;
        y200: string;
        y100: string;
        y50: string;
      };
      orange: {
        o900: string;
        o800: string;
        o700: string;
        o600: string;
        o500: string;
        o400: string;
        o300: string;
        o200: string;
        o100: string;
        o50: string;
      };
      aquamarine: {
        a900: string;
        a800: string;
        a700: string;
        a600: string;
        a500: string;
        a400: string;
        a300: string;
        a200: string;
        a100: string;
        a50: string;
      };
      neutral: {
        n900: string;
        n800: string;
        n700: string;
        n600: string;
        n500: string;
        n400: string;
        n300: string;
        n200: string;
        n100: string;
        n75: string;
        n50: string;
        n0: string;
      };

      red: {
        r900: string;
        r800: string;
        r700: string;
        r600: string;
        r500: string;
        r400: string;
        r300: string;
        r200: string;
        r100: string;
        r50: string;
      };
      magenta: {
        m900: string;
        m800: string;
        m700: string;
        m600: string;
        m500: string;
        m400: string;
        m300: string;
        m200: string;
        m100: string;
        m50: string;
      };
      purple: {
        p900: string;
        p800: string;
        p700: string;
        p600: string;
        p500: string;
        p400: string;
        p300: string;
        p200: string;
        p100: string;
        p50: string;
      };
      primary: {
        p900: string;
        p800: string;
        p700: string;
        p600: string;
        p500: string;
        p400: string;
        p300: string;
        p200: string;
        p100: string;
        p50: string;
      };

      blue: {
        b900: string;
        b800: string;
        b700: string;
        b600: string;
        b500: string;
        b400: string;
        b300: string;
        b200: string;
        b100: string;
        b50: string;
      };
      warning: {
        light: string;
        middle: string;
        high: string;
      };
      shadow: {
        big: string;
        small: string;
        extraSmall: string;
        huge: string;
        medium: string;
        hugeHover: string;
        social: string;
        socialHover: string;
        default: string;
        container: string;
      };
      backdrop: {
        dark: string;
        light: string;
      };
      background: string;
    };
  }

  interface PaletteOptions {
    case?: {
      main: {
        green: {
          middle: string;
        };
        yellow: {
          light: string;
          middle: string;
          high: string;
        };
        orange: {
          light: string;
          middle: string;
          high: string;
        };
        purple: {
          light: string;
          middle: string;
          high: string;
        };
        gey: { light: string; middle: string; high: string };
        blue: {
          light: string;
          middle: string;
          high: string;
        };
      };
      contrast: {
        black: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        white: string;
      };
      cyan: {
        c900: string;
        c800: string;
        c700: string;
        c600: string;
        c500: string;
        c400: string;
        c300: string;
        c200: string;
        c100: string;
        c50: string;
      };
      yellow: {
        y900: string;
        y800: string;
        y700: string;
        y600: string;
        y500: string;
        y400: string;
        y300: string;
        y200: string;
        y100: string;
        y50: string;
      };
      orange: {
        o900: string;
        o800: string;
        o700: string;
        o600: string;
        o500: string;
        o400: string;
        o300: string;
        o200: string;
        o100: string;
        o50: string;
      };
      aquamarine: {
        a900: string;
        a800: string;
        a700: string;
        a600: string;
        a500: string;
        a400: string;
        a300: string;
        a200: string;
        a100: string;
        a50: string;
      };
      purple: {
        p900: string;
        p800: string;
        p700: string;
        p600: string;
        p500: string;
        p400: string;
        p300: string;
        p200: string;
        p100: string;
        p50: string;
      };
      magenta: {
        m900: string;
        m800: string;
        m700: string;
        m600: string;
        m500: string;
        m400: string;
        m300: string;
        m200: string;
        m100: string;
        m50: string;
      };
      blue: {
        b900: string;
        b800: string;
        b700: string;
        b600: string;
        b500: string;
        b400: string;
        b300: string;
        b200: string;
        b100: string;
        b50: string;
      };
      neutral: {
        n900: string;
        n800: string;
        n700: string;
        n600: string;
        n500: string;
        n400: string;
        n300: string;
        n200: string;
        n100: string;
        n75: string;
        n50: string;
        n0: string;
      };
      red: {
        r900: string;
        r800: string;
        r700: string;
        r600: string;
        r500: string;
        r400: string;
        r300: string;
        r200: string;
        r100: string;
        r50: string;
      };
      primary: {
        p900: string;
        p800: string;
        p700: string;
        p600: string;
        p500: string;
        p400: string;
        p300: string;
        p200: string;
        p100: string;
        p50: string;
      };

      warning: {
        light: string;
        middle: string;
        high: string;
      };
      shadow: {
        big: string;
        small: string;
        extraSmall: string;
        medium: string;
        huge: string;
        hugeHover: string;
        social: string;
        socialHover: string;
        default: string;
        container: string;
      };
      backdrop: {
        dark: string;
        light: string;
      };
      background: string;
    };
  }
}
