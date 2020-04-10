import React, { useState, useEffect, useCallback } from "react"

type EditorPropsType = {
  text: string
}

const rowsCount = (text: string) => text.split("\n").length + 1

export default ({ text }: EditorPropsType) => {
  const [value, setValue] = useState(text)
  const [rows, setRows] = useState(rowsCount(text))

  const handleChange = useCallback(e => {
    setValue(e.currentTarget.value)
  }, [])

  useEffect(() => {
    setValue(text)
  }, [text])

  useEffect(() => {
    setRows(rowsCount(value))
  }, [value])

  return <textarea value={value} rows={rows} onChange={handleChange} />
}
