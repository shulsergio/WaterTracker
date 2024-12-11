import "./App.css";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Hello Team</h1>
      <div title="Modal">
        <button onClick={onOpenModal} type="button">
          UserLogoModal
        </button>
        {isModalOpen && <Modal onCloseModal={onCloseModal} />}
      </div>
    </>
  );
}

export default App;
