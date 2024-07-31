import { NextPage } from "next";
import Image from "next/image";
import TermsOfService from "@/docs/terms-of-service.mdx";
import { LegalDocument } from "@/components/LegalDocument";
import Link from "next/link";

const TOS: NextPage = () => {
  return (
    <div>
      <main className={"2xl:mx-0 mx-2 my-8"}>
        <div className="my-2 w-fit mx-auto justify-center flex flex-col items-center">
          <Image
            src={"/tht_logo.png"}
            width={280}
            height={300}
            alt="The HIT Times Logo"
          />
        </div>
        <LegalDocument title="Terms of Service">
          <TermsOfService />
        </LegalDocument>
      </main>
    </div>
  );
};

export default TOS;
