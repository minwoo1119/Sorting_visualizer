import styles from './mainpage.module.css';
import Visualizer from './Visualizer';

export const MainPage = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Sorting Algorithm Visualizer</h1>
			<div className={styles.visualspace}>
				<Visualizer />
			</div>
		</div>
	);
};

export default MainPage;
