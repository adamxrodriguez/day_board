'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import Button from '../components/Button/index'
import Card from '../components/Card/index'
import Content from '../components/Content/index'
import Meta from '../components/Meta/index'
import { useTranslation } from 'react-i18next'
import { LandingLayout } from '@/app/layouts/LandingLayout'
import MessagesSection from '@/app/dashboard/messages'
import addItemModal from '../components/Modal/addItemModal'
import Sidebar from '../components/Sidebar/index'
import {CogIcon,DocumentIcon,XCircleIcon,CloudArrowUpIcon,} from '/node_modules/@heroicons/react/24/outline'
import Link from 'next/link'
import Table from './Table'

const Dashboard = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const [selectedType, setSelectedType] = useState('all')
  console.log('Dashboard ~ selectedType: ', selectedType)

  const tasks = [
    {
      id: 1,
      update: 'false',
      name: 'Life Raft Service',
      dueDate: '30 Oct 2023',
      daysUntilDue: 0,
      category: 'Equipment',
      subCategory: 'LSA',
    },
    {
      id: 2,
      update: 'true',
      name: 'Fire Drill',
      dueDate: '30 Nov 2023',
      daysUntilDue: 27,
      category: 'SMS',
      subCategory: 'Complete',
    },
    {
      id: 3,
      update: 'false',
      name: 'John Doe Passport',
      dueDate: '30 Jan 2024',
      daysUntilDue: 87,
      category: 'Crew',
      subCategory: 'Crew Docs',
    },
    // ... other tasks
  ]

  return (
    <LandingLayout>
      <div className="min-h-screen">
        <header className="flex justify-between items-center p-4 bg-slate-200 text-white">
          <Link href="/dashboard">
            <img
              className="object-scale-down h-16"
              src="/images/dayboardyachtsolutions_logo.png"
              alt="Dayboard Yacht Solutions Logo"
            />
          </Link>
          <button className="bg-sky-900 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded">
            {t('common.label.logout')}
          </button>
        </header>
        <div className="flex ">
          {/*sidebar*/}
          <Sidebar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          {/*table*/}
          {/* <Table
            tasks={tasks}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          /> */}
        </div>
      </div>
    </LandingLayout>
  )
}

export default Dashboard
