import { NoteList } from "./components/NoteList";
import "./index.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-logo">Dynamic notes</h1>
        </div>
        
        <div className="header-center">
          <input 
            type="text" 
            placeholder="Search notes by title or content..." 
            className="search-input"
          />
        </div>
        
        <div className="header-right">
          <button className="btn-notification">🔔</button>
          <button className="btn-profile">👤</button>
        </div>
      </header>
      
      <main className="app-main">
        <NoteList />
      </main>
    </div>
  );
}

export default App;
