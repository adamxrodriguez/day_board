import React, { useState, useEffect } from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

const SidebarMenuFilter = ({ selectedType, setSelectedType }) => {
  const { t } = useTranslation()

  const onItemClick = (type) => {
    console.log(' type:', type)
    setSelectedType(type)
  }

  const filterMenu = {
    name: 'Filter',
    menuItems: [
      {
        label: 'common.label.all',
        type: `all`,
      },
      {
        label: 'common.label.forms',
        type: `Forms`,
      },
      {
        label: 'common.label.crew',
        type: `Crew`,
      },
      {
        label: 'common.label.equip',
        type: `Equip`,
      },
      {
        label: 'common.label.ncrs',
        type: `NCRs`,
      },
      {
        label: 'common.label.docs',
        type: `Docs`,
      },
      {
        label: 'common.label.certs',
        type: `Certs`,
      },
    ],
  }

  return (
    <div className="space-y-2">
      <h5 className="text-sm font-bold text-gray-400">{filterMenu.name}</h5>
      <ul className="ml-5 leading-10">
        {filterMenu.menuItems.map((item) => (
          <li key={item.label} onClick={() => onItemClick(item.type)}>
            {t(item.label)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarMenuFilter
