// src/pages/Kanban.jsx
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

const Kanban = () => {
  return (
    <div  className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md'>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Kanban Board</h1>
      <p className="text-gray-600 dark:text-gray-300">Your drag-and-drop board will go here.</p>
        <KanbanBoard />
    </div>
  );
};

export default Kanban;
