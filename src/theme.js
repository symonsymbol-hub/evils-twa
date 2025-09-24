import { createTheme } from "@mui/material/styles";

// Новая, более глубокая цветовая палитра
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0033', // Более яркий и чистый красный
    },
    background: {
      default: '#0A0A0A',
      paper: 'rgba(18, 18, 18, 0.7)', // Слегка осветляем для контраста
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#A3A3A3',
    },
    //...остальные цвета
  },
  typography: {
    fontFamily: '"Roboto Mono", "monospace"',
    allVariants: {
      letterSpacing: '0.05em',
    },
    h1: { fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.02em' },
    h2: { fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.02em' },
    h3: { fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.02em' },
    h4: { fontFamily: '"Orbitron", sans-serif', letterSpacing: '0.02em' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255, 0, 51, 0.15)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          backgroundImage: 'none',
          transition: 'all 0.4s ease',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          backgroundColor: '#f40a0a',
          color: '#fff',
          boxShadow: '0 0 20px rgba(244, 10, 10, 0.5)',
          '&:hover': {
            backgroundColor: '#ff4d4d',
            boxShadow: '0 0 30px rgba(255, 77, 77, 0.7)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: 'rgba(244, 10, 10, 0.5)',
          color: '#f40a0a',
          '&:hover': {
            borderColor: '#f40a0a',
            backgroundColor: 'rgba(244, 10, 10, 0.1)',
            boxShadow: '0 0 15px rgba(244, 10, 10, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.5)',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(244, 10, 10, 0.3)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: '1px solid rgba(244, 10, 10, 0.3)',
          background: 'rgba(10, 10, 10, 0.5)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#8e8e8e',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: '#e0e0e0',
          },
          '&.Mui-selected': {
            color: '#f40a0a',
            textShadow: '0 0 10px rgba(244, 10, 10, 0.7)',
          },
        },
      },
    },
    // Кастомные стили для полей ввода
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#f40a0a', // Цвет лейбла при фокусе
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#f40a0a', // Цвет рамки при фокусе
              boxShadow: '0 0 10px rgba(244, 10, 10, 0.5)', // Свечение рамки
            },
          },
        },
      },
    },
    // Кастомные стили для шагов в анкете
    MuiStepper: {
        styleOverrides: {
            root: {
                '.MuiStepIcon-root': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-active': {
                        color: '#f40a0a',
                        textShadow: '0 0 10px #f40a0a',
                    },
                    '&.Mui-completed': {
                        color: '#f40a0a',
                    },
                },
            }
        }
    }
  },
});
