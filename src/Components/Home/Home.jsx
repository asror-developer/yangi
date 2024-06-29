import { Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import {  Modal } from 'antd';



const Home = () => {
  // get apii
  const [list, setlist] = useState([]);
  const[open, setOpen] = useState(true);
  useEffect(() => {
    getList();
  },[])

  // Modall
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((item) => setlist(item?.data));
  }


  // post apii


  const [nameEn, setNameEn]=useState()
  const [nameRu, setNameRu]=useState()
  const [pic, setPic]=useState()
  const tokenxon = localStorage.getItem("access-token")
const handleSubmit=(e)=>{
 e.preventDefault();
 const formData = new FormData();
 formData.append("name_en", nameEn);
 formData.append("name_ru", nameRu);
 formData.append("images", pic);
 fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories",{
  method: "POST",
  headers:{
    "Authorization":  `Bearer ${tokenxon}`,
   
  },
  body: formData,

}) .then ((res)=> res.json())
.then((resp)=>{
  if(resp.success) {
    getList();
    handleCancel();
  }
    
})
}

  return (
    <div className='container'>
      <div className='button'>
        <Button type='primary'    onClick={showModal}>
        Add
      </Button>


      </div>
      <div>
        <table id="customers">
          <thead>
            <tr>
              <th>en name</th>
              <th>ru name</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                {item.name_en}
                </td>
                <td>
                {item.name_ru}
                </td>
                <td>
                  <img style={{width:"150px"}} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}/>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
     
      <Modal title="Basic Modal" open={open} footer={null} onCancel={handleCancel}>
        <form>
          <input onChange={(e)=> setNameEn(e.target.value)} type="text" required placeholder='nameen' />
          <input onChange={(e)=> setNameRu(e.target.value)} type="text" required placeholder='nameru' />
          <input onChange={(e)=> setPic(e.target.files[0])} type="file" accept='image/*' required placeholder='rasm' />
          <button onClick={handleSubmit}>qo'shilsin</button>
        </form>
      </Modal>
      </div>
    </div>

  )
}

export default Home
