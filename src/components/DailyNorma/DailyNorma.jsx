// import { useState } from 'react';
// import styles from './DailyNorma.module.css';

// const DailyNorma = () => {
//     const [dailyNorm, setDailyNorm] = useState(1.5);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleEditClick = () => {
//         setIsModalOpen(true);
//     };

//     const handleModalClose = (newNorm) => {
//         if (newNorm) setDailyNorm(newNorm);
//         setIsModalOpen(false);
//     };

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.title}>My daily norma</h2>
//             <div className={styles.value}>
//                 <span className={styles.norma}>{dailyNorm} L</span>
//                 <button className={styles.editButton} onClick={handleEditClick}>
//                     Edit
//                 </button>
//             </div>
//             {isModalOpen && (
//                 <DailyNormaModal
//                     initialNorm={dailyNorm}
//                     onClose={handleModalClose}
//                 />
//             )}
//         </div>
//     );
// };

// export default DailyNorma;
