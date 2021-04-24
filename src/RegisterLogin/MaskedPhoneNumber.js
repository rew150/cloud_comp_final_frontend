import { Input } from "antd"
import { useState } from "react"
import ReactInputMask from "react-input-mask"

export default function MaskedPhoneNumber({ value = '', onChange, ...props }) {
  const [number, setNumber] = useState('+66_________')

  const onNumberChange = (e) => {
    const newNumber = e.target.value
    if (!value) {
      setNumber(newNumber)
    }
    onChange?.(newNumber)
  }

  return (
    <ReactInputMask
      mask={"+66899999999"}
      formatChars={{
        '9': '[0-9]',
        '8': '[1-9]',
      }}
      maskChar={"_"}
      alwaysShowMark={true}
      permanents={[0,1,2]}
      value={value || number}
      onChange={onNumberChange}
      {...props}
    >
      {
        (p) => {
          return (<Input {...p} {...props} />)
        }
      }
    </ReactInputMask>
  )
}
