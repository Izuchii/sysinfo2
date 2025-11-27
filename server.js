import express from 'express';
import os from 'os';
import path from 'path';

const app = express();
const PORT = 3010;

function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

app.get('/api/system-info', (req, res) => {
    const cpus = os.cpus();
    const cpuUsage = cpus.map((cpu, index) => {
        const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
        const idle = cpu.times.idle;
        const usage = ((1 - idle / total) * 100).toFixed(1);
        return { core: index, usage: parseFloat(usage) };
    });

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const info = {
        timestamp: new Date().toLocaleTimeString(),
        os: {
            type: os.type(),
            platform: os.platform(),
            release: os.release(),
            arch: os.arch(),
            hostname: os.hostname(),
            uptime: formatUptime(os.uptime())
        },
        user: os.userInfo().username,
        cpu: {
            model: cpus[0].model,
            cores: cpus.length,
            usageAvg: (
                cpuUsage.reduce((a, c) => a + c.usage, 0) / cpuUsage.length
            ).toFixed(1),
            usage: cpuUsage
        },
        memory: {
            total: formatBytes(totalMem),
            free: formatBytes(freeMem),
            used: formatBytes(usedMem),
            usagePercent: ((usedMem / totalMem) * 100).toFixed(1)
        }
    };
    res.json(info);
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>
    console.log(`✅ Real-Time System Monitor at http://localhost:${PORT}`)
);
