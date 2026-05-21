RULES FOR VEGVISION PROJECT

1. Stack
- Next.js App Router
- TypeScript
- SCSS Modules only

2. Architecture
- Follow FSD (Feature-Sliced Design)
- Use layers correctly:
  - app
  - pages
  - widgets
  - features
  - entities
  - shared
- Do not break FSD boundaries
- Shared components go into shared/ui
- Business entities go into entities
- Reusable logic goes into shared/lib
- Features must contain isolated business logic
- Widgets combine multiple features/entities
- Keep imports only downward by FSD rules

3. Styling
- Never use Tailwind
- Never use inline styles
- Never use styled-components
- Use SCSS modules only

4. Colors
- Always use CSS variables from global.css
- Never hardcode colors if variables already exist
- Main palette:
  --dark-green
  --element
  --background
  --background-section
  --check-green

5. Design
- Modern SaaS style
- Clean UI
- Soft shadows
- Large border radius
- Spacious layouts
- Responsive design required

6. Responsive
- Desktop-first
- Tablet support
- Mobile support
- Sidebar becomes bottom navigation on mobile

7. Code style
- Clean semantic HTML
- Use TypeScript types
- Avoid duplicated code
- Use reusable components
- Keep logic separated

8. Components
- Use Next/Image
- Use lucide-react icons
- Use CSS transitions
- Avoid unnecessary libraries

9. UX
- Smooth hover animations
- Proper spacing
- Consistent typography
- Clear visual hierarchy

10. Performance
- Optimize rendering
- Avoid unnecessary re-renders
- Use server components when possible

11. Folder structure example

src/
- app
- pages
- widgets
- features
- entities
- shared

shared/
- ui
- lib
- assets
- styles
- hooks

features/
- auth
- upload-plant
- analytics

entities/
- user
- plant
- analysis

widgets/
- sidebar
- dashboard
- header

12. Naming
- Components: PascalCase
- Hooks: useCamelCase
- Files: kebab-case or PascalCase consistently
- SCSS modules: ComponentName.module.scss

13. Project philosophy
- Minimalistic architecture
- Reusable UI
- Scalable structure
- Clean code first
- Maintainability over speed

14. UI Libraries
- Do NOT use UI libraries
- Forbidden:
  - Material UI
  - Chakra UI
  - Ant Design
  - Mantine
  - shadcn/ui
  - NextUI
  - Radix UI
  - Bootstrap
  - Tailwind UI
  - DaisyUI
- All UI components must be custom built
- Use only:
  - React
  - Next.js
  - SCSS Modules
- All layouts, buttons, cards, modals and inputs must be written manually
- Do not use prebuilt component systems

15. Icons & Assets
- If custom icons or illustrations are needed:
  - First check if suitable icons already exist in the project
  - If icons are missing:
    - either ask the user to provide SVG/icons/assets
    - or create simple custom SVG icons manually
- Allowed:
  - lucide-react
  - custom SVG icons
- Do not use external icon packs except lucide-react
- Do not use paid assets
- Icons must visually match the VegVision style:
  - minimalistic
  - clean
  - slightly rounded
  - modern SaaS aesthetic