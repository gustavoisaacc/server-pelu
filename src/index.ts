import { app } from "./server";

const PORT = process.env.PORT || 4000;
process.env.TZ = process.env.TZ = "";
process.env.TZ = "UTC+3";
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
