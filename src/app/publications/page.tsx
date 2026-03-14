import { getAllPublications } from "@/lib/mdx";
import SectionHeading from "@/components/ui/SectionHeading";
import PublicationFilter from "@/components/publications/PublicationFilter";

export const metadata = { title: "Publications" };

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <section className="section-container py-20">
      <SectionHeading
        title="Publications"
        subtitle="Research papers in autonomous driving, SLAM, and robotics"
      />
      <PublicationFilter publications={publications} />
    </section>
  );
}
