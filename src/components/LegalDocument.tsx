import { IBM_Plex_Serif, Nunito_Sans, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
});

type LegalDocumentProps = {
  title: string;
  children: React.ReactNode;
};

export const LegalDocument: React.FC<LegalDocumentProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <div
        className={
          ibmPlexSerif.className + " text-2xl font-bold text-center"
        }
      >
        {title}
      </div>
      <div className="prose  prose-h1:mt-0 mx-auto mt-8">{children}</div>
    </>
  );
};
