This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run web version

## Architecture Overview

This is a React Native Expo app called "GameThink" using a stack + bottom tab navigation structure.

### Navigation Structure

- **Stack Navigator** (root): Handles authentication flow
  - SignIn/SignUp screens (onboarding)
  - Main tab navigator (authenticated state)
- **Bottom Tab Navigator**: Main app navigation with 4 tabs
  - Home, Catalog, Feed, Account screens

### Key Technologies

- **Expo** (~53.0.0) - Development platform
- **React Navigation** v7 - Navigation (stack + bottom tabs)
- **NativeWind** - Tailwind CSS for React Native styling
- **Formik + Yup** - Form handling and validation
- **AsyncStorage** - Local data persistence
- **Lottie** - Animations

### Project Structure

- `ViewsScreens/` - All screen components
  - `onboardingScreens/` - SignIn/SignUp
  - `mainScreens/` - Home, Feed, Catalog, Account
- `components/` - Reusable UI components
- `styles/` - Global styles and theme
- `data/` - Static JSON data (posts, users)
- `assets/` - Images, icons, animations

### Styling Approach

- Mix of StyleSheet and NativeWind (Tailwind CSS)
- Global styles in `styles/globalStyles.js`
- Custom color scheme: purple header (#330169), yellow tabs (#FCDF03)
- Material Icons for tab bar icons

### Data Management

- Static JSON files for mock data
- AsyncStorage for local persistence
- No external API integration currently
