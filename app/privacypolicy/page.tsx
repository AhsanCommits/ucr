'use client';

import { useEffect, useState } from 'react';

const PrivacyPolicyPage = () => {
  const [isMounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-8">
        <h1 className="text-4xl font-bold text-gray-700 p-2">Privacy Policy</h1>
        <ul className="space-y-4 p-2 text-left text-neutral-600 text-base font-light">
          <li>Effective Date: 8/4/2023</li>
          <li>
            This Privacy Policy outlines how Cohort, Inc. (we, us, or our)
            collects, uses, discloses, and safeguards the information obtained
            from users (you or user) of the website UCR.gg (Website). By
            accessing or using the Website, you agree to the practices described
            in this Privacy Policy.
          </li>
          <li>
            <strong>1. Information We Collect:</strong>
            <li>
              a. Personal Information: We may collect personal information such
              as your full name, email address, contact number, and other
              identifiable information you provide when using our contact forms.
            </li>
            <li>
              b. Public Motor Carrier Information: We may collect public motor
              carrier information that you voluntarily provide, including but
              not limited to USDOT numbers and other details associated with
              motor carrier registration.
            </li>
            <li>
              c. Signatures: If you provide signatures electronically on the
              Website, we may collect and store those signatures.
            </li>
          </li>
          <li>
            <strong>2. Use of Information:</strong>
            <li>
              a. We use the collected information to provide the services you
              request, such as processing contact inquiries and providing
              private registration services related to the Unified Carrier
              Registration Plan (UCR Plan).
            </li>
            <li>
              b. Personal information may also be used to communicate with you,
              respond to your inquiries, and send relevant information about our
              services.
            </li>
            <li>
              c. Public motor carrier information and signatures may be used to
              facilitate registration and compliance with the UCR Plan.
            </li>
          </li>

          <li>
            <strong>3. Disclosure of Information:</strong>
            <li>
              a. We do not sell, trade, or rent your personal information to
              third parties.
            </li>
            <li>
              b. We may share your information with trusted third-party service
              providers who assist us in operating the Website or providing
              services to you.
            </li>
            <li>
              c. We may disclose information if required by law, legal process,
              or government request.
            </li>
          </li>
          <li>
            <strong>4. Data Security:</strong>
            <li>
              a. We implement security measures to protect your information
              against unauthorized access, alteration, disclosure, or
              destruction.
            </li>
            <li>
              b. Despite our best efforts, no method of transmission over the
              internet or electronic storage is completely secure. We cannot
              guarantee absolute security of your data.
            </li>
          </li>
          <li>
            <strong>5. Cookies and Tracking:</strong>
            <li>
              We may use cookies and similar tracking technologies to enhance
              your experience on the Website. You can adjust your browser
              settings to refuse cookies or to alert you when cookies are being
              sent.
            </li>
          </li>
          <li>
            <strong>6. Third-Party Links:</strong>
            <li>
              The Website may contain links to third-party websites. This
              Privacy Policy applies solely to information collected on the
              UCR.gg Website. We are not responsible for the privacy practices
              or content of third-party websites.
            </li>
          </li>
          <li>
            <strong>7. Children Privacy:</strong>
            <li>
              The Website is not intended for children under the age of 18. We
              do not knowingly collect or maintain personal information from
              anyone under 18 years of age.
            </li>
          </li>
          <li>
            <strong>8. Changes to Privacy Policy:</strong>
            <li>
              We reserve the right to modify, amend, or update this Privacy
              Policy at any time. We will notify you of any significant changes
              via the Website or other appropriate means.
            </li>
          </li>
          <li>
            <strong>9. Changes to Refund Policy:</strong>
            <li>
              We reserve the right to modify, amend, or update this Refund
              Policy at any time. We will notify you of any significant changes
              via the Website or other appropriate means.
            </li>
          </li>
          <li>
            By using the UCR.gg Website, you acknowledge that you have read,
            understood, and agreed to this Privacy Policy. If you do not agree
            with any part of this Privacy Policy, please do not use the Website.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
