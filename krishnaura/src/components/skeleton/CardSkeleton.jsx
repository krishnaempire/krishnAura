import { Skeleton } from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <div className="group w-[12rem] sm:w-[18rem] relative overflow-hidden rounded-lg bg-white shadow-md transition-all">
      {/* Skeleton for Image */}
      <Skeleton className="h-[12rem] sm:h-[14rem] w-full rounded-t-lg">
        <div className="h-[12rem] sm:h-[14rem] bg-gray-200 rounded-t-lg"></div>
      </Skeleton>
      <div className="absolute left-2 top-2">
        {/* Skeleton for Discount Badge */}
        <Skeleton className="w-16 h-6 rounded">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </Skeleton>
      </div>
      <div className="p-3">
        {/* Skeleton for Title */}
        <Skeleton className="h-4 w-3/4 rounded">
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </Skeleton>
        {/* Skeleton for Description */}
        <Skeleton className="mt-2 h-3 w-full rounded">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
        </Skeleton>
        <Skeleton className="mt-1 h-3 w-5/6 rounded">
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        </Skeleton>
        {/* Skeleton for Price */}
        <Skeleton className="mt-3 h-5 w-1/3 rounded">
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
        </Skeleton>
        <Skeleton className="mt-1 h-4 w-1/4 rounded">
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </Skeleton>
        {/* Skeleton for Button */}
        <Skeleton className="mt-4 h-8 w-full rounded">
          <div className="h-8 w-full bg-gray-200 rounded"></div>
        </Skeleton>
      </div>
    </div>
  );
}
