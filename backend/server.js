import path from "node:path";
import express from "express";
import rateRoutes from "./src/routes/rateRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Trang web là bản đã đóng gói bằng Webpack: chạy "npm run build" trong frontend trước
app.use(express.static(path.join(import.meta.dirname, "../frontend/dist")));
app.use("/api", rateRoutes);

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
