// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { DocumentIcon, XCircleIcon } from '@heroicons/react/24/outline'
// import {
//   SelectValue,
//   SelectTrigger,
//   SelectItem,
//   SelectContent,
//   Select,
// } from '@../../components/ui/select';
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'

// const ItemMenuModal = ({ setIsModalOpen, closeModal }) => {
//   const onClose = () => {
//     setIsModalOpen(false) // Function to close the modal
//     closeModal
//   }

//   const { t } = useTranslation()
//   const [file, setFile] = useState(null)
//   const [item, setItem] = useState('')
//   const [dueDate, setDueDate] = useState('')
//   const [noDueDate, setNoDueDate] = useState(false)
//   const [isCategory, setIsCategory] = useState('')

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         onClose()
//       }
//     }

//     window.addEventListener('keydown', handleKeyDown)

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown)
//     }
//   }, [])

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0])
//   }

//   // Define other handlers for form inputs

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
//         <div className="flex justify-between items-start">
//           <h2 className="text-xl font-semibold">Item Menu</h2>
//           <button className="text-gray-400 hover:text-gray-500">
//             <PanelTopCloseIcon className="h-6 w-6" />
//           </button>
//         </div>
//         <div className="mt-4">
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="category"
//             >
//               Category:
//             </label>
//             <div className="mt-1">
//               <Select>
//                 <SelectTrigger id="category">
//                   <SelectValue placeholder="Equipment" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="equipment">Equipment</SelectItem>
//                   <SelectItem value="documents">Documents</SelectItem>
//                   <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="item"
//             >
//               Item:
//             </label>
//             <Input id="item" placeholder="Life Raft Service" />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               className="block text-sm font-medium text-gray-700 mr-2"
//               htmlFor="no-due-date"
//             >
//               No Due Date:
//             </label>
//             <input
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               id="no-due-date"
//               type="checkbox"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="due-date"
//             >
//               Due Date:
//             </label>
//             <Input id="due-date" placeholder="30 Oct 2023" />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               className="block text-sm font-medium text-gray-700 mr-2"
//               htmlFor="complete"
//             >
//               Complete:
//             </label>
//             <input
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               id="complete"
//               type="checkbox"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//               htmlFor="attachment"
//             >
//               Attachment:
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
//                     htmlFor="file-upload"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       className="sr-only"
//                       id="file-upload"
//                       name="file-upload"
//                       type="file"
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, GIF up to 10MB
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-medium text-gray-900">History:</h3>
//             <div className="mt-2">
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-sm text-gray-700">
//                   Date: 23 Sep 2023 @ 18:34:19 UTC
//                 </span>
//                 <Badge variant="secondary">UPLOADED</Badge>
//               </div>
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-sm text-gray-700">
//                   Date: 12 Oct 2022 @ 12:34:11 UTC
//                 </span>
//                 <Badge variant="secondary">UPLOADED</Badge>
//               </div>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h3 className="text-lg font-medium text-gray-900">Comments:</h3>
//             <div className="mt-2 space-y-4">
//               <p className="text-sm text-gray-700">
//                 DPA (12 Nov 2023 @ 14:55:34 UTC): Thanks!
//               </p>
//               <p className="text-sm text-gray-700">
//                 Me (12 Nov 2023 @ 14:52:23 UTC): Will do.
//               </p>
//               <p className="text-sm text-gray-700">
//                 DPA (12 Nov 2023 @ 13:23:55 UTC): @firstofficer please be sure
//                 to complete the fire drill this month. Also, were still showing
//                 that the life rafts are overdue for service. If you have had the
//                 inspection done, please upload the new service reports, other
//                 please schedule ASAP.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end space-x-3">
//           <Button variant="outline">Cancel</Button>
//           <Button>Save</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function PanelTopCloseIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
//       <line x1="3" x2="21" y1="9" y2="9" />
//       <path d="m9 16 3-3 3 3" />
//     </svg>
//   )
// }

// function UploadCloudIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
//       <path d="M12 12v9" />
//       <path d="m16 16-4-4-4 4" />
//     </svg>
//   )
// }

// export default ItemMenuModal
