import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
  DocumentIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const AddItemModal = ({ setIsModalOpen, closeModal }) => {

  const onClose = () => {
    setIsModalOpen(false);  // Function to close the modal
    closeModal;
  };


  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [item, setItem] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [noDueDate, setNoDueDate] = useState(false);
  const [isCategory, setIsCategory] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Define other handlers for form inputs

  return (
    // Modal background overlay
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      {/* Modal content container*/}
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="absolute top-2 right-2 pb-4">
          <button onClick={onClose}><XCircleIcon className="h-8 w-8" />Close</button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 pt-5">{t("documentmodal.common.uploaddetails")}</h3>
          <form className="mt-2">
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.category")}</label>
              <select 
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              onChange={(e) => setIsCategory(e.target.value)}
              >
                <option>{t("documentmodal.category.select")}</option>
                <option>{t("documentmodal.category.equipment")}</option>
                <option>{t("documentmodal.category.forms")}</option>
              </select>

              {/* Sub-Categories */}
               {/* If Category == "Equip", "Doc", "Cert", or "Crew" is selected then add  Sub-Category,  */}
              {isCategory === "Equipment:" && (
                <div className="mt-3 text-center">
          
            
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.subcategory")}</label>
                  <select className="shadow border rounded w-full py-2 px-3 text-gray-700">
                    <option>{t("documentmodal.subcategory.doc")}</option>
                    <option>{t("documentmodal.subcategory.cert")}</option>
                    <option>{t("documentmodal.subcategory.crew")}</option>
                  </select>
                </div>
              )}
              
              
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.item")}</label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                placeholder="Life Raft Service"
              />
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                checked={noDueDate}
                onChange={(e) => setNoDueDate(e.target.checked)}
                className="form-checkbox h-5 w-5 text-gray-600"
              /><span className="ml-2 text-gray-700">{t("documentmodal.common.noduedate")}</span>
            </div>

            {!noDueDate && (
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.duedate")}</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                />
              </div>
            )}

            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.attachment")}</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-sky-900 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t("documentmodal.common.submit")}
              </button>
            </div>
          </form>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.comments")}</label>
            <div className="p-5 bg-gray-100 rounded">
              {/* Comments  here */}
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("documentmodal.common.history")}</label>
            <div className="p-5 bg-gray-100 rounded">
              {/* History list here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
