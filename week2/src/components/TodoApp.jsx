import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Edit2, Calendar, Filter, SortAsc } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('medium');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingPriority, setEditingPriority] = useState('medium');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!input.trim()) {
      alert("Task description cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setInput('');
    setPriority('medium');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleMarkCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleMarkIncomplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: false } : task
      )
    );
  };

  const handleEdit = (id, text, taskPriority) => {
    setEditingId(id);
    setEditingText(text);
    setEditingPriority(taskPriority);
  };

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) {
      alert("Task description cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText.trim(), priority: editingPriority } : task
      )
    );
    setEditingId(null);
    setEditingText('');
    setEditingPriority('medium');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingPriority('medium');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    if (filter === 'high') return task.priority === 'high';
    if (filter === 'medium') return task.priority === 'medium';
    if (filter === 'low') return task.priority === 'low';
    return true;
  });

  const handleSort = () => {
    const sorted = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setTasks(sorted);
  };

  const handleSortByPriority = () => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const sorted = [...tasks].sort((a, b) => 
      priorityOrder[b.priority] - priorityOrder[a.priority]
    );
    setTasks(sorted);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-gray-400 bg-white';
      case 'medium': return 'border-l-gray-400 bg-white';
      case 'low': return 'border-l-gray-400 bg-white';
      default: return 'border-l-gray-400 bg-white';
    }
  };

  const getPriorityBadge = (priority) => {
    return 'bg-gray-100 text-gray-800';
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">TODO APP</h1>
          <p className="text-gray-600">Stay organized and boost your productivity</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-gray-700">Total Tasks: {totalCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <span className="text-gray-700">Completed: {completedCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-gray-700">Remaining: {totalCount - completedCount}</span>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter task description..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center font-medium"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'incomplete', label: 'Incomplete' },
                  { key: 'high', label: 'High Priority' },
                  { key: 'medium', label: 'Medium Priority' },
                  { key: 'low', label: 'Low Priority' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      filter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                onClick={handleSort}
              >
                <SortAsc className="w-4 h-4 mr-2" />
                Sort A-Z
              </button>
              <button
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                onClick={handleSortByPriority}
              >
                <Filter className="w-4 h-4 mr-2" />
                Sort by Priority
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Your Tasks ({filteredTasks.length})
          </h2>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No tasks to show</p>
              <p className="text-gray-400 text-sm mt-2">Add a new task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border-l-2 p-4 rounded-md transition-all hover:shadow-sm ${getPriorityColor(task.priority)} ${
                    task.completed ? 'opacity-60' : ''
                  } border border-gray-100`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {editingId === task.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            className="flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                            autoFocus
                          />
                          <select
                            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                            value={editingPriority}
                            onChange={(e) => setEditingPriority(e.target.value)}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                          <button
                            onClick={() => handleSaveEdit(task.id)}
                            className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-900 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                            className="w-4 h-4 text-gray-600 rounded focus:ring-gray-500"
                          />
                          <span
                            className={`flex-1 ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                          >
                            {task.text}
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                            {String(task.priority).charAt(0).toUpperCase() + String(task.priority).slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {editingId !== task.id && (
                      <div className="flex items-center space-x-2 ml-4">
                        {!task.completed && (
                          <button
                            onClick={() => handleMarkCompleted(task.id)}
                            className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                            title="Mark as completed"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {task.completed && (
                          <button
                            onClick={() => handleMarkIncomplete(task.id)}
                            className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
                            title="Mark as incomplete"
                          >
                            Reopen
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(task.id, task.text, task.priority)}
                          className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition-colors"
                          title="Edit task"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-900 transition-colors"
                          title="Delete task"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;