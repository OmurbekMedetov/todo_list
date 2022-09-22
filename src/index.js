import * as ReactDOMClient from 'react-dom/client';
import TodoList from './components/app'; 

const todo = ReactDOMClient.createRoot(document.querySelector('.root'));
todo.render(<TodoList />)