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
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import axios from 'axios'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const [userDate, setUserDate] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(true)
  // const options = [
  //   'Open this select menu',
  //   { label: 'One', value: 'One' },
  //   { label: 'Two', value: 'Two' },
  //   { label: 'Three', value: 'Three' },
  // ]
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadSelectData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5500/api/users/select', config)
    setUserDate(data)
    // data.forEach((data) => {
    //   const name = data.name
    //   return name
    // })
  }
  useEffect(() => {
    loadSelectData()
  }, [loadSelectData])
  const handleSubmit = async () => {
    let check
    if (checked) {
      check = 'Check In'
      for (let i = 0; i < userDate.length; i++) {
        const userId = userDate[i].name
        // console.log(userId)
        // console.log(userInfoFromLocalStorage._id)
        if (userId === name) {
          if (userDate[i].id === userInfoFromLocalStorage._id) {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
              },
            }
            const { data } = await axios.post(
              `http://localhost:5500/api/users/select`,
              { name, check },
              config,
            )
            console.log(data)
            console.log('match')
            setChecked(!checked)
          } else {
            console.log('not match id')
          }
        } else {
          const notMatch = "Don't Select other person"
          console.log(notMatch)
        }
      }
    } else {
      check = 'Check Out'
      for (let i = 0; i < userDate.length; i++) {
        const userId = userDate[i].name
        // console.log(userId)
        // console.log(userInfoFromLocalStorage._id)
        if (userId === name) {
          if (userDate[i].id === userInfoFromLocalStorage._id) {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
              },
            }
            const { data } = await axios.post(
              `http://localhost:5500/api/users/select`,
              { name, check },
              config,
            )
            console.log(data)
            console.log('match')
            setChecked(!checked)
          } else {
            console.log('not match id')
          }
        } else {
          const notMatch = "Don't Select other person"
          console.log(notMatch)
        }
      }
      console.log('check false')
    }
    // console.log(data)
  }
  // console.log(name)
  return (
    <>
      <CCard className="mb-2">
        {/* <CCardHeader>
          Theme colors
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader> */}
        {/* <CCardBody>
          <CRow>
            <ThemeColor className="bg-primary">
              <h6>Brand Primary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-secondary">
              <h6>Brand Secondary Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-success">
              <h6>Brand Success Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-danger">
              <h6>Brand Danger Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-warning">
              <h6>Brand Warning Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-info">
              <h6>Brand Info Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-light">
              <h6>Brand Light Color</h6>
            </ThemeColor>
            <ThemeColor className="bg-dark">
              <h6>Brand Dark Color</h6>
            </ThemeColor>
          </CRow>
        </CCardBody> */}
        {/* <CFormSelect
          aria-label="Default select example"
          options={options}
          onChange={(e) => console.log(e.target.value)}
        /> */}
        <CFormSelect aria-label="Default select example" onChange={(e) => setName(e.target.value)}>
          <option>Select your Name</option>
          {userDate.map((v) => {
            return (
              <option value={v.name} key={v.id}>
                {v.name}
              </option>
            )
          })}
        </CFormSelect>
      </CCard>
      <br />
      <CButton
        color="success"
        size="lg"
        style={{ color: 'white' }}
        onClick={() => setVisible(!visible)}
        disabled={!checked}
      >
        Check In
      </CButton>
      <CButton
        color="success"
        size="lg"
        style={{ color: 'white', marginLeft: '10px' }}
        onClick={() => setVisible(!visible)}
        disabled={checked}
      >
        Check Out
      </CButton>
      <CModal
        className="show d-block position-static"
        backdrop={false}
        keyboard={false}
        portal={false}
        visible={visible}
      >
        <CModalHeader>
          <CModalTitle>Are you sure?</CModalTitle>
        </CModalHeader>
        {/* <CModalBody>Modal body text goes here.</CModalBody> */}
        <CModalFooter>
          <CButton color="success" onClick={handleSubmit}>
            Yes
          </CButton>
          <CButton color="primary" onClick={() => setVisible(!visible)}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Colors
