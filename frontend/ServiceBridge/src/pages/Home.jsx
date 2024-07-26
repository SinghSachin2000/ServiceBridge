import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react"
import { useQueries, useQuery } from "@tanstack/react-query";
import {getData} from "../components/core/apiHandler"
import {Link} from "react-router-dom"
export default function Home() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
//   const first = useQuery({
//     queryKey:["get request"],
//     queryFn:async()=>{
//       return await getData("http://example.com/articles",{},{});
//     }
//   })
// console.log(first.data.data);
  return (
   <div>
      {/* section 1 */}
      <div className="flex flex-col items-center mt-10 ">
        <h1 className="text-5xl font-semibold p-4">
        Effortless Publishing
        </h1>
        <p className="w-[60%] text-center text-richblack-400">AI-assisted blogging for developers and teams. Draft to published in minutes.</p>
        <Link to="/login">
         <Button className="bg-richblack-800 m-4 text-white rounded-[30px]">Start</Button>
        </Link>
      </div>
   </div>
  );
}
