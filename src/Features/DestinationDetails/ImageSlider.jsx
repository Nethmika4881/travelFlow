import { useParams } from "react-router-dom";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ImageSlider() {
  const { destinationID } = useParams();

  // Autoplay plugin
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Sample images (replace with your actual data)
  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800",
    "https://images.unsplash.com/photo-1588155130555-bc90c3f60c6e?w=800",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
  ];

  return (
    <div className="w-full px-4 md:px-6 lg:px-18">
      {/* Carousel */}
      <Carousel
        plugins={[plugin.current]}
        className="mb-8 w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Rest of your content */}
      <p>Destination ID: {destinationID}</p>
    </div>
  );
}

export default ImageSlider;
