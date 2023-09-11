'use client';

import { useEffect, useState } from 'react';

const TermsPage = () => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-8">
        <h1 className="text-4xl font-bold text-gray-700 p-2 text-center">
          Terms & Conditions
        </h1>
        <ul className="space-y-4 p-2 text-left text-neutral-600 text-base font-light">
          <li>Effective Date: 8/4/2023</li>
          <li>
            These Terms and Conditions (Terms) govern your use of the website
            UCR.gg (Website), which is owned and operated by Cohort, Inc. (we,
            us, or our). By accessing or using the Website, you (you or user)
            agree to be bound by these Terms. If you do not agree to these
            Terms, please refrain from using the Website.
          </li>
          <li>
            <strong>1. Commercial Solicitation and Advertisement:</strong>
            <li>
              UCR.gg is a commercial solicitation and advertisement platform. We
              are an independent entity and are NOT affiliated with any
              government authority, including but not limited to the United
              States Department of Transportation (USDOT) or the Federal Motor
              Carrier Safety Administration (FMCSA).
            </li>
          </li>

          <li>
            <strong>2. Private Registration Service:</strong>
            <li>
              UCR.gg is operated by Cohort, Inc. as a private company providing
              a private registration service related to the Unified Carrier
              Registration Plan (UCR Plan). This service is offered for an
              additional fee, and it is important to note that using this
              website is optional. You are not obligated to utilize this site to
              register with the UCR Plan. Alternatively, you may directly
              register with the UCR Plan through the official government website
              at www.ucr.gov.
            </li>
          </li>
          <li>
            <strong>3. No Affiliation with UCR Plan:</strong>
            <li>
              UCR.gg is not affiliated with the Unified Carrier Registration
              Plan, and the services provided on this website are independent of
              any government entity. We do not represent or claim to represent
              the UCR Plan, and any information provided on this Website is for
              informational purposes only.
            </li>
          </li>
          <li>
            <strong>4. Use of the Website:</strong>
            <li>
              a. You must be at least 18 years of age to use this Website.
            </li>
            <li>
              b. You agree not to use the Website for any unlawful or
              unauthorized purpose and to comply with all applicable laws and
              regulations.
            </li>
            <li>
              c. You acknowledge that your use of any information or services
              obtained through this Website is at your own risk.
            </li>
          </li>
          <li>
            <strong>5. Intellectual Property:</strong>
            <li>
              The content, graphics, design, and other materials on this Website
              are protected by intellectual property laws and are the exclusive
              property of Cohort, Inc. You are granted a limited,
              non-transferable, non-exclusive license to access and use the
              Website for personal, non-commercial purposes.
            </li>
          </li>
          <li>
            <strong>6. Privacy Policy:</strong>
            <li>
              Your use of the Website is also governed by our Privacy Policy. By
              using the Website, you consent to the practices described in the
              Privacy Policy.
            </li>
          </li>
          <li>
            <strong>7. Disclaimers:</strong>
            <li>
              a. We make no warranties or representations regarding the
              accuracy, completeness, or reliability of the information provided
              on the Website.
            </li>
            <li>
              b. The use of this Website does not create any attorney-client or
              agency relationship between you and Cohort, Inc.
            </li>
            <li>
              c. We disclaim any liability for damages arising from your use or
              inability to use the Website.
            </li>
          </li>
          <li>
            <strong>8. Limitation of Liability:</strong>
            <li>
              To the fullest extent permitted by applicable law, Cohort, Inc.
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses, resulting from
              (a) your access to or use of or inability to access or use the
              Website; (b) any conduct or content of any third party on the
              Website; or (c) unauthorized access, use, or alteration of your
              transmissions or content.
            </li>
          </li>
          <li>
            <strong>9. Changes to the Terms:</strong>
            <li>
              We reserve the right to modify, amend, or update these Terms at
              any time. It is your responsibility to review these Terms
              periodically for any changes. Your continued use of the Website
              following the posting of changes constitutes your acceptance of
              those changes.
            </li>
          </li>
          <li>
            <strong>10. Governing Law and Dispute Resolution:</strong>
            <li>
              These Terms shall be governed by and construed in accordance with
              the laws of California, without regard to its conflict of law
              principles. Any disputes arising out of or in connection with
              these Terms shall be subject to the exclusive jurisdiction of the
              courts of California.
            </li>
          </li>
          <li>
            By using the UCR.gg Website, you acknowledge that you have read,
            understood, and agreed to these Terms and Conditions. If you do not
            agree with any part of these Terms, please do not use the Website.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TermsPage;
