import './App.css'
import LanguageSelectionComponent from './Components/LanguageSelectionComponent'

function App() {

  const items = ["en-US","en-GB","pt-BR"]

  return (
      <LanguageSelectionComponent items={items} />
  )
}

export default App