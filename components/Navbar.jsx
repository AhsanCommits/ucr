import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';

const Navbar = () => {
  return (
    <section className="section-style">
      <div className="container-style md:px-16">
        <div className="w-1/2">
          <Link href="/">
            <Image
              src={'/navbar-brand.png'}
              alt="Navbar Brand"
              width={365}
              height={71}
            />
          </Link>
        </div>

        <div className="w-1/2">
          <ul className="flex justify-end space-x-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
