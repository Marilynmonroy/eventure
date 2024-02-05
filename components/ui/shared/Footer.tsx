import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          {" "}
          <h1 className="text-2xl font-extrabold color text-primary-500 ">
            Eventure
          </h1>
        </Link>
        <p className="text-sm text-gray-500"> Eventure, CRIE_TI 2023 </p>
      </div>
    </footer>
  );
};

export default Footer;
