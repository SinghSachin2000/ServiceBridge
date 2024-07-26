import React, { useState, useEffect } from 'react';
import JobCard from '../components/core/worker/JobsCards';
import { Spinner } from "@nextui-org/react";
import {Tabs} from "@nextui-org/tabs";


import imgagedummy from "../assets/signupImg.jpg"


const dummyCategories = [
    { _id: '1', name: 'Category1' },
    { _id: '2', name: 'Category2' },
    { _id: '3', name: 'Category3' }
  ];
  
  const dummyJobs = [
    {
      _id: '1',
      name: 'Job 1',
      description: 'Description for job 1',
      images: [imgagedummy],
      categoryId: '1',
      price: 100,
      minHour: 1,
      maxHour: 5
    },
    {
      _id: '2',
      name: 'Job 2',
      description: 'Description for job 2',
      images: [imgagedummy],
      categoryId: '2',
      price: 200,
      minHour: 2,
      maxHour: 6
    },
    {
      _id: '3',
      name: 'Job 3',
      description: 'Description for job 3',
      images: [imgagedummy],
      categoryId: '1',
      price: 150,
      minHour: 1,
      maxHour: 4
    }
  ];


// function WorkerHomePage() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {

//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         setLoadingJobs(false);
//       }
//     };

//     const fetchCategories = async () => {
//       try {

//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setLoadingCategories(false);
//       }
//     };

//     fetchJobs();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory === 'All') {
//       setFilteredJobs(jobs);
//     } else {
//       setFilteredJobs(jobs.filter(job => job.categoryId === selectedCategory));
//     }
//   }, [selectedCategory, jobs]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   if (loadingJobs || loadingCategories) {
//     return (
//       <Container>
//         <Spinner />
//         <p>Loading...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Tabs
//         aria-label="Category Tabs"
//         onChange={(key) => handleCategoryChange(key)}
//         className="tabs-container"
//       >
//         <Tabs.Item key="All" title="All" />
//         {categories.map(category => (
//           <Tabs.Item key={category._id} title={category.name} />
//         ))}
//       </Tabs>
//       <div className="job-list">
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map(job => (
//             <JobCard key={job._id} job={job} />
//           ))
//         ) : (
//           <p>No jobs available for this category.</p>
//         )}
//       </div>
//     </Container>
//   );
// }

const WorkerHomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('All');
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchJobs = () => {
            setTimeout(() => {
                setJobs(dummyJobs);
                setLoadingJobs(false);
            }, 1000);
        };

        const fetchCategories = () => {
            setTimeout(() => {
                setCategories(dummyCategories);
                setLoadingCategories(false);
            }, 1000);
        };

        fetchJobs();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (currentCategory === 'All') {
            setFilteredJobs(jobs);
        } else {
            setFilteredJobs(jobs.filter(job => job.categoryId === currentCategory));
        }
    }, [currentCategory, jobs]);

    const handleCategoryChange = (key) => {
        setCurrentCategory(key);
    };

    if (loadingJobs || loadingCategories) {
        return (
            <div style={{ padding: '20px' }}>
                <Spinner />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className='p-[20px] min-h-screen w-screen font-inter flex flex-col'>
            <div className=" mb-4 lg:flex flex-col lg:flex-row gap-5  mx-auto w-max bg-richblack-800 text-richblack-200 p-1 lg:rounded-full rounded-sm font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] ">
                {['All', ...categories.map(cat => cat.name)].map((tab, index) => (
                    <div
                        className={`text-[16px] flex flex-row items-center gap-2 m-2 ${
                            currentCategory === tab
                                ? "bg-richblack-900 text-richblack-5 font-medium"
                                : "text-richblack-200"
                        } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                        key={index}
                        onClick={() => handleCategoryChange(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className=" lg:block lg:h-[50px]"></div>
            <div className="lg:absolute gap-10 justify-center lg:gap-5 flex  flex-wrap w-full text-black lg:mt-20">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))
                ) : (
                    <p>No jobs available for this category.</p>
                )}
            </div>
        </div>
    );
}

export default WorkerHomePage