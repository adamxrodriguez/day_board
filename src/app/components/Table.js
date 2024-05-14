import React from 'react'
import { useEffect, useState } from 'react'
import Button from '@/components/Button/index'
import Card from '@/components/Card/index'
import Content from '@/components/Content/index'
import Meta from '@/components/Meta/index'
import { useTranslation } from 'react-i18next'
import { LandingLayout } from '@/layouts/index'
import MessagesSection from '@/components/messages'
import AddItemModal from '@/components/Modal/addItemModal'

import {
  CogIcon,
  DocumentIcon,
  XCircleIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import ItemMenuModal from './Modal/ItemMenuModal'

const Table = (tasks, selectedType, setSelectedType) => {
  const { t } = useTranslation()
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleRowClick = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  console.log(tasks.selectedType)
  console.log(tasks)
  console.log(setSelectedType)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  //   const sortedTasks = tasks.sort((a, b) => {
  //     if (sortKey) {
  //       const valueA = a[sortKey];
  //       const valueB = b[sortKey];
  //       if (valueA < valueB) {
  //         return sortOrder === 'asc' ? -1 : 1;
  //       }
  //       if (valueA > valueB) {
  //         return sortOrder === 'asc' ? 1 : -1;
  //       }
  //     }
  //     return 0;
  //   });

  return (
    <main
      className="w-5/6 p-4 h-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <div className="overflow-x-auto h-full">
        <Content.Container>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="p-2 border-r"
                  onClick={() => handleSort('update')}
                >
                  {t('common.label.update')}
                  {sortKey === 'update' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'update' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
                <th className="p-2 border-r" onClick={() => handleSort('name')}>
                  {t('common.label.item')}
                  {sortKey === 'name' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'name' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
                <th
                  className="p-2 border-r"
                  onClick={() => handleSort('duedate')}
                >
                  {t('common.label.duedate')}
                  {sortKey === 'duedate' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'duedate' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
                <th
                  className="p-2 border-r"
                  onClick={() => handleSort('daysuntildue')}
                >
                  {t('common.label.daysuntildue')}
                  {sortKey === 'daysuntildue' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'daysuntildue' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
                <th
                  className="p-2 border-r"
                  onClick={() => handleSort('category')}
                >
                  {t('common.label.category')}
                  {sortKey === 'category' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'category' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
                <th
                  className="p-2 border-r"
                  onClick={() => handleSort('subCategory')}
                >
                  {t('common.label.subcategory')}
                  {sortKey === 'subCategory' && sortOrder === 'asc' && (
                    <span>&#9650;</span>
                  )}
                  {sortKey === 'subCategory' && sortOrder === 'desc' && (
                    <span>&#9660;</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.tasks
                .sort((a, b) => {
                  if (sortKey === 'name') {
                    return sortOrder === 'asc'
                      ? a.update.localeCompare(b.update)
                      : b.update.localeCompare(a.update)
                  } else if (sortKey === 'duedate') {
                    return sortOrder === 'asc'
                      ? a.name.localeCompare(b.name)
                      : b.name.localeCompare(a.name)
                  } else if (sortKey === 'duedate') {
                    return sortOrder === 'asc'
                      ? a.dueDate.localeCompare(b.dueDate)
                      : b.dueDate.localeCompare(a.dueDate)
                  } else if (sortKey === 'daysuntildue') {
                    return sortOrder === 'asc'
                      ? a.daysUntilDue - b.daysUntilDue
                      : b.daysUntilDue - a.daysUntilDue
                  } else if (sortKey === 'category') {
                    return sortOrder === 'asc'
                      ? a.category.localeCompare(b.category)
                      : b.category.localeCompare(a.category)
                  } else if (sortKey === 'subCategory') {
                    return sortOrder === 'asc'
                      ? a.subCategory.localeCompare(b.subCategory)
                      : b.subCategory.localeCompare(a.subCategory)
                  } else {
                    return 0
                  }
                })
                .map((task) => (
                  // Render the sorted tasks
                  <tr
                    key={task.id}
                    onClick={() => handleRowClick(task)}
                    className="hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.update}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.dueDate}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        task.daysUntilDue < 1
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {task.daysUntilDue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.subCategory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button>
                        <DocumentIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              <tr key={tasks.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{tasks.update}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tasks.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{tasks.dueDate}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    tasks.daysUntilDue < 1 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {tasks.daysUntilDue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tasks.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    {tasks.subCategory}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button>
                    <DocumentIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Content.Container>
      </div>
      {/* Trigger button for the modal */}
      <div className="icon flex justify-end p-4">
        <button onClick={openModal}>
          <CloudArrowUpIcon className="h-12 w-12" />
          Add
        </button>
      </div>
      {/* Modal Component */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <addItemModal setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
      {isModalOpen && (
        <ItemMenuModal
          setIsModalOpen={setIsModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {/* Display information about the selected task */}
          <h2>{selectedTask.name}</h2>
          {/* ... other information about the selected task ... */}
        </ItemMenuModal>
      )}
      {/*messages*/}

      <MessagesSection />
    </main>
  )
}

export default Table
