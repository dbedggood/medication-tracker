import { For, createSignal } from "solid-js";
import styles from "./App.module.css";

function getMedicationHistory() {
  if (localStorage.length > 0) {
    return JSON.parse(localStorage.getItem("medicationHistory"));
  }
  return [];
}

function storeMedicationHistory(newMedicationHistory) {
  localStorage.setItem(
    "medicationHistory",
    JSON.stringify(newMedicationHistory)
  );
}

function App() {
  const [medicationHistory, setMedicationHistory] = createSignal(
    getMedicationHistory()
  );

  function recordMedication() {
    setMedicationHistory((previousMedicationHistory) => {
      const newMedicationHistory = previousMedicationHistory
        ? [new Date().toLocaleString(), ...previousMedicationHistory]
        : [new Date().toLocaleString()];
      storeMedicationHistory(newMedicationHistory);
      return newMedicationHistory;
    });
  }

  return (
    <div class={styles.App}>
      <button onClick={() => recordMedication()}>Take medicine</button>

      <p>Last taken:</p>
      <For each={medicationHistory()}>
        {(medication) => <p>{medication}</p>}
      </For>

      <button
        onClick={() => {
          storeMedicationHistory([]);
          setMedicationHistory([]);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
