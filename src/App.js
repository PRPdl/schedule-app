import Header from "./components/Header"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tasks from "./components/Tasks"
import Footer from "./components/Footer"
import AddTask from "./components/AddTask"
import About from "./components/About"
import { useState, useEffect } from 'react'


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTask()
  }, [])

  //Fetch Tasks 

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Add Task 

  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])


    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id,...task}
    // setTask([...tasks, newTask])
  }

  //Delete Task 

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'Delete'
    })

    setTask(tasks.filter(task =>
      task.id !== id
    ))
  }

  //Fetch Task 

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //Toggle Remainder

  const toggleRemanider = async (id) => {
    const taskTobeToggled = await fetchTask(id)
    const updatedTask = { ...taskTobeToggled, remainder: !taskTobeToggled.remainder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTask(
      tasks.map(task =>
        task.id === id ? { ...task, remainder: data.remainder } : task)
    )
  }


  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRemanider} /> : <h3>No Tasks Avilable</h3>}
          </>
        )}></Route>
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
