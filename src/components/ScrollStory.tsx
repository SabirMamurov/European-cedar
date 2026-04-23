import IntroPanel from "./panels/IntroPanel";
import JourneyPanel from "./panels/JourneyPanel";
import PackagingPanel from "./panels/PackagingPanel";
import AboutPanel from "./panels/AboutPanel";
import CertificatesPanel from "./panels/CertificatesPanel";
import ContactPanel from "./panels/ContactPanel";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function ScrollStory({ dict }: { dict: Dictionary }) {
  return (
    <div className="relative z-10">
      <IntroPanel dict={dict} />
      <JourneyPanel dict={dict} />
      <PackagingPanel dict={dict} />
      <AboutPanel dict={dict} />
      <CertificatesPanel dict={dict} />
      <ContactPanel dict={dict} />
    </div>
  );
}
