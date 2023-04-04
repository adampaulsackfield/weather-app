import server from './index';

// PORT
if (!process.env.PORT) process.exit(1); // If not ENV port then we will exit.
const PORT: number = parseInt(process.env.PORT as string, 10);

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
