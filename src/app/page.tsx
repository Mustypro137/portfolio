import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { WhyMe } from "@/components/WhyMe";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Nav name={site.name} />
      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero {...site} />
        <About about={site.about} photo={site.photo} />
        <Experience experience={site.experience} education={site.education} />
        <Skills skills={site.skills} />
        <WhyMe traits={site.traits} />
        <Projects projects={site.projects} githubProfile={site.contact.github} />
        <Contact contact={site.contact} />
      </main>
      <Footer name={site.name} contact={site.contact} />
    </>
  );
}
