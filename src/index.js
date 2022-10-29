import * as ReactDOMClient from 'react-dom/client';

import TodoListHookies from './components/app/app';

const todo = ReactDOMClient.createRoot(document.querySelector('.root'));
todo.render(<TodoListHookies />);
