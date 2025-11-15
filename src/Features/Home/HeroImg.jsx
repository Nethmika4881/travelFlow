function HeroImg() {
  return (
    <img
      src="/images/hero-1920.webp"
      srcSet="
          /images/hero-600.webp 600w,
          /images/hero-1200.webp 1200w,
          /images/hero-1920.webp 1920w
        "
      sizes="100vw"
      alt="Sri Lanka Landscape"
      className="h-full w-full object-cover backdrop-grayscale-50"
    />
  );
}

export default HeroImg;
