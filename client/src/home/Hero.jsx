import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function Hero() {
  const handleOnboarding = () => {
    const uuid = uuidv4();
    localStorage.setItem("gsession", uuid);
  };

  return (
    <>
      {/* Hero */}
      <div>
        <div className="container py-24 lg:py-24">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-x-2 border text-sm p-1 ps-3 rounded-full transition"
              to="https://github.com/career-yashaswee/CareerPlus"
            >
              <span className="inline-block bg-gray-200 text-black font-mono px-1 py-0.5 rounded-sm">
                v1
              </span>
              Release - View on GitHub
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </Link>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-4xl gradient-text">
              Right Career done Right Ways
            </h1>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-xl text-muted-foreground">
              Gain <b className="gradient-text">unfair advantage</b> in work and{" "}
              <b className="gradient-text">crush</b> your competition
            </p>
            <p className="text-xl text-muted-foreground">
              <b className="gradient-text">10X Quicker</b>, without banging your
              head on the wall.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <Link to="/flow">
              <Button
                variant="shine"
                size={"lg"}
                onClick={() => handleOnboarding()}
              >
                I&apos;m Excited
              </Button>
            </Link>
            <Button size={"lg"} variant={"outline"}>
              Learn more
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <a
              className="inline-flex items-center gap-x-1 text-sm decoration-2 font-light"
              href="#"
            >
              Made with ❤️ by Stellar Six
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
