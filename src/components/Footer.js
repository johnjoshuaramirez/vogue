import { HiStar } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 py-16">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Company Description */}
          <div className="max-w-[500px]">
            <div className="flex items-center gap-3 mb-6">
              <HiStar className="w-12 h-12 text-black" />
              <span className="text-gray-950 text-2xl tracking-tight font-black">
                Vogue
              </span>
            </div>
            <p className="mb-6">
              At Vogue, we bring you the latest in fashion trends with a focus
              on style, comfort, and individuality. Whether you're looking for
              casual wear or statement pieces, we have something for every
              occasion.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-[500px]">
            <h2 className="text-gray-900 text-base font-semibold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="mb-4">
              Stay updated with our latest products, exclusive deals, and
              promotions. Sign up for our newsletter and never miss out!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded outline-none"
              />
              <button
                type="button"
                className="text-sm px-4 py-2 text-white bg-black hover:bg-gray-950 rounded transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-8 mt-12">
          <p className="text-center">&copy; 2024 Vogue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
