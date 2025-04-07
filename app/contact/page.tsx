import { Metadata } from "next";
import { Mail } from "lucide-react";
import { AppIcon } from "@/common/components";

export const metadata: Metadata = {
  title: `Contact ${process.env.NEXT_PUBLIC_APP_NAME} | Get in Touch for Inquiries & Support`,
  description:
    `Reach out to ${process.env.NEXT_PUBLIC_APP_NAME} for inquiries, partnerships, media requests, and technical support. Contact us today.`,
  openGraph: {
    title: `Contact ${process.env.NEXT_PUBLIC_APP_NAME} | Get in Touch for Inquiries & Support`,
    description:
      `Reach out to ${process.env.NEXT_PUBLIC_APP_NAME} for inquiries, partnerships, media requests, and technical support. Contact us today.`,
    url: `${process.env.BASE_URL}/contact`,
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    type: "website",
  },
  alternates: {
    canonical: `${process.env.BASE_URL}`,
    languages: {
      'en-us': `${process.env.BASE_URL}/contact`,
      'en-ca': `${process.env.BASE_URL}/contact`,
      'en': `${process.env.BASE_URL}/contact`,
      'x-default': `${process.env.BASE_URL}/contact`,
    }
  },
  robots: {index: false, follow: false}
};

export default async function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-6">
        Get in Touch with {`${process.env.NEXT_PUBLIC_APP_NAME}`} for Inquiries & Support
      </h1>
      <div className="shadow-lg rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">General Inquiries</h2>
          <p className="text-muted-foreground">
            For questions, suggestions, or feedback related to our content.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Advertising & Partnerships</h2>
          <p className="text-muted-foreground">
            Interested in working with us? Contact us for advertising,
            sponsorships, and brand partnerships.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Press & Media</h2>
          <p className="text-muted-foreground">
            For media inquiries, interviews, or press-related requests.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Technical Issues</h2>
          <p className="text-muted-foreground">
            If you experience any technical issues with our site, let us know so
            we can assist you.
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <div className="flex items-center space-x-3 mt-2">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <a
              href="mailto:contact@theretools.com"
              className="text-blue-600 hover:underline"
            >
              contact@theretools.com
            </a>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold">Follow Us</h2>
          <div className="flex mt-2 gap-4">
            <a href="https://www.pinterest.com/theretools/" target="_blank" className="flex items-center text-muted-foreground hover:text-red-500 icon-color">
             <AppIcon name={'pinterest-p'} size="20" /> <span className="ml-2">ecolivingtools</span> 
            </a>
            <a href="https://www.instagram.com/there.tools" target="_blank" className="flex items-center text-muted-foreground hover:text-pink-500 icon-color">
             <AppIcon name={'instagram'} size="20" /> <span className="ml-2">ecolivingtools</span> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
