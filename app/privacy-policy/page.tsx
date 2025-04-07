import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${process.env.NEXT_PUBLIC_APP_NAME} `,
  description:
    `Read our Privacy Policy to learn how ${process.env.NEXT_PUBLIC_APP_NAME} collects, uses, and protects your personal data.`,
  openGraph: {
    title: `Privacy Policy | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description:
      `Read our Privacy Policy to learn how ${process.env.NEXT_PUBLIC_APP_NAME} collects, uses, and protects your personal data.`,
    url: `${process.env.BASE_URL}/privacy-policy`,
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    type: "website",
  },
  robots: {index: false, follow: false}
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Privacy Policy – {`${process.env.NEXT_PUBLIC_APP_NAME}`}
      </h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy outlines how There
        Tools collects, uses, and protects your information.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        and usage data when you visit our site.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. How We Use Your Data</h2>
      <p>
        Your information helps us improve our content, provide customer support,
        and enhance user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Third-Party Services</h2>
      <p>
        We may use third-party services like analytics and advertising
        providers, which may collect and process your data.
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Security: How We Protect Your Data</h2>
      <p>
        We take data security seriously and implement strong protective measures to ensure the confidentiality and integrity of your information. Our security practices include:
      </p>
      <ul className="list-disc list-inside">
        <li><strong>SSL Encryption</strong>: All data transmitted through our site is encrypted using <strong>Secure Socket Layer (SSL)</strong> technology.</li>
        <li><strong>Restricted Access</strong>: Only authorized personnel have access to sensitive user data.</li>
        <li><strong>Regular Security Audits</strong>: We conduct periodic security reviews to identify and address vulnerabilities.</li>
        <li><strong>Firewall and Intrusion Detection</strong>: Our systems are protected against unauthorized access with firewalls and monitoring tools.</li>
        <li><strong>Data Minimization</strong>: We only collect and store necessary user information to enhance security.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">5. Changes to This Policy</h2>
      <p>
        We may update this policy periodically. Any changes will be posted on
        this page.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Contact Us</h2>
      <p>
        If you have any questions about this policy, please contact us at{" "}
        <a
          href="mailto:contact@theretools.com"
          className="text-blue-500 hover:underline"
        >
          contact@theretools.com
        </a>
        .
      </p>
    </div>
  );
}
