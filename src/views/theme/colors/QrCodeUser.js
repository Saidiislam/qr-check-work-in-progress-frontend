import QRCode from 'qrcode.react'
// import QRCode from 'qrcode'
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useRef } from 'react'
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
import QrReader from 'react-qr-reader'

const QrCode = () => {
  const [checkData, setCheckData] = useState([])
  const [scanResultWebCam, setScanResultWebCam] = useState('')
  const [scanResultFile, setScanResultFile] = useState('')
  const qrRef = useRef(null)
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  console.log(userInfoFromLocalStorage)
  const handleErrorFile = (error) => {
    console.log(error)
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result)
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog()
  }
  console.log(scanResultFile)
  const handleErrorWebCam = (error) => {
    console.log(error)
  }
  const handleScanWebCam = (result) => {
    setScanResultWebCam(result)
  }
  console.log(scanResultWebCam)
  return (
    <>
      <h1>All User Qr Code</h1>
      <QRCode id={userInfoFromLocalStorage._id} value={`${userInfoFromLocalStorage.name}`} />
      <div style={{ width: '300px', height: '500px' }}>
        <button onClick={onScanFile}>Qr code reader</button>
        <QrReader
          ref={qrRef}
          delay={300}
          onError={handleErrorFile}
          onScan={handleScanFile}
          legacyMode
        />
      </div>
      <div style={{ width: '300px', height: '500px' }}>
        <button onClick={onScanFile}>Qr code reader</button>
        <QrReader ref={qrRef} delay={300} onError={handleErrorWebCam} onScan={handleScanWebCam} />
      </div>
    </>
  )
}

export default QrCode
