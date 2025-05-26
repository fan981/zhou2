const students = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑一', '王二', '陈三', '李想', '刘梦', '黄天', '周杰', '吴凡',
    '郑华', '冯洋', '陈明', '董月', '徐阳', '马超', '高峰', '林宇'
];

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const selectedStudentEl = document.querySelector('#selected-student h2');
const studentListEl = document.getElementById('student-list');

let isSelecting = false;
let intervalId = null;
let currentIndex = 0;

function initStudentList() {
    studentListEl.innerHTML = '';
    students.forEach((student, index) => {
        const studentEl = document.createElement('div');
        studentEl.className = 'student-item';
        studentEl.textContent = student;
        studentEl.dataset.index = index;
        studentListEl.appendChild(studentEl);
    });
}

function updateSelectedStudent(index) {
    document.querySelectorAll('.student-item').forEach(item => {
        item.classList.remove('selected');
    });

    if (index !== undefined) {
        const studentItem = document.querySelector(`.student-item[data-index="${index}"]`);
        if (studentItem) {
            studentItem.classList.add('selected');
        }
        selectedStudentEl.textContent = students[index];
    } else {
        selectedStudentEl.textContent = '等待选择';
    }
}

function selectRandomStudent() {
    currentIndex = Math.floor(Math.random() * students.length);
    updateSelectedStudent(currentIndex);
}

function startSelection() {
    if (isSelecting) return;
    
    isSelecting = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    selectedStudentEl.classList.add('animate-pulse-custom');
    
    intervalId = setInterval(selectRandomStudent, 100);
}

function stopSelection() {
    if (!isSelecting) return;
    
    clearInterval(intervalId);
    isSelecting = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    selectedStudentEl.classList.remove('animate-pulse-custom');
    
    selectedStudentEl.classList.add('scale-110');
    setTimeout(() => {
        selectedStudentEl.classList.remove('scale-110');
    }, 300);
}

startBtn.addEventListener('click', startSelection);
stopBtn.addEventListener('click', stopSelection);

document.addEventListener('DOMContentLoaded', () => {
    initStudentList();
    updateSelectedStudent();
});