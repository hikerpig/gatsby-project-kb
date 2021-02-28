import React, { useState, useEffect } from 'react'

interface DemoProps {}

const Demo = ({}: DemoProps) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timerId)
    }
  })

  return (
    <p>
      <span>A fake clock: </span>
      <span>
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </span>
    </p>
  )
}

export default Demo
