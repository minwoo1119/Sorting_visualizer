import { useState } from 'react';
import styles from './visualizer.module.css';

export const Visualizer = () => {
	const [listLength, setListLength] = useState(0);
	const [list, setList] = useState([]);
	const [pivotIndex, setPivotIndex] = useState(null);
	const [comparisonIndices, setComparisonIndices] = useState([]);
	const [swappedIndices, setSwappedIndices] = useState([]);
	const [isSorting, setIsSorting] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [message, setMessage] = useState('');

	const generateRandomArray = (size, max) => {
		return Array.from({ length: size }, () => Math.floor(Math.random() * max));
	};

	const resetState = () => {
		setPivotIndex(null);
		setComparisonIndices([]);
		setSwappedIndices([]);
		setIsSorting(false);
		setIsSorted(false);
		setMessage('');
	};

	const handleChange = (event) => {
		setListLength(Number(event.target.value));
	};

	const makeArray = () => {
		setList(generateRandomArray(listLength, 100));
		resetState();
	};

	const quickSort = async () => {
		setIsSorting(true);
		setMessage('');
		await quickSortStep([...list], 0, list.length - 1);
		setIsSorting(false);
		setIsSorted(true);
		setMessage('퀵 정렬이 완료되었습니다!');
	};

	const quickSortStep = async (arr, left, right) => {
		if (left >= right) return;

		const pivot = await partition(arr, left, right);
		setList([...arr]);
		await quickSortStep(arr, left, pivot - 1);
		await quickSortStep(arr, pivot + 1, right);
	};

	const partition = async (arr, left, right) => {
		let pivotValue = arr[right];
		setPivotIndex(right);
		let i = left - 1;

		for (let j = left; j < right; j++) {
			setComparisonIndices([i, j]);
			await sleep(500);

			if (arr[j] < pivotValue) {
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]];
				setSwappedIndices([i, j]);
				setList([...arr]);
				await sleep(500);
			}
		}

		[arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
		setList([...arr]);
		await sleep(500);

		return i + 1;
	};

	const insertionSort = async () => {
		setIsSorting(true);
		setMessage('');
		let arr = [...list];

		for (let i = 1; i < arr.length; i++) {
			let key = arr[i];
			let j = i - 1;

			while (j >= 0 && arr[j] > key) {
				setComparisonIndices([i, j]);
				arr[j + 1] = arr[j];
				setList([...arr]);
				await sleep(500);
				j--;
			}

			arr[j + 1] = key;
			setSwappedIndices([i, j + 1]);
			setList([...arr]);
			await sleep(500);
		}

		setIsSorting(false);
		setIsSorted(true);
		setMessage('삽입 정렬이 완료되었습니다!');
	};

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const getItemClass = (index) => {
		if (isSorted) return '';
		if (index === pivotIndex) return styles.pivot;
		if (comparisonIndices.includes(index)) return styles.comparing;
		if (swappedIndices.includes(index)) return styles.swapped;
		return '';
	};

	// 추가된 함수: 각 요소 위에 상태 텍스트 표시
	const getItemStatusText = (index) => {
		if (index === pivotIndex) return '피벗';
		if (comparisonIndices.includes(index)) return '비교 중';
		if (swappedIndices.includes(index)) return '교환됨';
		return '';
	};

	return (
		<div className={styles.container}>
			<div className={styles.randomize}>
				<input
					type="text"
					name="arraynum"
					id="arraynum"
					value={listLength}
					onChange={handleChange}
					disabled={isSorting}
				/>
				<div className={styles.randomGenerateBtn} onClick={makeArray}>
					무작위 생성
				</div>
			</div>
			<div className={styles.list}>
				<ul className={styles.itemBox}>
					{list.map((item, index) => (
						<li key={index} className={`${styles.item} ${getItemClass(index)}`}>
							{item}
							{/* 상태 텍스트 표시 */}
							<span className={styles.itemStatus}>
								{getItemStatusText(index)}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.sortSelect}>
				<div
					className={styles.quickSortBtn}
					onClick={quickSort}
					disabled={isSorting}
				>
					퀵 정렬
				</div>
				<div
					className={styles.insertionSortBtn}
					onClick={insertionSort}
					disabled={isSorting}
				>
					삽입 정렬
				</div>
			</div>
			<p className={styles.message}>{message}</p>
		</div>
	);
};

export default Visualizer;
