"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-card.jsx"
import React from "react";

export default function Review() {
  return (
    <div className="rounded-md flex flex-col relative overflow-hidden">
      <div className='text-center mb-[5rem]'>
        <p className='text-[4rem] font-medium bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent'>Reviews
        </p>
      </div>
      <div className="w-[19rem] sm:w-[45rem] md:w-[50rem] lg:w-full">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          rotate={true}
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season ",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];