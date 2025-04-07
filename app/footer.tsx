import Link from "next/link";
import { SocialLinks } from "@/common/components";
import "@/common/styles/footer.css";
import "@/common/styles/social-links.css";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-primary border-t mt-6">
      <div className="footer">
        <div className="bg-background app-footer">
          <div className="app-footer-copy">
            <div className="app-footer-copyright text-white">
              ©2025 {process.env.NEXT_PUBLIC_APP_NAME}
            </div>
          </div>
          <SocialLinks />
        </div>

        {/* Add the policy links */}
        <div className="flex flex-row gap-2 justify-center mt-4 mb-4 text-sm">
          <Link href="/blog" className="hover:text-secondary transition-colors text-white">
            Blog
          </Link>
          <span className="mx-1">|</span>
          <Link
            href="/privacy-policy"
            className="hover:text-secondary transition-colors text-white"
          >
            Privacy
          </Link>
          <span className="mx-1">|</span>
          <Link
            href="/terms-of-use"
            className="hover:text-secondary transition-colors text-white"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
