import { notFound } from "next/navigation";
// Temporary: static placeholder while the hero video is being produced.
// To restore the 100-frame scroll animation, swap back to HeroBackdrop below.
import HeroBackdrop from "@/components/HeroPlaceholder";
// import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollStory from "@/components/ScrollStory";
import { isLocale, type Locale } from "@/config/i18n";
import { getDictionary } from "./dictionaries";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroBackdrop />
      <ScrollStory dict={dict} />
    </>
  );
}
