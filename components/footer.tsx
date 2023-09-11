import Link from 'next/link';

const Footer = () => {
  return (
    <section className="section-style bg-[#004990]">
      <div className="container-style md:px-12 md:py-20 space-y-8">
        <div>
          <ul className="flex justify-evenly items-baseline flex-wrap md:space-x-6 space-y-6 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/refundpolicy">Refund Policy</Link>
            </li>
            <li>
              <Link href="/privacypolicy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/termsconditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="text-slate-400 text-sm space-y-4 p-2 text-center">
          <p>
            Information and images contained here are the property of Cohort,
            Inc. and, they may not be reproduced, reused, or appropriated in any
            way without the express written consent.
          </p>
          <p>
            This website is operated by Cohort, Inc. This is a commercial
            solicitation and advertisement. We are NOT affiliated with any
            government authority (USDOT/FMCSA).
          </p>
          <p>
            This website is not affiliated with the Unified Carrier Registration
            Plan. This website is operated by a private company that provides a
            private registration service for an additional fee. You are not
            required to use this site to register with the UCR Plan. You may
            register directly with the UCR Plan at www.ucr.gov.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
