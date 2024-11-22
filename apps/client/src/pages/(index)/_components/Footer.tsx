import { Divider, Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="bg-content2 px-6 py-20 md:px-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-6">
            <h4 className="text-2xl font-bold">About</h4>
            <p className="max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              suscipit quo voluptatibus ratione inventore laborum aliquid
              excepturi ipsam a fugit incidunt, obcaecati nam vel, sit, esse
              corrupti illo quaerat delectus.
            </p>
            <br />
            <ul className="grid gap-1">
              <li>
                <strong>Email: </strong>
                info@aydinthefirst.com
              </li>
              <li>
                <strong>Phone: </strong>
                +123 456 7890
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h4 className="text-2xl font-bold">Quick Link</h4>
            <br />
            <ul className="grid gap-3">
              <li>
                <Link color="foreground" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link color="foreground" href="/posts">
                  Posts
                </Link>
              </li>
              <li>
                <Link color="foreground" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h4 className="text-2xl font-bold">Legal</h4>
            <br />
            <ul className="grid gap-3">
              <li>
                <Link color="foreground" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link color="foreground" href="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Divider className="my-10" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} AydinTheFirst. All rights
              reserved.
            </p>
          </div>
          <div className="flex justify-end">
            <ul className="flex gap-5">
              <li>
                <Link color="foreground" href="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Divider orientation="vertical" />
              </li>
              <li>
                <Link color="foreground" href="/terms">
                  Terms
                </Link>
              </li>
              <li>
                <Divider orientation="vertical" />
              </li>
              <li>
                <Link color="foreground" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
