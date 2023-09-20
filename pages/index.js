import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section className="section-style">
      <div className="flex-col space-y-8 container-style md:px-12 md:py-20">
        <Image src={"/logo.png"} alt="Site Logo" width={146} height={146} />
        <h1 className="p-2 text-4xl font-bold text-center text-gray-700">
          Unified Carrier Registration (UCR)
        </h1>
        <div className="max-w-5xl p-2 space-y-4 text-center text-gray-700 text-md ">
          <p>
            All motor carriers, brokers, and leasing companies that haul across
            state lines or within a state that adheres to the UCR program, are
            required to register their US DOT Numbers with the Unified Carrier
            Registration.
          </p>

          <p>All UCR filings will be completed during normal business hours.</p>

          <p>
            Starting January 1, 2023, all relevant companies in the trucking
            industry, that lack Unified Carrier Registration compliance, may be
            subjected to citations, fines, and penalties imposed by individual
            states, the DOT and the board of the Unified Carrier Registration.
            You will also not be allowed to renew your trucks registrations as
            well as IFTA. In order to ensure complete compliance, the
            aforementioned freight hauling companies are advised to verify that
            the number of trucks requiring registration matches the amount
            listed on the MCS-150 / Biennial Update that was last filed (this
            number will affect filing fee and truck tier pricing). Please note,
            pricing is for the UCR filing fee, processing fee, filing fee and
            there may be additional fees for processing time as well as a
            certificate.
          </p>
          <p>
            For brokers, it is recommended to complete this registration under
            the 1-2 trucks section if business operations include interstate
            activity (if brokering any loads outside of the state the company is
            operating in).
          </p>
        </div>
        <Link href={"/register"}>
          <Button className="rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7">
            Proceed to Filling
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
