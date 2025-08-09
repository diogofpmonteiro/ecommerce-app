import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
}
