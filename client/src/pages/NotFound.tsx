import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/components/site";

export default function NotFound() {
  const { s } = useLanguage();
  usePageTitle("notFound");

  return (
    <section className="container flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-serif text-7xl font-semibold text-highlight">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">{s.notFound.title}</h1>
      <p className="mt-3 max-w-md text-lg text-muted-foreground">{s.notFound.body}</p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full")}>
        <ArrowLeft className="rtl:rotate-180" /> {s.notFound.home}
      </Link>
    </section>
  );
}
