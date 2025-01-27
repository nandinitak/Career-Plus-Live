"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowRightCircleIcon } from "lucide-react";
import { SpaceCard } from "./components/SpaceCard";

const spaces = [
  {
    id: 1,
    title: "Argiculture Machinery",
    description:
      "Get hands-on with farming machines! Learn to operate, repair, and keep them running for better crops.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Logo_of_Department_of_Agriculture_and_Farmers_Welfare_Punjab.jpg",
    backgroundImage:
      "https://www.shutterstock.com/image-photo/indian-punjabi-sikh-farmer-kissing-260nw-2460536599.jpg",
    followers: 1500,
  },
  {
    id: 2,
    title: "Medical Care",
    description:
      "A platform to empower and upskill individuals in the Medical Care sector, focusing on advanced healthcare practices and professional training.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwv-x821yDqOkGKKbmBhS7YBba8OGRrHYdA&s",
    backgroundImage:
      "https://www.shutterstock.com/image-photo/beawar-rajasthan-india-june-27-260nw-1999195484.jpg",
    followers: 1800,
  },
  {
    id: 3,
    title: "Information Technology",
    description:
      "A platform to empower and upskill individuals in the IT sector, focusing on software development, cybersecurity, data analytics, and emerging technologies.",
    icon: "https://img.freepik.com/premium-vector/yu-initial-monogram-technology-logo-with-circle-style-design_1190297-21072.jpg",
    backgroundImage:
      "https://media.istockphoto.com/id/1258165998/photo/silk-businessman-with-turban-using-smart-phone.jpg?s=612x612&w=0&k=20&c=idHkMS1pn9C_LMpShdcNQ2WREGrr64aZE1mV3xGqrGs=",
    followers: 2200,
  },
  {
    id: 4,
    title: "Handcrafts",
    description:
      "A platform to empower and upskill individuals in the Handcrafts sector, focusing on traditional arts, modern crafts, and sustainable handmade products.",
    icon: "https://img.freepik.com/premium-vector/artisan-clay-designing-unique-vector-logo-icon-pottery_579306-38043.jpg ",
    backgroundImage:
      "https://www.shutterstock.com/image-photo/portrait-indian-people-painting-mud-260nw-2447645633.jpg",
    followers: 1700,
  },
  {
    id: 5,
    title: "Motor Mechanics",
    description:
      "Learn to fix bikes, scooters, and cars with simple tools and tricks. Become a top mistri in no time",
    icon: "https://media.istockphoto.com/id/1201226771/vector/autoparts-in-gear-auto-piston-spark-plug-and-wrench-design-automotive-parts-automobile.jpg?s=612x612&w=0&k=20&c=zq20de1l27az5Oo4JYgP3fFGVxytWh7KmsSXTvvAOYQ=",
    backgroundImage:
      "https://cdn.freepixel.com/preview/free-photos-a-man-wearing-a-white-turban-working-on-an-engine-likely-associated-with-an-automobile-or-a-truck-he-preview-100322915.jpg",
    followers: 1700,
  },
  {
    id: 6,
    title: "Construction Technology",
    description:
      "Master the art of construction with easy-to-learn techniques for building, designing, and managing projects. Build your future as a skilled constructor",
    icon: "https://img.freepik.com/premium-vector/construction-technology-logo-designs-real-estate-innovation-logo-template_7649-4163.jpg",
    backgroundImage:
      "https://sc0.blr1.cdn.digitaloceanspaces.com/article/136141-rlfqwueird-1581164885.jpg",
    followers: 1500,
  },
  {
    id: 7,
    title: "Waste Management",
    description:
      "Learn to manage waste, recycle efficiently, and keep the environment clean with simple techniques. Become a waste management expert and help build a greener world",
    icon: "https://media.istockphoto.com/id/1254440706/vector/e-waste-garbage-icon-old-discarded-electronic-waste-to-recycling-symbol-ecology-concept.jpg?s=612x612&w=0&k=20&c=zE96Hdx55nLyLK2jrFWtDm74rEcmg0nRSjj3Wqa6xoU=",
    backgroundImage:
      "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/08/23060726/waste-1024x682.jpg",
    followers: 1900,
  },
  {
    id: 8,
    title: "Animal Husbandry",
    description:
      "Master the skills needed to raise and care for animals, improve livestock health, and manage a thriving farm. Learn practical techniques in breeding, feeding, and animal welfare to boost your farm's productivity and sustainability",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtlecbfdZoGp1Eb2FrQv4I943O0qBF0YFAzw&s",
    backgroundImage:
      "https://media.istockphoto.com/id/652550482/photo/portrait-of-buffalo-shepherd.jpg?s=612x612&w=0&k=20&c=Rir8MHClROhkO9JhQ62BaBBtk7gf5Tv2eEltLApJWks=",
    followers: 1900,
  },
];

function SpacePage() {
  const [loading, setLoading] = useState(true);
  const [followedSpaces, setFollowedSpaces] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFollow = (spaceId) => {
    setFollowedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  return (
    <div className=" bg-white text-gray-900 p-3">
      <div className="">
        <div className="bg-gray-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Spaces!</h1>
            <p className="text-gray-600">
              Follow Spaces to explore your interests on CareerPlus.
            </p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Button variant="outline" className="mr-4">
              <PlusIcon className="mr-2 h-4 w-4" /> Create a Space
            </Button>
            <Button variant="outline">
              <ArrowRightCircleIcon className="mr-2 h-4 w-4" /> Discover Spaces
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              {...space}
              loading={loading}
              isFollowed={followedSpaces.includes(space.id)}
              onFollow={handleFollow}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpacePage;
