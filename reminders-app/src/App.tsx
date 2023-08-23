import React, { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './models/reminder'
import reminderService from './services/reminder'
import reminder from './services/reminder';
import NewReminder from './components/NewReminder';

//dummy data:
// const reminder: Reminder[] = [
//   {id:1 , title: 'Reminder 1'}
// ]

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  //example for boolean useState:
  // const [loading, setLoading ] = useState<boolean>(false)

  useEffect(()=>{
    loadReminders()
  },[])

  const loadReminders = async() => {
    const reminders = await reminderService.getReminder()
    setReminders(reminders)
  }

  const removeReminder = (id:number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const addReminder = async(title:string) => {
    const newReminder = await reminderService.addReminder(title)
    setReminders([newReminder, ...reminders])
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder}/>
      <ReminderList items={reminders} onRemoveReminder={removeReminder}/>
    </div>
  );
}

export default App;
