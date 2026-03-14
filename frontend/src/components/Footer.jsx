import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e14] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Logo */}
        <div>
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-bold text-white rounded p-2 bg-gradient-to-r from-pink-500 to-gray-800">
          Eventify
        </h1>

          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white  text-xl font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-md">
            <li>All</li>
            <li>Music</li>
            <li>Sport</li>
            <li>Exibition</li>
            <li>Business</li>
            <li>Photography</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white  text-xl font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-md">
            <li>User guides</li>
            <li>Help Center</li>
            <li>Partners</li>
            <li>Taxes</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white  text-xl font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-md">
            <li>About</li>
            <li>Join us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-xl font-bold mb-4">Stay in the loop</h4>
          <p className="text-md text-gray-400 mb-10">
            For product announcements and exclusive insights
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Input your email"
              className="px-2 py-3 text-white text-sm border border-gray-500 rounded-l-md outline-none w-50 md-10 text-black"
            />
            <button className="bg-pink-500 text-white px-4 py-2 text-md rounded-r-md hover:bg-pink-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        {/* Language Selector */}
        <select className="bg-[#0e0e14] border border-gray-700 rounded-md px-3 py-2 text-gray-300 mb-3 md:mb-0">
          <option>English</option>
          <option>Hindi</option>
        </select>

        {/* Copyright */}
        <p>© 2022 Brand, Inc. • Privacy • Terms • Sitemap</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <Twitter className="w-4 h-4 cursor-pointer hover:text-pink-500" />
          <Facebook className="w-4 h-4 cursor-pointer hover:text-pink-500" />
          <Linkedin className="w-4 h-4 cursor-pointer hover:text-pink-500" />
          <Youtube className="w-4 h-4 cursor-pointer hover:text-pink-500" />
        </div>
      </div>
    </footer>
  );
}
