import LandingPageNavbar from "../components/LandingPage/LandingPageNavbar";
import Footer from "../components/LandingPage/Footer";

const TermsAndConditions = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bodyBg text-text">
      <LandingPageNavbar />
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-main">
          SkillSync Terms and Conditions
        </h1>
        <p className="text-sm text-textWeak mb-8">
          Effective Date: July 16, 2025
          <br />
          Platform:{" "}
          <a
            href="https://skillsync-alu.web.app"
            className="underline text-main hover:text-main/80"
          >
            https://skillsync-alu.web.app
          </a>
        </p>

        <Section title="Acceptance of Terms">
          Welcome to SkillSync, a platform to connect learners and tutors for
          skill-based learning opportunities. You agree to comply with these
          Terms and Conditions by accessing or using the platform. If you do not
          agree, please refrain from using the service.
        </Section>

        <Section title="User Eligibility">
          To use SkillSync, users must be at least 18 or have verifiable
          parental/guardian consent. Users must also provide accurate and
          truthful information during registration and keep their account
          details current.
        </Section>

        <Section title="Account Registration">
          Registering on SkillSync requires providing a valid email address and
          a secure password. Users are responsible for maintaining the
          confidentiality of their credentials and all activities under their
          account.
        </Section>

        <Section title="User Conduct">
          <ul className="list-disc pl-6 mb-2">
            <li>
              Use the platform solely for its intended purpose of connecting
              students and tutors.
            </li>
            <li>
              Avoid engaging in any illegal activity, harassment, or abusive
              behavior.
            </li>
            <li>
              Respect the intellectual property rights of other users and the
              platform itself.
            </li>
          </ul>
          Violation of these conditions may lead to account suspension or
          permanent removal.
        </Section>

        <Section title="Intellectual Property">
          All platform content—including design, source code, documentation, and
          branding—remains the intellectual property of SkillSync. Users may not
          copy, modify, or redistribute platform content without explicit
          permission.
        </Section>

        <Section title="Limitation of Liability">
          SkillSync is provided "as is" with no warranties of any kind. The
          platform and its operators are not liable for any indirect,
          incidental, or consequential damages arising from the use or inability
          to use the service.
        </Section>

        <Section title="Payments">
          SkillSync does not currently support or process payments through the
          platform. Any user transactions (e.g., between tutors and learners)
          are handled externally and at their discretion. The platform bears no
          responsibility for payment disputes.
        </Section>

        <Section title="Termination">
          SkillSync reserves the right to suspend or terminate user accounts
          that violate these Terms and Conditions. Users may also choose to
          deactivate their account at any time.
        </Section>
      </div>
      <Footer />
    </div>
  );
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2 text-main">{title}</h2>
      <div className="text-base leading-relaxed text-text">{children}</div>
    </section>
  );
}

export default TermsAndConditions;
