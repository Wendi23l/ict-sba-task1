
    const monthYear = document.getElementById("monthYear");
const datesContainer = document.getElementById("datesContainer");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const eventInput = document.getElementById("eventInput");
const addEventButton = document.getElementById("addEventButton");

let currentDate = new Date();
let events = {}; 

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = `${year} 年 ${month + 1} 月`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    datesContainer.innerHTML = ""; 

    
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement("div");
        datesContainer.appendChild(emptyDiv);
    }


    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dateDiv = document.createElement("div");
        dateDiv.textContent = i;
        dateDiv.classList.add("date");
        
        
        const eventList = events[`${year}-${month + 1}-${i}`];
        if (eventList) {
            eventList.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.textContent = event;
                eventDiv.classList.add("event");
                dateDiv.appendChild(eventDiv);
            });
        }

        datesContainer.appendChild(dateDiv);
    }
}

// 設置按鈕事件
prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// 添加事件的功能
addEventButton.addEventListener("click", () => {
    const eventText = eventInput.value.trim();
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份從 1 開始

    if (eventText === '') {
        alert('請輸入事件!');
        return;
    }

    if (!events[`${year}-${month}-${date}`]) {
        events[`${year}-${month}-${date}`] = []; // 初始化事件列表
    }
    events[`${year}-${month}-${date}`].push(eventText); // 添加事件到相應日期

    eventInput.value = ''; // 清空輸入框
    renderCalendar(); // 重新渲染日曆
});

// 初始渲染
renderCalendar();