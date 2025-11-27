let cpuChart, memChart;
const cpuData = [];
const memData = [];
const labels = [];

async function fetchSystemInfo() {
    const res = await fetch('/api/system-info');
    const data = await res.json();

    document.getElementById('timestamp').textContent = `Updated at ${data.timestamp}`;
    document.getElementById('cpuModel').textContent = `Model: ${data.cpu.model}`;
    document.getElementById('cpuCores').textContent = `Cores: ${data.cpu.cores}`;
    document.getElementById('cpuAvg').textContent = `Average Usage: ${data.cpu.usageAvg}%`;

    document.getElementById('memTotal').textContent = data.memory.total;
    document.getElementById('memUsed').textContent = data.memory.used;
    document.getElementById('memFree').textContent = data.memory.free;
    document.getElementById('memUsagePercent').textContent = `${data.memory.usagePercent}% used`;

    document.getElementById('osType').textContent = data.os.type;
    document.getElementById('osPlatform').textContent = data.os.platform;
    document.getElementById('osRelease').textContent = data.os.release;
    document.getElementById('osArch').textContent = data.os.arch;
    document.getElementById('osHostname').textContent = data.os.hostname;
    document.getElementById('osUptime').textContent = data.os.uptime;
    document.getElementById('user').textContent = data.user;

    updateCharts(data);
}

function initCharts() {
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    const memCtx = document.getElementById('memChart').getContext('2d');

    cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'CPU Usage (%)',
                data: cpuData,
                borderColor: '#58a6ff',
                backgroundColor: 'rgba(88,166,255,0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });

    memChart = new Chart(memCtx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Memory Usage (%)',
                data: memData,
                borderColor: '#ffa657',
                backgroundColor: 'rgba(255,166,87,0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

function updateCharts(data) {
    const timeLabel = new Date().toLocaleTimeString();

    labels.push(timeLabel);
    cpuData.push(parseFloat(data.cpu.usageAvg));
    memData.push(parseFloat(data.memory.usagePercent));

    if (labels.length > 20) {
        labels.shift();
        cpuData.shift();
        memData.shift();
    }
    cpuChart.update();
    memChart.update();
}

// Initialize everything
initCharts();
fetchSystemInfo();
setInterval(fetchSystemInfo, 1000);
