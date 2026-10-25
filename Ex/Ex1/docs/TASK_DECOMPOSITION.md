# Ex1 - Semantic Engineer & Pro-Gamer Profile Card - WBS

## 1. Functional Slicing
- Slice A: SkillBadge Component (Reusable)
- Slice B: DeveloperCard Component (Self-contained article, zero div-soup)
- Slice C: CSS Modules (375px responsive, zero inline styles)

## 2. Contract-First Specification
- **Zero Div-Soup:** Tuyệt đối không có `<div>` trong `DeveloperCard.jsx`. Chỉ dùng `<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`, `<Fragment>`.
- **Data:** fullName, role, avatarUrl (HTTPS), metrics (object), skills (array).
- **Image:** Bắt buộc có `width="64" height="64"` và `alt`.
- **Keys:** Fragment trong map metrics phải có key `<Fragment key={k}>`.

## 3. Atomic Generation Plan (2 Commits bắt buộc)
| Commit | Message |
|---|---|
| 1 | `feat(ex1): implement semantic DeveloperCard and SkillBadge` |
| 2 | `style(ex1): add responsive 375px CSS module` |

## 4. Independent Verification Plan
- Chạy script: `grep -n '<div' src/components/DeveloperCard.jsx` (Kết quả: 0 matches).
- Chạy script: `grep -n 'http://' src/components/DeveloperCard.jsx` (Kết quả: 0 matches).
- DevTools: Check Accessibility Tree (article -> header -> dl -> list).