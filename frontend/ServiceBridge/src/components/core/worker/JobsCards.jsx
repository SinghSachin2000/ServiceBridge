import React from 'react';
import { Card, Image,CardBody } from "@nextui-org/react";

const JobCard = ({ job }) => {
  if (!job) return null;

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px] items-center"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-3 gap-6 md:gap-4 mx-auto flex items-center justify-items-center">
          <div className=" col-span-6 md:col-span-4">
            <Image
              alt={job.name}
              className="object-cover mx-auto  w-full"
              height={200}
              shadow="md"
              src={job.images[0]}
            //   width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-foreground/90">{job.name}</h3>
              <p className="text-small text-foreground/80">{job.description}</p>
              <h1 className="text-large font-medium mt-2">Price: ${job.price}</h1>
              <h1 className="text-large font-medium mt-2">Hours: {job.minHour} - {job.maxHour}</h1>
            </div>
            <div className="flex flex-col mt-3 gap-1">
              <div className="flex flex-col">
                {job.location && <div className="text-small text-foreground/50">Location: {job.location}</div>}
                {job.categoryId && <div className="text-small text-foreground/50">Category: {job.categoryId}</div>}
                {job.worker?.name && <div className="text-small text-foreground/50">Worker: {job.worker.name}</div>}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
