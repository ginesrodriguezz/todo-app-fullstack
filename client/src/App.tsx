import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ClipboardList } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary rounded-lg text-primary-foreground">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Task Master</h1>
        </header>

        <main>
          <TaskForm />
          <h2 className="text-2xl font-semibold mb-4 mt-8">Your Tasks</h2>
          <TaskList />
        </main>
      </div>
    </div>
  );
}

export default App;
