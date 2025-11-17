function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-50 pt-10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-orange-500 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-3xl font-bold text-stone-800">
            Travel Flow
          </h3>
          <div className="mx-auto h-1 w-20 rounded-full bg-linear-to-r from-orange-500 to-orange-600"></div>
        </div>

        {/* Divider */}
        <div className="mb-8 border-t border-stone-200"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-stone-600">
            © {new Date().getFullYear()} Travel Flow. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-stone-500">
            Discover Sri Lanka with Local Expertise
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 w-full bg-linear-to-r from-orange-500 via-orange-600 to-orange-500"></div>
    </footer>
  );
}

export default Footer;
