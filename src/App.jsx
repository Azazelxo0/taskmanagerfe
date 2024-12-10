
import { Container, Row } from 'react-bootstrap'
import './App.css'
import { useEffect, useState } from 'react'
import { addApi, deleteCompletedApi, deleteInprogressApi, deleteTodoApi, getcompletedApi, getInprogressApi, getTodoApi, updatecompleted, updateinprogress, updateTodo } from '../services/allApi'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    title: "",
    description: '',
    category: ''
  })
  console.log(data);
  const [details, setdetails] = useState({
    title: '',
    description: '',
    category: "",
  })
  console.log(details);


  const [istodo, settodo] = useState()
  const [isinprogress, setinprogress] = useState()
  const [iscompleted, setcompleted] = useState()


  const handleAdd = async (cat) => {
    const res = await addApi(data, cat)
    console.log(res);
    if (res.status === 201) {
      alert('successfully added')
      setData({
        title: "",
        description: '',
        category: ''
      })
      handleCall()
    }

  }

  const handleCall = async () => {
    const todo = await getTodoApi()
    console.log('todo list', todo)
    settodo(todo.data)
    const inpro = await getInprogressApi()
    console.log('inprogress list', inpro);
    setinprogress(inpro.data)
    const completed = await getcompletedApi()
    console.log('completed list', completed)
    setcompleted(completed.data)
  }

  const deleteTodo = async (id) => {
    const res = await deleteTodoApi(id)
    console.log(res);
    if (res.status === 200) {
      alert('Successfully Deleted')
      handleCall()
    }
  }

  const deleteInprogress = async (id) => {
    const res = await deleteInprogressApi(id)
    console.log(res);
    if (res.status === 200) {
      alert('Successfully Deleted')
      handleCall()
    }
  }

  const deleteCompleted = async (id) => {
    const res = await deleteCompletedApi(id)
    console.log(res);
    if (res.status === 200) {
      alert('Successfully Deleted')
      handleCall()
    }
  }



  useEffect(() => {
    handleCall()
  }, [])

  const handleTodoClose = async (id) => {
    const res = await updateTodo(details, id)
    handleCall()
    handleClose()
  }
  const handleinprogressClose = async (id) => {
    const res = await updateinprogress(details, id)
    handleCall()
    handleClose()
  }
  const handlecompletedClose = async (id) => {
    const res = await updatecompleted(details, id)
    handleCall()
    handleClose()
  }

  return (
    <>
      <Container>
        <Row>
          <div>
            <div className='text-center mt-5 mb-4'>
              <h2 className='text-success'>ADD TASK</h2>
            </div>
            <div className='d-flex justify-content-center'>
              <div>
                <input type="text" name="" id="" placeholder='Title'
                  className='form-control ' style={{ width: "400px" }}
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })} />
                <input type="text" name="" id="" placeholder='Description'
                  className='form-control mt-5 '
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                />
                <div>
                  <Dropdown className='mt-5'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => setData({ ...data, category: 'todo' })}>To-do</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setData({ ...data, category: 'inprogress' })}>In-Progress</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setData({ ...data, category: 'completed' })}>Completed</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className='d-flex justify-content-center'>
                  <button className='btn btn-success mt-4 '
                    onClick={() => handleAdd(data.category)}>
                    ADD
                  </button>
                </div>
              </div>
            </div>

          </div>


        </Row>
        <Row>
          <div className='d-flex justify-content-center'>
            <div className='m-5 border rounded' style={{ width: "250px", height: "500px" }}>
              <h4 className='text-center mt-3 mb-4'>To-Do</h4>
              <ol>

                {
                  istodo?.length > 0 ?
                    istodo.map((item) => (
                      <div className='d-flex'>
                        <li className='mb-3'>{item.title}</li>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "red" }}
                          onClick={() => deleteTodo(item.id)}><i class="fa-solid fa-trash"></i></button>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "blue" }}
                          onClick={handleShow}
                        ><i class="fa-solid fa-pen-to-square"></i></button>
                        <Modal show={show} onHide={handleClose}>

                          <Modal.Body>
                            <input type="text" name="" id="" placeholder='Title'
                              value={details.title}
                              onChange={(e) => setdetails({ ...details, title: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='description'
                              value={details.description}
                              onChange={(e) => setdetails({ ...details, description: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='category'
                              value={details.category}
                              onChange={(e) => setdetails({ ...details, category: e.target.value })}
                            />


                          </Modal.Body>
                          <Modal.Footer>

                            <Button variant="primary" onClick={() => handleTodoClose(item.id)}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>


                    )) :
                    <p>No Task</p>
                }
              </ol>



            </div>
            <div className='m-5 border rounded' style={{ width: "250px", height: "500px" }}>
              <h4 className='text-center mt-3 mb-4'>In-Progress</h4>
              <ol>

                {
                  isinprogress?.length > 0 ?
                    isinprogress.map((item) => (
                      <div className='d-flex'>
                        <li className='mb-3'>{item.title}</li>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "red" }}
                          onClick={() => deleteInprogress(item.id)}><i class="fa-solid fa-trash"></i></button>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "blue" }}
                        onClick={handleShow}
                        ><i class="fa-solid fa-pen-to-square"></i></button>
                        <Modal show={show} onHide={handleClose}>

                          <Modal.Body>
                            <input type="text" name="" id="" placeholder='Title'
                              value={details.title}
                              onChange={(e) => setdetails({ ...details, title: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='description'
                              value={details.description}
                              onChange={(e) => setdetails({ ...details, description: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='category'
                              value={details.category}
                              onChange={(e) => setdetails({ ...details, category: e.target.value })}
                            />


                          </Modal.Body>
                          <Modal.Footer>

                            <Button variant="primary" onClick={() => handleinprogressClose(item.id)}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    )) :
                    <p>No Task</p>
                }
              </ol>
            </div>
            <div className='m-5 border rounded' style={{ width: "250px", height: "500px" }}>
              <h4 className='text-center mt-3 mb-4'>Completed</h4>
              <ol>
                {
                  iscompleted?.length > 0 ?
                    iscompleted.map((item) => (

                      <div className='d-flex'>
                        <li className='mb-3'>{item.title}</li>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "red" }}
                          onClick={() => deleteCompleted(item.id)}><i class="fa-solid fa-trash"></i></button>
                        <button className='ms-2 mb-3 btn' style={{ border: "none", color: "blue" }}
                        onClick={handleShow}
                        ><i class="fa-solid fa-pen-to-square"></i></button>
                        <Modal show={show} onHide={handleClose}>

                          <Modal.Body>
                            <input type="text" name="" id="" placeholder='Title'
                              value={details.title}
                              onChange={(e) => setdetails({ ...details, title: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='description'
                              value={details.description}
                              onChange={(e) => setdetails({ ...details, description: e.target.value })}
                            />

                            <input type="text" name="" id="" placeholder='category'
                              value={details.category}
                              onChange={(e) => setdetails({ ...details, category: e.target.value })}
                            />


                          </Modal.Body>
                          <Modal.Footer>

                            <Button variant="primary" onClick={() => handlecompletedClose(item.id)}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>

                    )) :
                    <p>No Task</p>
                }
              </ol>
            </div>

          </div>
        </Row>

      </Container>

    </>
  )
}

export default App
