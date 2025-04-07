import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Use | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description:
    `Review the Terms of Use for ${process.env.NEXT_PUBLIC_APP_NAME} to understand the rules and guidelines for using our services.`,
  openGraph: {
    title: `Terms of Use | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description:
      `Review the Terms of Use for ${process.env.NEXT_PUBLIC_APP_NAME} to understand the rules and guidelines for using our services.`,
    url: `${process.env.BASE_URL}/terms-of-use`,
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    type: "website",
  },
  robots: {index: false, follow: false}
};

export default function TermsOfUse() {
  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Terms of Use – {`${process.env.NEXT_PUBLIC_APP_NAME}`}
      </h1>
      <p className="text-muted-foreground mb-8">Last Updated: 31, Jan 2025</p>
      <p className="mb-4">
        By using our website, you agree to these Terms of Use. Please read them
        carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
      <p>
        By accessing and using {`${process.env.NEXT_PUBLIC_APP_NAME}`}, you agree to be bound by these
        terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Use of Content</h2>
      <p>
        All content on our site is for informational purposes only. You may not
        reproduce, distribute, or modify our content without permission.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. User Responsibilities</h2>
      <p>
        Users must not engage in harmful activities such as hacking, spamming,
        or violating others&apos; rights.
      </p>

      <h2 className="text-xl font-semibold mt-6">
        4. Affiliate Links Disclosure
      </h2>
      <p>
        We may include affiliate links to third-party websites on our site. Any
        content containing affiliate links will be clearly identified. In
        compliance with the{" "}
        <strong>Federal Trade Commission&apos;s 16 CFR, Part 255</strong>:{" "}
        <em>
          Guides Concerning the Use of Endorsements and Testimonials in
          Advertising
        </em>
        , we disclose that <strong>{`${process.env.NEXT_PUBLIC_APP_NAME}`}</strong> may earn a commission
        from qualifying purchases made through these links.
      </p>

      <p className="mt-4">
        Please note that participation in certain promotions or programs may be
        subject to geographical restrictions or specific eligibility criteria
        set by third-party providers. We encourage users to review the terms and
        conditions of each program for full details.
      </p>

      <p className="mt-4">
        {`${process.env.NEXT_PUBLIC_APP_NAME}`} is not responsible for any limitations, service
        restrictions, or actions taken by third-party websites. Any
        transactions, disputes, or issues related to these affiliate programs
        should be addressed directly with the respective third-party provider.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law,{" "}
        <strong>{`${process.env.NEXT_PUBLIC_APP_NAME}`}</strong> and its affiliates are not responsible for
        any indirect, incidental, consequential, special, or punitive damages,
        including but not limited to, loss of profits, data, or business
        opportunities, arising from your use of or inability to use the site.
      </p>

      <p className="mt-4">
        You acknowledge and agree that any damages you may incur as a result of{" "}
        <strong>{`${process.env.NEXT_PUBLIC_APP_NAME}`}’</strong> actions, omissions, or your use of the
        site do not qualify for injunctive or equitable relief that would
        restrict the availability or accessibility of the site to others.
      </p>

      <p className="mt-4">
        These limitations apply regardless of whether the alleged liability is
        based on contract, tort, negligence, strict liability, or any other
        legal theory, even if <strong>{`${process.env.NEXT_PUBLIC_APP_NAME}`}</strong> has been informed of
        the possibility of such damages.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Changes to Terms</h2>
      <p>
        We may update these terms at any time. Continued use of the site
        signifies acceptance of the new terms.
      </p>

      <h2 className="text-xl font-semibold mt-6">7. Contact Us</h2>
      <p>
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:contact@theretools.com"
          className="text-blue-600 hover:underline"
        >
          contact@theretools.com
        </a>
        .
      </p>
    </div>
  );
}
