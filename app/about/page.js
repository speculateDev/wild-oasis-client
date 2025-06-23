import Image from "next/image";
import image1 from "@/public/about-1.jpg";

export const metadata = {
  title: "About ",
};

function page() {
  return (
    <div className="text-sm md:text-lg">
      <div className="flex gap-24 mb-32 flex-col md:flex-row">
        <div className="md:w-[60%]">
          <h1 className="text-3xl md:text-4xl text-accent-400 mb-10 font-medium ">
            Welcome to The Wild Oasis
          </h1>

          <div className="space-y-8">
            <p>
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home. But it&apos;s not just about
              the luxury cabins. It&apos;s about the experience of reconnecting
              with nature and enjoying simple pleasures with family.
            </p>

            <p>
              Our 8 luxury cabins provide a cozy base, but the real freedom and
              peace you&apos;ll find in the surrounding mountains. Wander
              through lush forests, breathe in the fresh air, and watch the
              stars twinkle above from the warmth of a campfire or your hot tub.
            </p>

            <p>
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>

        <div className="md:w-[40%]">
          <Image
            src={image1}
            placeholder="blur"
            alt="Family sitting arround a fire pit in front of cabin"
            quality={80}
          />
        </div>
      </div>

      <div className="flex gap-24 flex-col md:flex-row-reverse">
        <div className="md:w-[30%] relative aspect-square order-3">
          <Image
            src="/about-2.jpg"
            fill
            alt="Family that manages The Wild Oasis"
            className="object-cover"
          />
        </div>

        <div className="md:w-[70%] ">
          <h1 className="text-3xl md:text-4xl text-accent-400 font-medium mb-10">
            Managed by our family since 1962
          </h1>

          <div className="space-y-8">
            <p>
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>

            <p>
              Over the years, we&apos;ve maintained the essence of The Wild
              Oasis, blending the timeless beauty of the mountains with the
              personal touch only a family business can offer. Here, you&apos;re
              not just a guest; you&apos;re part of our extended family. So join
              us at The Wild Oasis soon, where tradition meets tranquility, and
              every visit is like coming home.
            </p>

            <div>
              <a
                className="inline-block bg-accent-500 px-8 py-5 text-primary-800 cursor-pointer hover:bg-accent-600 transition-colors font-semibold"
                href="/cabins"
              >
                Explore our luxury cabins
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
