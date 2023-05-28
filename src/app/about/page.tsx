"use client";

import Image from "next/image";

export default function About() {
  const people = [
    {
      name: "Timothy Cliff Permadi",
      nim: "00000069749",
      image: "/ming.png",
    },
    {
      name: "Darrell Samuel Sundy",
      nim: "00000069648",
      image: "/darrell.png",
    },
    {
      name: "Brian Ricky Budiman",
      nim: "00000069522",
      image: "/brian2.png",
    },
    {
      name: "Sion Alexander Hartono",
      nim: "00000069908",
      image: "/sion.png",
    },
  ];
  return (
    <>
      <div className="h-[8rem]"></div>
      <h1 className="text-center font-extrabold text-3xl mb-6">Our Developer</h1>
      <div className="flex flex-col lg:flex-row flex-shrink max-w-full gap-8 justify-center items-center m-auto">
        {people.map((x, i) => (
          <div key={i} className="card w-60 bg-base-300 shadow-xl flex flex-col">
            <Image src={x.image} alt={x.name + " Picture"} width={150} height={150} className="mx-auto rounded mt-5" />
            <div className="card-body text-center">
              <h2 className="card-title m-auto">{x.name}</h2>
              <p className="">{x.nim}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
