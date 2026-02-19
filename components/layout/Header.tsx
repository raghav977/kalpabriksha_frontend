"use client"
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/logo.jpg"
import Image from "next/image";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";

// Static navigation links
const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Research", href: "/research" },
    {name:"Blog",href:"/blog"},
    { name: "Careers", href: "/careers" },
    { name: "Connect", href: "/contact" },
    { name: "Global Vision", href: "/vision" }
];

export const Header: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src={logo} 
                            alt="ConsultKES Logo" 
                            width={180} 
                            height={50} 
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((nav) => (
                            <Link
                                key={nav.name}
                                href={nav.href}
                                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                            >
                                {nav.name}
                            </Link>
                        ))}
                        <Link href="/contact">
                            <Button>Contact Us</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={toggleMenu} 
                        className="lg:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg animate-in slide-in-from-top-2">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        {navLinks.map((nav) => (
                            <Link
                                key={nav.name}
                                href={nav.href}
                                onClick={() => setIsOpen(false)}
                                className="text-base font-medium py-2 border-b border-border/50 transition-colors hover:text-primary"
                            >
                                {nav.name}
                            </Link>
                        ))}
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="pt-2">
                            <Button className="w-full">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )

}