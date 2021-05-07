import React, {useState} from 'react'
import CKEditor from '../../components/CKEditor'

export const CKTest: React.FC = () => {
  const [data, setData] = useState<any>()
  const change = (event: React.ChangeEvent<HTMLInputElement>, editor: any): void => {
    let data1 = editor.getData()
    console.log(data1)
    setData(data1)
  }
  return (
    <CKEditor
      value={data}
      //@ts-ignore
      onChange={change}
      useFormulas
    />
  )
}