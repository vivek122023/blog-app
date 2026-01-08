import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center md:text-start">
            <h2 className="mb-4 text-lg font-semibold">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  iOS
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="mb-4 text-lg font-semibold">Design to code</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Figma plugin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Templates
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="mb-4 text-lg font-semibold">Comparison</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Anima
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Appsmith
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs FlutterFlow
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Monday Hero
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Retool
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Bubble
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  DhiWise vs Figma Dev Mode
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="mb-4 text-lg font-semibold">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="hidden text-xl font-semibold md:flex">
          PostCraft &nbsp; <span className="font-bold text-blue-500"> CMS </span>
        </div>
        <div className="hidden text-sm text-gray-400 md:flex">
          <p>&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>
        </div>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <a href="#">
            <FaGithub className="h-6" />
          </a>
          <a href="#">
            <BsYoutube className="h-6" />
          </a>

          <a href="#">
            <FaLinkedin className="h-6" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
