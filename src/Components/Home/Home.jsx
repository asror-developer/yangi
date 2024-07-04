import React, { useEffect, useState } from 'react'
import './Home.css';
import { Button, Modal } from 'antd';



const Home = () => {


  // get api

  const [list, setList] = useState([]);
  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((item) => {
        setList(item?.data)
      })


  }, [])
  // modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // post api
  const [nameEn, setNameEn] = useState()
  const [nameRu, setNameRn] = useState()
  const [Pic, setPic] = useState()
  const tokenxon = localStorage.getItem("access_token")
  console.log(tokenxon, "tokenxonn");

  const handleSubmit = ((e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", Pic);
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokenxon}`,
      
      },
      body: formData,
    })
    .then(res => res.json())
    .then(item => 
      console.log(item))
  })

  return (
    <div className='container'>
      <div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
      </div>
      <div className='home'>
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
                  <img
                    style={{ width: '100px' }}
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} />
                </td>
              </tr>
            ))}
          </tbody>


        </table>

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <form className='modal'>
            <input onChange={(e) => setNameEn(e.target.value)} type="text" required placeholder='nameen' />
            <input onChange={(e) => setNameRn(e.target.value)} type="text" required placeholder='nameru' />
            <input onChange={(e) => setPic(e.target.files[0])} type="file" required placeholder='rasm' />
            <button onClick={handleSubmit}>qo'shilsin</button>
          </form>
        </Modal>

      </div>
    </div>
  )
}

export default Home
