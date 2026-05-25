# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm start          # Expo dev server
pnpm ios            # iOS simulator
pnpm android        # Android emulator
pnpm web            # Web version
pnpm lint           # ESLint
pnpm format         # Prettier
pnpm test           # All Jest tests
pnpm test <name>    # Run specific test file or pattern
```

## Tech Stack

- **Framework**: Expo v54 with Expo Router v6 (file-based routing)
- **UI**: Tamagui 2.0.0-rc (design system — mandatory, see constraints below)
- **Backend**: Convex (real-time DB + server functions)
- **Device identity**: UUID v4 generated in pure JS, persisted in `expo-secure-store` (see `hooks/useDeviceId.ts`). Data is scoped per device — there is no user authentication.
- **Platform targets**: iOS and Android are first-class. `pnpm web` exists for quick previews only — production web is **not** a target, so APIs that no-op or throw on web (e.g. `expo-secure-store`) are acceptable. Don't pick a stack purely to keep web working unless asked.
- **Language**: TypeScript strict mode, no `any`
- **Animations**: `react-native-reanimated` v4 only

## Architecture

### Provider stack (`app/_layout.tsx`)

```
ConvexProvider
  └── TamaguiProvider
        └── Slot
```

### Routing groups

- `app/(tabs)/` — main app with bottom tabs

### Convex data layer

Schema lives in `convex/schema.ts`. Query/mutation functions in `convex/transactions.ts` (and any future modules). The `convex/_generated/` directory is auto-generated — never edit it directly. Import the API via `convex/index.ts` which re-exports the generated API.

In components, use `useQuery(api.transactions.get, {...})` and `useMutation(api.transactions.add)` from `convex/react`. Convex handles loading states and real-time sync automatically.

#### Convex skills (read the matching file before writing Convex code)

| Scenario                                               | Skill file                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Schema changes, field type changes, backfills          | [`.agents/skills/convex-migration-helper/SKILL.md`](.agents/skills/convex-migration-helper/SKILL.md)   |
| Slow queries, OCC conflicts, high reads                | [`.agents/skills/convex-performance-audit/SKILL.md`](.agents/skills/convex-performance-audit/SKILL.md) |
| Reusable backend component with isolated tables        | [`.agents/skills/convex-create-component/SKILL.md`](.agents/skills/convex-create-component/SKILL.md)   |
| Unsure which skill applies                             | [`.agents/skills/convex/SKILL.md`](.agents/skills/convex/SKILL.md)                                     |

### Tamagui styling

Use Tamagui primitives (`YStack`, `XStack`, `Text`, `Button`, etc.) and design tokens (`$4` for spacing, `gap="$4"`). Never use `StyleSheet.create()` or inline styles. Create reusable components with Tamagui's `styled()` function.

#### Tamagui references (read before styling or theming work)

| Scenario                                                   | Reference file                                                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Creating styled components, variants, extending components | [`.agents/skills/tamagui/references/components.md`](.agents/skills/tamagui/references/components.md)       |
| Design tokens, themes, customizing colors/spacing/sizes    | [`.agents/skills/tamagui/references/configuration.md`](.agents/skills/tamagui/references/configuration.md) |
| Animations with Tamagui and Reanimated                     | [`.agents/skills/tamagui/references/animations.md`](.agents/skills/tamagui/references/animations.md)       |
| General Tamagui patterns & guidance                        | [`.agents/skills/tamagui/SKILL.md`](.agents/skills/tamagui/SKILL.md)                                       |

## React Native best practices

Follow all rules in [`.agents/skills/vercel-react-native-skills/AGENTS.md`](.agents/skills/vercel-react-native-skills/AGENTS.md) when writing or reviewing React Native/Expo code. The rules cover list performance, animations, navigation, state management, UI patterns, and more — each with incorrect/correct code examples.

Key rules that interact with this project's constraints:

- Use `expo-image` (not React Native's `<Image>`) for all images
- Never track scroll position in `useState` — use Reanimated shared values
- Use `FlashList` or `LegendList` for any list (not `FlatList`/`ScrollView`)
- Use `Pressable` over `TouchableOpacity`
- Animate only `transform` and `opacity`, never layout properties

## Expo skills (read the matching file before working on Expo-specific tasks)

| Scenario                                     | Skill file                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Upgrading Expo SDK or dependencies           | [`.agents/skills/upgrading-expo/SKILL.md`](.agents/skills/upgrading-expo/SKILL.md)           |
| Deploying to iOS/Android App Stores or web   | [`.agents/skills/expo-deployment/SKILL.md`](.agents/skills/expo-deployment/SKILL.md)         |
| CI/CD workflows, EAS Build, GitHub Actions   | [`.agents/skills/expo-cicd-workflows/SKILL.md`](.agents/skills/expo-cicd-workflows/SKILL.md) |
| Building/distributing dev client for testing | [`.agents/skills/expo-dev-client/SKILL.md`](.agents/skills/expo-dev-client/SKILL.md)         |
| Creating native modules (Swift/Kotlin)       | [`.agents/skills/expo-module/SKILL.md`](.agents/skills/expo-module/SKILL.md)                 |
| API routes with Expo Router                  | [`.agents/skills/expo-api-routes/SKILL.md`](.agents/skills/expo-api-routes/SKILL.md)         |
| Integrating into existing native app         | [`.agents/skills/expo-brownfield/SKILL.md`](.agents/skills/expo-brownfield/SKILL.md)         |
| Setting up Tailwind CSS (if needed)          | [`.agents/skills/expo-tailwind-setup/SKILL.md`](.agents/skills/expo-tailwind-setup/SKILL.md) |

## EAS Update monitoring

When monitoring OTA (over-the-air) updates published via EAS, read the matching reference:

| Scenario                                                             | Reference file                                                                                                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Check specific update health: crashes, launches, users, payload size | [`.agents/skills/eas-update-insights/references/update-insights-schema.md`](.agents/skills/eas-update-insights/references/update-insights-schema.md)   |
| Check channel-level metrics: embedded vs OTA users, popular updates  | [`.agents/skills/eas-update-insights/references/channel-insights-schema.md`](.agents/skills/eas-update-insights/references/channel-insights-schema.md) |
| General EAS Update Insights guidance & CLI commands                  | [`.agents/skills/eas-update-insights/SKILL.md`](.agents/skills/eas-update-insights/SKILL.md)                                                           |

## Hard constraints (from `.cursorrules`)

- **No `StyleSheet.create()`** or inline React Native styles — Tamagui only
- **No manual navigation config** — Expo Router file-based routing exclusively
- **No direct DB calls** — all backend logic in `convex/` functions, consumed via hooks
- **No `Animated` API** — use `react-native-reanimated` v4
- **No `// eslint-disable`** without an explicit reason comment
- **No `any` types**

## Installing dependencies

- Use `npx expo install <pkg>` (not `pnpm add`) for any `expo-*` package or library with a native side. It pins the version matched to the current Expo SDK; `pnpm add` will happily install an SDK-incompatible major (e.g. SDK 56 lib on SDK 54).
- Plain JS/TS libs without native code can use `pnpm add` normally.

## Native modules require a dev client rebuild

Any package that ships a native module (most `expo-*` packages: `expo-crypto`, `expo-secure-store`, `expo-haptics`, `expo-image`, etc.) **cannot be added on the fly** — the running dev client must be rebuilt to embed the native binary, otherwise the JS import throws `Cannot find native module '<ModuleName>'` at runtime.

Before adding such a package, surface the trade-off:

1. Confirm a dev client rebuild is acceptable (`npx expo prebuild` + reinstall on the simulator/device), or
2. Pick a pure-JS alternative that achieves the same goal.

The current `useDeviceId` uses a pure-JS UUID v4 generator precisely to avoid the rebuild step — keep that approach unless a native dep is strictly required.

## Environment variables (`.env.local`)

```
CONVEX_DEPLOYMENT=dev:tidy-puma-951
EXPO_PUBLIC_CONVEX_URL=https://tidy-puma-951.convex.cloud
```

## Testing

Jest with `jest-expo` preset and `@testing-library/react-native`. The `jest.setup.ts` imports `tamagui.config.ts` to prevent module errors. Test files are co-located with source components.

## CI

GitHub Actions runs `pnpm lint` and `pnpm test` on every PR — both must pass before merge.
