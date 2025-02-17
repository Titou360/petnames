import Link from 'next/link';
import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { GiOctopus } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PetNames</h3>
            <p className="text-sm text-gray-600">
              Trouvez un nom pour votre animal de compagnie. La plus grande base de données de noms d&apos;animaux au monde.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-gray-600 hover:text-primary">Chien</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-600 hover:text-primary">Chat</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary">N.A.C</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary"></Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary">Mentions légales</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-600 hover:text-primary">Politiques de Cookies (EU)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Suivez-nous !</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary"><SiFacebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><SiInstagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><SiLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PetNames Tous droits réservés.
          </p>
          <div className='flex flex-row gap-1 items-center justify-center'>
            <p className="text-sm text-gray-600">PetNames a été imaginé et développé par</p>
            <Link href="https://nemosolutions.fr" className="text-sm text-gray-600 hover:text-primary">Nemo Solutions</Link> <GiOctopus size={15} />
        </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
