import ContactSection from "@/components/sections/contact";

/** Contact page — the same form as the homepage (opens a pre-filled Gmail compose window). */
export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--aw-bg)] pt-20 text-[var(--aw-text)]">
      <ContactSection />
    </main>
  );
}
