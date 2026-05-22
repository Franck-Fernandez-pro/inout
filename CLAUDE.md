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
- **Auth**: Clerk (`@clerk/clerk-expo`) with `expo-secure-store` for token caching
- **Language**: TypeScript strict mode, no `any`
- **Animations**: `react-native-reanimated` v4 only

## Architecture

### Provider stack (`app/_layout.tsx`)

```
ClerkProvider
  └── ConvexProviderWithClerk   ← Clerk JWT injected into all Convex calls
        └── TamaguiProvider
              └── AuthGuard     ← Redirects based on isSignedIn
```

### Routing groups

- `app/(auth)/` — unauthenticated screens (login)
- `app/(tabs)/` — protected screens (main app with bottom tabs)

`AuthGuard` watches `isSignedIn` from Clerk and redirects between groups automatically.

### Convex data layer

Schema lives in `convex/schema.ts`. Query/mutation functions in `convex/transactions.ts` (and any future modules). The `convex/_generated/` directory is auto-generated — never edit it directly. Import the API via `convex/index.ts` which re-exports the generated API.

In components, use `useQuery(api.transactions.get, {...})` and `useMutation(api.transactions.add)` from `convex/react`. Convex handles loading states and real-time sync automatically.

#### Convex skills (read the matching file before writing Convex code)

| Scenario | Skill file |
|---|---|
| Schema changes, field type changes, backfills | [`.agents/skills/convex-migration-helper/SKILL.md`](.agents/skills/convex-migration-helper/SKILL.md) |
| Slow queries, OCC conflicts, high reads | [`.agents/skills/convex-performance-audit/SKILL.md`](.agents/skills/convex-performance-audit/SKILL.md) |
| Reusable backend component with isolated tables | [`.agents/skills/convex-create-component/SKILL.md`](.agents/skills/convex-create-component/SKILL.md) |
| Auth setup or changes (Clerk JWT, protected functions) | [`.agents/skills/convex-setup-auth/SKILL.md`](.agents/skills/convex-setup-auth/SKILL.md) |
| Unsure which skill applies | [`.agents/skills/convex/SKILL.md`](.agents/skills/convex/SKILL.md) |

### Tamagui styling

Use Tamagui primitives (`YStack`, `XStack`, `Text`, `Button`, etc.) and design tokens (`$4` for spacing, `gap="$4"`). Never use `StyleSheet.create()` or inline styles. Create reusable components with Tamagui's `styled()` function.

#### Tamagui references (read before styling or theming work)

| Scenario | Reference file |
|---|---|
| Creating styled components, variants, extending components | [`.agents/skills/tamagui/references/components.md`](.agents/skills/tamagui/references/components.md) |
| Design tokens, themes, customizing colors/spacing/sizes | [`.agents/skills/tamagui/references/configuration.md`](.agents/skills/tamagui/references/configuration.md) |
| Animations with Tamagui and Reanimated | [`.agents/skills/tamagui/references/animations.md`](.agents/skills/tamagui/references/animations.md) |
| General Tamagui patterns & guidance | [`.agents/skills/tamagui/SKILL.md`](.agents/skills/tamagui/SKILL.md) |

## React Native best practices

Follow all rules in [`.agents/skills/vercel-react-native-skills/AGENTS.md`](.agents/skills/vercel-react-native-skills/AGENTS.md) when writing or reviewing React Native/Expo code. The rules cover list performance, animations, navigation, state management, UI patterns, and more — each with incorrect/correct code examples.

Key rules that interact with this project's constraints:
- Use `expo-image` (not React Native's `<Image>`) for all images
- Never track scroll position in `useState` — use Reanimated shared values
- Use `FlashList` or `LegendList` for any list (not `FlatList`/`ScrollView`)
- Use `Pressable` over `TouchableOpacity`
- Animate only `transform` and `opacity`, never layout properties

## Expo skills (read the matching file before working on Expo-specific tasks)

| Scenario | Skill file |
|---|---|
| Upgrading Expo SDK or dependencies | [`.agents/skills/upgrading-expo/SKILL.md`](.agents/skills/upgrading-expo/SKILL.md) |
| Deploying to iOS/Android App Stores or web | [`.agents/skills/expo-deployment/SKILL.md`](.agents/skills/expo-deployment/SKILL.md) |
| CI/CD workflows, EAS Build, GitHub Actions | [`.agents/skills/expo-cicd-workflows/SKILL.md`](.agents/skills/expo-cicd-workflows/SKILL.md) |
| Building/distributing dev client for testing | [`.agents/skills/expo-dev-client/SKILL.md`](.agents/skills/expo-dev-client/SKILL.md) |
| Creating native modules (Swift/Kotlin) | [`.agents/skills/expo-module/SKILL.md`](.agents/skills/expo-module/SKILL.md) |
| API routes with Expo Router | [`.agents/skills/expo-api-routes/SKILL.md`](.agents/skills/expo-api-routes/SKILL.md) |
| Integrating into existing native app | [`.agents/skills/expo-brownfield/SKILL.md`](.agents/skills/expo-brownfield/SKILL.md) |
| Setting up Tailwind CSS (if needed) | [`.agents/skills/expo-tailwind-setup/SKILL.md`](.agents/skills/expo-tailwind-setup/SKILL.md) |

## Hard constraints (from `.cursorrules`)

- **No `StyleSheet.create()`** or inline React Native styles — Tamagui only
- **No manual navigation config** — Expo Router file-based routing exclusively
- **No direct DB calls** — all backend logic in `convex/` functions, consumed via hooks
- **No `Animated` API** — use `react-native-reanimated` v4
- **No `// eslint-disable`** without an explicit reason comment
- **No `any` types**

## Environment variables (`.env.local`)

```
CONVEX_DEPLOYMENT=dev:tidy-puma-951
EXPO_PUBLIC_CONVEX_URL=https://tidy-puma-951.convex.cloud
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://actual-whale-48.clerk.accounts.dev
```

## Testing

Jest with `jest-expo` preset and `@testing-library/react-native`. The `jest.setup.ts` imports `tamagui.config.ts` to prevent module errors. Test files are co-located with source components.

## CI

GitHub Actions runs `pnpm lint` and `pnpm test` on every PR — both must pass before merge.
