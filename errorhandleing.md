

|   Here*'s a suggested slide‐deck outline along with key talking points and code snippets. You can adapt it to your favorite presentation tool.* React Error Boundaries in Next.js Client Components & Next.js Server‑Side Error Handling  Heath Shults / 4/11/2025 / TechConnect TeamAgenda  • Quick recap: What is an Error Boundary?  • Implementing Error Boundaries in Next.js Client Components  • Next.js Server‑Side Error Handling (App Router)  • Code examples & folder structure  • Best practices & monitoring  • Q\&AError Boundaries 101  • React concept introduced in v16  • Catch render‑time errors in child tree  • Prevents whole app crash; shows fallback UI  • Cannot catch: event handlers, async code, server errorsWhy Use Error Boundaries in Next.js Client Components? • Isolate UI failures (e.g. broken 3rd‑party widgets)• Render fallback-level UX instead of blank screen• Graceful recovery or retry optionsCreating a Client‑Side Error BoundaryIn Next.js, mark as "use client"Extend React.Component with componentDidCatchProvide state to switch to fallback UIExample: components/ErrorBoundary.tsx example\`\`\`tsx"use client"; import { Component, ReactNode } from "react";interface Props { children: ReactNode; fallback?: ReactNode; } interface State { hasError: boolean; }export class ErrorBoundary extends Component\<Props, State\> {    state \= { hasError: false };    static getDerivedStateFromError() {      return { hasError: true }; } componentDidCatch(error: Error, info: any) { console.error("Caught by ErrorBoundary:", error, info); // send to monitoring (Sentry, LogRocket...) } render() { if (this.state.hasError) { return this.props.fallback ||Something went wrong.; } return this.props.children; } } \`\`\`Slide 6: Wrapping Your Components• In your "use client" page or component tree:\`\`\`tsx"use client"; import { ErrorBoundary } from "@/components/ErrorBoundary"; import MyWidget from "./MyWidget";export default function Page() { return ( Widget failed, please refresh.\</div\>}\> ); } \`\`\`• You can nest multiple boundaries for critical subtrees.Slide 7: Fallback UIs & Retry Patterns• Simple message \+ "Retry" button that resets state• Provide error details in dev only• Style fallback to match your brandExample: reset on clicktsx \<button onClick={() \=\> this.setState({ hasError: false })}\> Retry \</button\>Slide 8: Next.js Server‑Side Error Handling (App Router)• In Next.js 13\+ App Router you can define:\- error.js (or error.tsx) in route folder\- Catch rendering errors in server components• Works like a top‑level Error Boundary on serverFolder structure:app/ dashboard/ page.tsx error.tsx ← catches errors in dashboard subtree error.tsx ← global default layout.tsxSlide 9: Building error.tsx for Server Components\`\`\`tsx// app/dashboard/error.tsx"use client"; // required if you want interactivityimport Link from "next/link";export default function DashboardError({ error, reset }: { error: Error; reset: () \=\> void; }) { console.error(error); return (Oops, dashboard failed to load.{error.message}reset()}\>Try again); }  \`\`\`Slide 10: How Server‑Side Error Boundaries Work• If a server component throws, Next.js will render the closest error.tsx• reset() clears the segment*'s cache to attempt re‑render*• Great for data fetching failures, thrown in async codeSlide 11: 404 & Special Codes• For not found you can export notFound() from page or layout• Next.js will render special "not-found" UI if error.tsx not present• Catch\-all fallback:\- export function generateStaticParams() with fallback: "blocking"Slide 12: Example: Data Fetch Error // app/users/page.tsx  export default async function UsersPage() {    const res \= await fetch("https://api.example.com/users");    if (\!res.ok) throw new Error("Users fetch failed");    const users \= await res.json();     return (       \<ul\>{ users.map(u \=\> \<li key={u.id}\> {u.name} \</li\> )}   \</ul\> );  } |
| :---- |

Slide 13: When an Error Occurs

UsersPage throws  
Next.js finds app/users/error.tsx; renders DashboardError  
reset() invalidates cache and retries on button click  
Slide 14: Monitoring & Logging  
• Always log errors server‑side (console, Sentry, Datadog...)  
• Client‑side: send componentDidCatch info to your service  
• Tag route or component name for faster triage

Slide 15: Best Practices  
• Use multiple small error boundaries on client for isolation  
• Provide meaningful fallback UX & retry paths  
• Keep error.tsx simple and informative  
• Differentiate 404 vs 500 error UIs  
• Don*'t swallow errors silently--log & alert*

Slide 16: Recap & Next Steps  
• Client: React ErrorBoundary in "use client" components  
• Server: error.tsx in App Router for thrown server errors  
• Combine both for full‑stack resilience  
• Integrate monitoring & custom UIs

Slide 17: Q\&A  
• Questions?  
• Live code demo?  
• References & links

\-- End of Deck \--  
