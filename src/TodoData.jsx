import { useEffect, useState } from 'react';

async function fetchTodoData(id) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    const data = await response.json();
    return data;
}

function Todo({ todoData }) {
    return (
        <div>
            <h2>Title: {todoData.title}</h2>
            <h2>Completed: {todoData.completed ? "Completed" : "Not Completed"}</h2>
        </div>
    )
}

export default function TodoData() {
    const [userInput, setUserInput] = useState("")
    const [todoData, setTodoData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userInput) {
            setIsLoading(true)
            fetchTodoData(userInput)
                .then(data => setTodoData(data))
                .catch(error => console.log(error))
                .finally(() => setIsLoading(false))
        }
    }, [userInput]
    )

    return (
        <div>
            <input type="text" value={userInput} onChange={(event) => setUserInput(event.target.value)} placeholder='Please enter an ID' />
            {isLoading && <p>Loading...</p>}
            {todoData && todoData.title && (
                <>
                    <Todo todoData={todoData} />
                </>
            )}
        </div>
    )
}
