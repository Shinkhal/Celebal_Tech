import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal, User } from 'lucide-react';

const initialData = {
  todo: {
    title: 'To Do',
    color: 'from-slate-500 to-slate-600',
    items: [
      { id: '1', content: 'Set up project repository', priority: 'high', assignee: 'JD' },
      { id: '2', content: 'Install dependencies and configure', priority: 'medium', assignee: 'AB' },
    ],
  },
  inprogress: {
    title: 'In Progress',
    color: 'from-blue-500 to-blue-600',
    items: [
      { id: '3', content: 'Build responsive sidebar component', priority: 'high', assignee: 'CD' },
      { id: '4', content: 'Setup interactive charts dashboard', priority: 'medium', assignee: 'EF' },
    ],
  },
  done: {
    title: 'Done',
    color: 'from-green-500 to-green-600',
    items: [
      { id: '5', content: 'Design system wireframe', priority: 'low', assignee: 'GH' },
    ],
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);
  const [newTaskText, setNewTaskText] = useState('');
  const [activeColumn, setActiveColumn] = useState(null);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = source.droppableId === destination.droppableId ? sourceItems : [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  const addTask = (columnId) => {
    if (!newTaskText.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      content: newTaskText,
      priority: 'medium',
      assignee: 'You'
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask]
      }
    });
    
    setNewTaskText('');
    setActiveColumn(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div >

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}></div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {column.items.length}
                  </span>
                </div>
                <button
                  onClick={() => setActiveColumn(activeColumn === columnId ? null : columnId)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Add Task Input */}
              {activeColumn === columnId && (
                <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addTask(columnId)}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => addTask(columnId)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setActiveColumn(null)}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Droppable Area */}
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 space-y-3 p-4 rounded-xl transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-600'
                        : 'bg-gray-100/50 dark:bg-gray-800/50 border-2 border-transparent'
                    }`}
                    style={{ minHeight: '400px' }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 cursor-pointer ${
                              snapshot.isDragging
                                ? 'shadow-2xl ring-2 ring-blue-500 transform rotate-2 scale-105'
                                : 'hover:shadow-md hover:-translate-y-1'
                            }`}
                          >
                            {/* Task Content */}
                            <div className="flex items-start justify-between mb-3">
                              <p className="text-gray-900 dark:text-white font-medium flex-1 pr-2">
                                {item.content}
                              </p>
                              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-200">
                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>

                            {/* Task Meta */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                                  {item.priority}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <User className="w-3 h-3" />
                                  <span>{item.assignee}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {/* Empty State */}
                    {column.items.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks yet</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                          Click + to add your first task
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;