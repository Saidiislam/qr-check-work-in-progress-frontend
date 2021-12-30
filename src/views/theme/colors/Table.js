import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import axios from 'axios'

const Colors = () => {
  const [checkData, setCheckData] = useState([])
  const [text, setText] = useState('')
  const [filterData, setFilterData] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5500/api/users/adcheck', config)
    setCheckData(data)
    // console.log(data)
  }
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  // const updateUser = (e) => {
  //   setText(e.target.value)
  // console.log(text)
  // const tempCheckData = checkData.filter((data) => {
  //   return data.name.toLowerCase().startsWith(text)
  // })
  // setCheckData(tempCheckData)

  //   // console.log(tempCheckData)
  // }
  return (
    <>
      <h1>This Is For Admin</h1>
      <br />
      <CTable color="success" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {checkData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.createdAt}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
