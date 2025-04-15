import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center items-center p-4 bg-gray-100 border-b border-gray-300">
      <Image
        src="/logo.png" // Replace with your logo path
        alt="Logo"
        width={48} // Set the width of the logo
        height={48} // Set the height of the logo
        className="h-12" // Optional Tailwind class for additional styling
      />
    </header>
  );
};

export default Header;
// This component is a simple header that displays a logo.
