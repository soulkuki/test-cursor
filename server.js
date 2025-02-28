import express from 'express';
import path from 'path';
import open from 'open';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// 捕获模块加载错误
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 拒绝:', reason);
});

// 添加中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 处理联系表单提交
app.post('/contact', (req, res) => {
    // 这里可以添加处理表单数据的逻辑
    console.log('收到联系表单提交：', req.body);
    res.json({ message: '消息已收到，我们会尽快联系您！' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('发生错误:', err.stack);
    res.status(500).send('服务器出现错误！');
});

// 启动服务器并自动打开浏览器
const server = app.listen(PORT, async () => {
    try {
        console.log(`服务器已启动，访问地址：http://localhost:${PORT}`);
        // 延迟打开浏览器，确保服务器完全启动
        setTimeout(async () => {
            try {
                await open(`http://localhost:${PORT}`);
            } catch (error) {
                console.error('打开浏览器时发生错误:', error);
            }
        }, 1000);
    } catch (error) {
        console.error('启动时发生错误:', error);
    }
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
